const initialState = {
    todos: []
}

let index = 1;

export const todoReducer = (state = initialState, action) => {
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