import { createSlice, createSelector } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import moment from 'moment';
// import axios from "axios";

const URL = "/bugs";

const slice = createSlice({
  name: 'bugs',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null
  },
  reducers: {
    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },

    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },

    bugAssignedToUser: (bugs, action) => {
      const { id: bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },

    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },

    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },

    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    }
  }
});

export const { 
  bugAdded, 
  bugResolved,
  bugAssignedToUser, 
  bugsReceived,
  bugsRequested,
  bugsRequestFailed
} = slice.actions;
export default slice.reducer;

// Action Creators
export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
  if (diffInMinutes < 10) return;

  return dispatch(
    apiCallBegan({
      url: URL,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type
    })
  )
};

export const addBug = (bug) => apiCallBegan({
  url: URL,
  method: 'post',
  data: bug,
  onSuccess: bugAdded.type
});

export const resolveBug = id => apiCallBegan({
  url: URL + '/' + id,
  method: 'patch',
  data: { resolved: true },
  onSuccess: bugResolved.type
});

export const assignBugToUser = (bugId, userId) => apiCallBegan({
  url: URL + '/' + bugId,
  method: 'patch',
  data: { userId },
  onSuccess: bugAssignedToUser.type
})

// Selectors (Memoized)
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.list((bug) => !bug.resolved)
);

export const getBugsByUser = (userId) => createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.filter((bug) => bug.userId === userId)
);
