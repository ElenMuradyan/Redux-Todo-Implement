import { createStore } from '../node-modules/index.js';
import { todoReducer } from '../state_management/reducer/todoReducer.js';
const initialState = {
    todos: []
}

export const store = createStore(todoReducer, initialState);