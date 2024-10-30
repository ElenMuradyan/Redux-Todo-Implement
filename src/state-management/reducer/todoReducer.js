const initialState = {
    todos: []
}

let index =1;

export const todoReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD':
            return{
                todos: [
                    ...state.todos,
                    { todoName: action.payload, completed: false, index: index++}
                ]
            }
        case 'Delete':
            return{
                todos: state.todos.filter(todo => todo.index !== action.payload)
            }
        case 'CHANGECOMPLETED':
            return{
                todos: state.todos.map(todo => {
                    (todo.index === action.payload) ? { ...todo, completed: !todo.completed} : todo
                })
            }
        default:
            return state;
    }
}
