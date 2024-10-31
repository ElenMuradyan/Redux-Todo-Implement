//redux

const createStore = (reducer, initialState) => {
    let state = initialState;
    const callbacks = [];

    const getState = () => state;

    const dispatch = action => {
        state = reducer(state, action);
        callbacks.forEach(foo => foo());
    }

    const subscribe = callback => {
        callbacks.push(callback);
        return () => callbacks.filter(cb => cb !== callback);
    }

    return{
        getState:getState,
        subscribe:subscribe,
        dispatch:dispatch
    }
}

//actions

const addTodo = todoName => ({
    type: 'ADD',
    payload: todoName
})

const deleteTodo = index => ({
    type: 'DELETE',
    payload: index
})

const competeTodo = index => ({
    type: 'COMPLETE',
    payload: index
})

//reducer

const initialState = {
    todos: []
}

let index = 1;

const todoReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD':
            return{
            ...state,
            todos:[
                ...state.todos,{name: action.payload, index: index++, completed: false}
            ]
        }
        case 'DELETE':
            return{
            ...state,
            todos: state.todos.filter(todo => todo.index !== action.payload)
        }
        case 'COMPLETE':
            return{
            ...state,
            todos: state.todos.map(todo => (todo.index === action.payload) ? {...todo, completed: !todo.completed} : todo)
        }
        default:
            return state;
    }
}

//store

const store = createStore(todoReducer,initialState);
//maincode

const input = document.getElementById('todo_input');
const button = document.getElementById('add_button');
const todoList = document.getElementById('todos');

const render = () => {
    const state = store.getState();
    todoList.innerHTML = '';

    state.todos.forEach(todo => {
        const li = document.createElement('li');

        const checkBoxContainer = document.createElement('div');
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = todo.completed;
        const completedText = document.createElement('span')
        completedText.textContent = todo.completed ? 'Completed' : 'Not Completed';
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';

        checkBoxContainer.appendChild(checkBox);
        checkBoxContainer.appendChild(completedText);

        li.textContent = todo.name;
        li.appendChild(checkBoxContainer);
        li.appendChild(deleteButton);
        
        checkBoxContainer.onclick= () => {
            store.dispatch({type: 'COMPLETE', payload: todo.index});
        }

        deleteButton.onclick = () => {
            store.dispatch({type: 'DELETE', payload: todo.index})
        }
        todoList.appendChild(li);
    })
}

store.subscribe(render);

button.onclick = () => {
    const todoName = input.value.trim();
    if(todoName){
        store.dispatch({type: 'ADD', payload: todoName})
        input.value = '';
    }
}

render();