import { createStore, combineReducers, applyMiddleware } from "redux";
import { authReducer } from "../reducers/authReducer";
import { composeWithDevTools } from "redux-devtools-extension";

// REDUX THUNK
import thunk from "redux-thunk";
import { uiReducer } from "../reducers/uiReducers";
// PARA PONER VARIOS MIDDLEWARE

const reducers = combineReducers({
  // la estructura que vamos a querer que tenga el store en general
  auth: authReducer,
  ui: uiReducer,
});

// SOLO RECIBE UN REDUCER COMO ARGUMENTO
// export const store = createStore(
//   reducers,
//   // composeWithDevTools()
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// /CON REDUX THUNK
export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
