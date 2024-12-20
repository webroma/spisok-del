const archivedTaskList = document.getElementById('archivedTaskList');


function displayArchivedTasks() {
    archivedTaskList.innerHTML = "";
    let archivedTasks = JSON.parse(localStorage.getItem('archivedTasks')) || [];

    archivedTasks.forEach(taskData => {
        const taskDetails = taskData.split(",");
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `<span>${taskDetails[0]}</span> <span>${new Date(taskDetails[1]).toLocaleString()}</span>`;
        archivedTaskList.appendChild(taskItem);
    });
}
const deleteArhiv = document.getElementById('deleteArhiv');
deleteArhiv.addEventListener('click', () => {
    localStorage.removeItem('archivedTasks'); 
    archivedTaskList.innerHTML = ""; 
    displayArchivedTasks();
});

document.querySelector('.burger_btn').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav-button').classList.toggle('open');
})

displayArchivedTasks();