import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import {applyMiddleware, createStore} from 'redux'
import { Provider } from 'react-redux'
import {initialState, TaskReducer} from "./reducers/TaskReducer";
import TaskListContainer from "./containers/TodoListContainer";
import thunk from "redux-thunk";

const store = createStore(TaskReducer, initialState, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><TaskListContainer/></Provider>, document.getElementById('root'));

serviceWorker.register();
