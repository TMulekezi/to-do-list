import './style.css';
import search from './images/search.svg';
import tasks from './images/tasks.svg';
import plus from './images/plus.svg';
import projects from './images/projects.svg';
import {Task, TaskList} from  './taskManagement.js';
import { Project, ProjectList } from './projectManagement';



function createSearchBar() {

    const searchBar = document.createElement("div");
    searchBar.classList.add("search-bar");

    const searchIcon = document.createElement("img");
    searchIcon.src = search;

    const searchInput = document.createElement("input");
    searchInput.type = "text";

    searchBar.appendChild(searchIcon);
    searchBar.appendChild(searchInput);

    return searchBar;
}

function createTab(name, icon) {
    const tab = document.createElement("div");
    tab.classList.add("tab");

    const text = document.createElement("div");
    text.classList.add("text");

    text.textContent = name;

    const image = document.createElement("img");
    image.src = icon;

    tab.appendChild(image);
    tab.appendChild(text);
    return tab;
}


function clearTaskDisplay() {
    const taskDisplay = document.querySelector(".task-display");
    while (taskDisplay.firstChild) {
        taskDisplay.removeChild(taskDisplay.lastChild);
    }
}

function deleteTask() {
    const parentIndex = this.parentNode.parentNode.parentNode.value;
    console.log(parentIndex);
    allTasks.removeTask(parentIndex);
    clearTaskDisplay();
    allTasks.displayTasks();
    addRemoveFunctionality();
    addEditFunctionality();
}

function handleSubmitForm(e) {
    e.preventDefault();
    if (!editTracker) {
        let title = document.getElementById("title").value;
        let description = document.getElementById("description").value;
        let time = document.getElementById("time").value;
        let date = document.getElementById("date").value;
        const newTask = Task(title, description, time, date);
        clearTaskDisplay();

        

        if (insideProject >= 0) {
            const currentProject = projectList.projects[insideProject];
            const currentProjectTasks = currentProject.projectTaskList;
            currentProjectTasks.addTask(newTask);
            currentProjectTasks.displayTasks();
        } else {
            allTasks.addTask(newTask);
            allTasks.displayTasks();
        }
        const taskForm = document.querySelector(".task-form");
        taskForm.style.visibility = "hidden";
        addRemoveFunctionality();
        addEditFunctionality();
    } else {
        let title = document.getElementById("title").value;
        let description = document.getElementById("description").value;
        let time = document.getElementById("time").value;
        let date = document.getElementById("date").value;
        const newTask = Task(title, description, time, date);
        clearTaskDisplay();

        if (insideProject >= 0) {
            const currentProject = projectList.projects[insideProject];
            const currentProjectTasks = currentProject.projectTaskList;
            currentProjectTasks.replaceTask(editTask,newTask);
            currentProjectTasks.displayTasks();

        } else {
            allTasks.replaceTask(editIndex, newTask);      
            allTasks.displayTasks();
        }
        ///
        const taskForm = document.querySelector(".task-form");
        taskForm.style.visibility = "hidden";

        addRemoveFunctionality();
        addEditFunctionality();
        editTracker = false;
    }
    

}

function addRemoveFunctionality() {
    const deleteButtons = document.querySelectorAll(".task-remove");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", deleteTask);
    });
}


function addEditFunctionality() {
    const editButtons = document.querySelectorAll(".task-edit");
    editButtons.forEach((button) => {
        button.addEventListener("click", editTask);
    });
}

function editTask() {
    editTracker = true;
    const taskForm = document.querySelector(".task-form");
    taskForm.style.visibility = "visible";

    const parentNode = this.parentNode.parentNode.parentNode;
    const parentIndex = parentNode.value;
    editIndex = parentIndex;

    const titleInput = parentNode.querySelector("h3").textContent;
    document.getElementById("title").value = titleInput;
    const descriptionInput = parentNode.querySelector(".task-description").textContent;
    document.getElementById("description").value = descriptionInput;
    const timeInput = parentNode.querySelector(".task-time>.text").textContent;
    document.getElementById("time").value = timeInput;
    const dateInput = parentNode.querySelector(".task-date>.text").textContent;
    document.getElementById("date").value = dateInput;
 
}



// ----------------------- tasks page --------------------//
const allTasks = TaskList();
const projectList = ProjectList();
let editTracker = false;
let editIndex = 0;
let page = "Daily tasks";
let insideProject = -1;

const container = document.querySelector(".container");

const header = document.querySelector(".main-header");


const logo = document.createElement("h1");
logo.textContent = "DoMore";
const searchBar = createSearchBar();

container.appendChild(logo);
// container.appendChild(searchBar);





const mainHeader = document.createElement("h1");
mainHeader.textContent = "Daily tasks";

const addIcon = document.createElement("img");
addIcon.classList.add("add");
addIcon.src = plus;
addIcon.addEventListener("click",() => {
    if (page ==="Daily tasks") {
        const taskForm = document.querySelector(".task-form");
        taskForm.style.visibility = "visible";
    } else if (page === "Projects") {
        const projectForm = document.querySelector(".project-form");
        projectForm.style.visibility = "visible";
    }
})

header.appendChild(mainHeader);
header.appendChild(addIcon);

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmitForm);

const exit = document.querySelector("p");
exit.addEventListener("click",() => {
    const taskForm = document.querySelector(".task-form");
    console.log(taskForm);
    taskForm.style.visibility = "hidden";
    editTracker = false;
})


// --------- projects page -------------------//

const projectFromClose = document.querySelector(".project-form>form>p");
console.log(projectFromClose);
projectFromClose.addEventListener("click", () => {
    console.log("here");
    const projectForm = document.querySelector(".project-form");
    projectForm.style.visibility = "hidden";
});

const projectSubmit = document.querySelector(".project-form>form");
projectSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    let projectName = document.getElementById("project-name").value;
    const newProject =  Project(projectName);
    projectList.addProject(newProject);
    clearTaskDisplay();
    projectList.displayProjects();
    const projectForm = document.querySelector(".project-form");
    projectForm.style.visibility = "hidden";

    addProjectDeleteFunctionality();
    addExpandProjectFunctionality();
    
});




function addProjectDeleteFunctionality() {
    const projectDeleteButtons = document.querySelectorAll(".delete-project");
    
    projectDeleteButtons.forEach((button) => {
        
        button.addEventListener("click", deleteProject)
    })

}

function deleteProject() {
    const project = this.parentNode;
    let projectIndex = project.value;
    projectList.removeProject(projectIndex);
    clearTaskDisplay();
    projectList.displayProjects();
    addProjectDeleteFunctionality();
    addExpandProjectFunctionality();
}

function addExpandProjectFunctionality() {
    const projectDeleteButtons = document.querySelectorAll(".arrow");
    
    projectDeleteButtons.forEach((button) => {
        
        button.addEventListener("click", expandProject);
    })

}

function expandProject() {
    const project = this.parentNode;
    insideProject = project.value;
    setHeader(project.querySelector(".project-title").textContent);
    page = "Daily tasks";
    clearTaskDisplay();
    const currentProject = projectList.projects[insideProject];
    const currentProjectTasks = currentProject.projectTaskList;
    currentProjectTasks.displayTasks();
}






// ----------- page navigation --------------//
const tabs = document.querySelector(".sidebar");

const tasksTab = createTab("Daily tasks", tasks);
tasksTab.classList.add("tasks-tab");
tasksTab.addEventListener("click", () =>{
    page = "Daily tasks";
    setHeader(page);
    clearTaskDisplay();
    allTasks.displayTasks();
    addRemoveFunctionality();
    addEditFunctionality();
    const projectForm = document.querySelector(".project-form");
    projectForm.style.visibility = "hidden";
    insideProject = -1;
    
});

const projectsTab = createTab("Projects", projects);
projectsTab.classList.add("projects-tab");
projectsTab.addEventListener("click", () =>{
    page = "Projects";
    setHeader(page);
    clearTaskDisplay();
    projectList.displayProjects();
    addProjectDeleteFunctionality();
    addExpandProjectFunctionality();
    const taskForm = document.querySelector(".task-form");
    taskForm.style.visibility = "hidden";
    insideProject = -1;

});

tabs.appendChild(tasksTab);
tabs.appendChild(projectsTab);


function setHeader(name) {
    document.querySelector("h1").textContent = name;
}





export {
    createTab,
};