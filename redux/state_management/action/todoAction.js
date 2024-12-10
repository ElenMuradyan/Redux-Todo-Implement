export const addTodo = todoName => ({
    type: 'ADD',
    payload: todoName
})

export const deleteTodo = index => ({
    type: 'DELETE',
    payload: index
})

export const completeTodo = index => ({
    type: 'COMPLETE',
    payload: index
})