import { BUG_ADDED, BUG_REMOVED, BUG_RESOLVED } from "./actionTypes";

export const bugAdded = (description) => ({
  type: BUG_ADDED,
  payload: {
    description,
  },
});

export const bugResolved = (id) => ({
  type: BUG_RESOLVED,
  payload: {
    id,
  },
});
