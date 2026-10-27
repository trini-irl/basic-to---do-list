const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");
const filterBtns = document.querySelectorAll(".filter-btn");

// State variables
let tasks = [];
let currentFilter = 'all';

// Event listeners
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return;

    // Create a new task (Fixed variable name)
    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);
    taskInput.value = "";
    renderTasks(); // Fixed function name (added 's')
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return {
                ...task, 
                completed: !task.completed // Fixed: added '!' to toggle the boolean value
            };
        }
        return task;
    });
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks(); // Fixed function name (added 's')
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        renderTasks();
    });
});

function renderTasks() {
    taskList.innerHTML = ''; // Clear the current list in HTML

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true; // 'all' filter
    });

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';

        li.innerHTML = `
            <span class="task-text" onclick="toggleTask(${task.id})">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}