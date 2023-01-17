import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from './store/configureStore';
import { bugAdded, bugResolved, getUnresolvedBugs, bugAssignedToUser, getBugsByUser } from './store/bugs';
import { projectAdded } from './store/projects';
import { userAdded } from './store/users';

const store = configureStore();

store.dispatch((dispatch, getState) => {
  // Call an API
  // When promise is resolved => dispatch()
  dispatch({ type: 'bugsRecieved', bugs: [1, 2, 3]});
  console.log(getState());
  // If promise is rejected => dispatch()
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
