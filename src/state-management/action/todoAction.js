export const addToDo = todoName => ({
    type: 'ADD',
    payload: todoName
})

export const deleteToDo = index => ({
    type: 'DELETE',
    payload: index
})

export const changeCompleted = index => ({
    type: 'CHANGECOMPLETED',
    payload: index
})