import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import shopReducer from '../reducers/shop';
import roomReducer from '../reducers/chat';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      roomMessages: roomReducer,
      shop: shopReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
