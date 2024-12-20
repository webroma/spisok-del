const taskInput = document.getElementById('taskInput');
const taskTimeInput = document.getElementById('taskTime'); 
const addTaskButton = document.getElementById('addTask'); 
const taskList = document.getElementById('taskList'); 

addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value;
    const taskTime = taskTimeInput.value; 
    if (taskText && taskTime) {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${taskText}</span>         
            <span class="time">${new Date(taskTime).toLocaleString()}</span>         
            <button class='deleteTask'>Удалить</button>  
            <input type="checkbox" class="Galochka">`;


        localStorage.setItem(taskText, `${taskText},${taskTime}`);

        taskList.appendChild(taskItem);
        taskInput.value = '';
        taskTimeInput.value = '';

        const deleteButton = taskItem.querySelector('.deleteTask');
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(taskItem);
            localStorage.removeItem(taskText); 
        });

        const checkbox = taskItem.querySelector('.Galochka');
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                taskItem.innerHTML = `
                    <span>${taskText}</span>         
                    <span class="time">${new Date().toLocaleString()}</span>`;
                taskList.removeChild(taskItem);
                localStorage.removeItem(taskText); 
            }
        });
    }
});

document.querySelector('.burger_btn').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav-button').classList.toggle('open');
})
