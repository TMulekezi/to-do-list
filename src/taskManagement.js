import calendar from './images/calendar.svg';
import remove from './images/remove.svg';
import edit from './images/edit.svg';
import time from './images/time.svg';
import { createTab } from './index';



const Task = (taskName, taskContent, taskTime, taskDate) => {
    const createTask = () => {
        
        const task = document.createElement("div");
        task.classList.add("task");
    
        const radio = document.createElement("input");
        radio.type = "radio";
        // task content
        const content= document.createElement("div");
        content.classList.add("task-content");
    
        const taskTitle = document.createElement("h3");
        taskTitle.textContent = taskName;
    
        const taskDescription = document.createElement("div");
        taskDescription.classList.add("task-description");
        taskDescription.textContent = taskContent;
    
        const taskWidgets = document.createElement("div");
        taskWidgets.classList.add("task-widgets");
        
        const editWidget = createTab("edit", edit);
        editWidget.classList.add("task-edit");

        const removeWidget = createTab("delete", remove);
        removeWidget.classList.add("task-remove");

        const timeWidget = createTab(taskTime, time);
        timeWidget.classList.add("task-time");

        const dateWidget = createTab(taskDate, calendar);
        dateWidget.classList.add("task-date");

        taskWidgets.appendChild(timeWidget);
        taskWidgets.appendChild(dateWidget);
        taskWidgets.appendChild(editWidget);
        taskWidgets.appendChild(removeWidget);
    
        content.appendChild(taskTitle);
        content.appendChild(taskDescription);
        content.appendChild(taskWidgets);
    
        //-----
        task.appendChild(radio);
        task.appendChild(content);
    
        return task;
    };

    return {taskName, taskContent, taskTime, taskDate, createTask};
}

const TaskList = () => {
    let tasks = [];
    
    const addTask = (newTask) => {
        tasks.push(newTask);
    }

    const displayTasks = () => {
        const taskDisplay = document.querySelector(".task-display");

        for (let i = 0; i < tasks.length; i++) {
            const taskToBeAdded = tasks[i].createTask();
            taskToBeAdded.value = i;
            taskDisplay.appendChild(taskToBeAdded);
        }
    }

    const removeTask = (index) => {
        tasks.splice(index,1);
    };

    const replaceTask = (index, newTask) => {
        newTask.value = index;
        tasks[index] = newTask;
    };

    return {addTask, displayTasks, removeTask, replaceTask};
}




export {
    Task, TaskList
}

