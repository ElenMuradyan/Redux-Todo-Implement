import { addTodo, deleteTodo, completeTodo } from "./redux/state_management/action/todoAction.js";
import { store } from "./redux/state_management/store.js";

const input = document.getElementById('todo_input');
const button = document.getElementById('add_button');
const todoList = document.getElementById('todos');
let todosVisibility = 'all';

const render = () => {
    const state = store.getState();
    todoList.innerHTML = '';

    let filteredTodos;
    
    if(todosVisibility === 'completed'){
        filteredTodos = state.todos.filter(todo => todo.completed);
    }else if(todosVisibility === 'incompleted'){
        filteredTodos = state.todos.filter(todo => !todo.completed);
    }else{
        filteredTodos = state.todos;
    }
    
    filteredTodos.forEach(todo => {
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
            store.dispatch(completeTodo(todo.index));
        }

        deleteButton.onclick = () => {
            store.dispatch(deleteTodo(todo.index))
        }
        todoList.appendChild(li);
    })
}

function getColor (state) {
    console.log(state);
    const buttons = document.getElementsByClassName('button');

    for (let button of buttons) {
        button.style.backgroundColor = '#7700ff';
    }

    document.getElementById(state).style.backgroundColor='#b87affa0';    
}

document.getElementById('all').onclick = () => {
    todosVisibility = 'all';
    getColor('all');
    render();
} 
document.getElementById('completed').onclick = () => {
    todosVisibility = 'completed';
    getColor('completed');
    render();
}
document.getElementById('incompleted').onclick = () => {
    todosVisibility = 'incompleted';
    getColor('incompleted');
    render();
}

store.subscribe(render);

function handleAddTodo () {
    const todoName = input.value.trim();
    if (todoName) {
        store.dispatch(addTodo(todoName))
        input.value = '';
    }
}
button.onclick = handleAddTodo;

input.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        handleAddTodo()
    }
})


render();