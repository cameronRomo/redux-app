import { createSlice, createSelector } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

let lastId = 0;

const slice = createSlice({
  name: 'bugs',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null
  },
  reducers: {
    bugAdded: (bugs, action) => {
      bugs.list.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false
      });
    },

    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },

    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },

    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
    }
  }
});

export const { 
  bugAdded, 
  bugResolved,
  bugAssignedToUser, 
  bugsReceived 
} = slice.actions;
export default slice.reducer;

// Action Creators
const URL = "/bugs";
export const loadBugs = () => apiCallBegan({
  url: URL,
  onSuccess: bugsReceived.type
});

// Selectors (Memoized)
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((bug) => !bug.resolved)
);

export const getBugsByUser = (userId) => createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.filter((bug) => bug.userId === userId)
);
