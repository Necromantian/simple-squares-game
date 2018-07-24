import { applyMiddleware, combineReducers, createStore,compose } from 'redux';
import thunk from 'redux-thunk';
import GameReducer from '../Game/Redux/GameReducer';
const initialState = {}

const middleware = applyMiddleware(thunk);

const reducers = combineReducers({ GameReducer });

const store = createStore(reducers, initialState, compose(middleware,window.devToolsExtension ? window.devToolsExtension() : f => f));

export default store;