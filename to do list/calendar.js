const calendarDateInput = document.getElementById('calendarDate');
const taskListOnDate = document.getElementById('taskListOnDate');
const now = new Date().toISOString().split("T")[0]; 

calendarDateInput.value = now;

const fixedDate = now;

function displayTasksForDate(date) {
    taskListOnDate.innerHTML = "";
    const currentTime = new Date(); 

    for (let key in localStorage) {
        if (key === 'archivedTasks') continue;

        const taskData = localStorage.getItem(key);

        if (taskData) {
            const taskParts = taskData.split(",");
            if (taskParts.length === 2) {
                const savedTaskText = taskParts[0];
                const savedTaskTime = new Date(taskParts[1]);

                if (savedTaskTime.toISOString().split("T")[0] === date) {
                    const taskItem = document.createElement('li');
                    taskItem.setAttribute('data-taskKey', key);

                    const difference = savedTaskTime - currentTime;
                    const daysleft = Math.floor(difference / (1000 * 60 * 60 * 24));
                    const hoursLeft = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutesleft = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                    taskItem.innerHTML = `
                        <span>${savedTaskText}</span>
                        <span id="timer" class="obschiyspan">${minutesleft >= 0 ? 'Истекает через' : 'Истекло'}</span>
                        <span id="days"class="obschiyspan">${daysleft >= 0 ? daysleft : '0'}</span>
                        <span class="obschiyspan">дня(ей)</span>
                        <span id="hours" class="obschiyspan">${hoursLeft >= 0 ? hoursLeft : '0'}</span>
                        <span class="obschiyspan">часа(ов)</span>
                        <span id="minutes" class="obschiyspan">${minutesleft >= 0 ? minutesleft : '0'}</span>
                        <span class="obschiyspan">минут(ы)</span>
                        <input type="checkbox" class="Galochka">
                    `;
                    taskListOnDate.appendChild(taskItem);

                        const interval = setInterval(() => {
                        const updateDifference = savedTaskTime - new Date();
                        const updateDaysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));
                        const updateHoursLeft = Math.floor((updateDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        const updateMinutesLeft = Math.floor((updateDifference % (1000 * 60 * 60)) / (1000 * 60));
                        document.getElementById('days').innerText = updateDaysLeft;
                        document.getElementById('hours').innerText = updateHoursLeft;
                        document.getElementById('minutes').innerText = updateMinutesLeft;

                        if (updateDifference < 0) {
                            clearInterval(interval);
                            archiveTask(savedTaskText, savedTaskTime.toISOString());
                            document.getElementById("timer").innerText = "Истекло";
                            taskItem.remove();
                        }
                    }, 1000);

                    taskItem.querySelector('.Galochka').addEventListener('change', function() {
                        if (this.checked) {
                            archiveTask(savedTaskText, savedTaskTime.toISOString());
                            taskItem.remove();
                            clearInterval(interval);
                        }
                    });
                }
            }
        }
    }
}
function archiveTask(taskText, taskTime) {
    let archivedTasks = JSON.parse(localStorage.getItem('archivedTasks')) || [];
    archivedTasks.push(`${taskText},${taskTime}`); 
    localStorage.setItem('archivedTasks', JSON.stringify(archivedTasks)); 

    for (let key in localStorage) {
        const taskData = localStorage.getItem(key);
        if (taskData && taskData.startsWith(taskText + ",")) {
            localStorage.removeItem(key);
            break; 
        }
    }
}

 

calendarDateInput.addEventListener('change', function() {
    displayTasksForDate(this.value);
});


displayTasksForDate(fixedDate);

document.querySelector('.burger_btn').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav-button').classList.toggle('open');
})