const input = document.getElementById('input');
const addTaskBtn = document.getElementById('addTask');
const listTasks = document.getElementById('list-container');
const deleteBtn = document.getElementById('deleteAll');
// Creamos array vacio
let tasks = [];

//Funcion para recuperar datos del LocalStorage

function recuperarLocalStorage() {
    document.addEventListener('DOMContentLoaded', () => {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        createHTML();
    });
    listTasks.addEventListener('click', deleteTask);
}

recuperarLocalStorage();

// Funcioon para borrar tareas
function deleteTask(e) {
    if (e.target.tagName === 'SPAN') {
        const deleteId = parseInt(e.target.getAttribute('data-id'))
        tasks = tasks.filter((task) => task.id !== deleteId);
        createHTML();

    }
}

// * Ahora tenemos que traernos lo que escribamos en el input cuando hagamos click al boton
addTaskBtn.addEventListener('click', addTasks);

// * Funcion para agregar tareas
function addTasks() {
    const task = input.value;
    if (task === "") {
        showError("La tarea esta vacía");
        return;
    }

    if (tasks.some((item) => task === item.task)) {
        alreadyExist('La tarea ya existe');
        return;
    }

    const taskObj = {
        task: task,
        id: Date.now(),
    };

    tasks = [...tasks, taskObj];

    createHTML();
    input.value = "";
}

function createHTML() {
    listTasks.innerHTML = "";
    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.innerHTML = `${task.task} <span data-id='${task.id}'> X </span>`;
        listTasks.appendChild(li);
    });

    sendLocalStorage();
}

function sendLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}




//* funcion para mostrar error
function showError(error) {
    const msgError = document.createElement("p");
    msgError.textContent = error;
    msgError.classList.add("error");
    listTasks.appendChild(msgError);
    setTimeout(() => {
        msgError.remove();
    }, 2000)


}

// funcion de ya existe
function alreadyExist(exists){
    const msgExists = document.createElement("p");
    msgExists.textContent = exists;
    msgExists.classList.add("exists");
    listTasks.appendChild(msgExists);
    setTimeout(() => {
        msgExists.remove();
    }, 2000);
}

//Boton de borrar todas las tareas
function deleteAll() {
    tasks = [];
    createHTML();
}

deleteBtn.addEventListener('click', deleteAll);