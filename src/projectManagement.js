import { TaskList } from "./taskManagement";
import remove from './images/remove.svg';
import arrow from './images/arrow.svg';

const ProjectList = () => {
    let projects = [];

    const addProject = (project) => {
        projects.push(project);
    }

    const displayProjects = () => {
        for (let i = 0; i < projects.length; i ++) {
            const taskDisplay = document.querySelector(".task-display");
            const projectToBeDisplayed = projects[i].createProject();
            projectToBeDisplayed.value = i;
            taskDisplay.appendChild(projectToBeDisplayed);

        }
    }

    const removeProject = (index) => {
        projects.splice(index, 1);
    }

    return {addProject, displayProjects, removeProject, projects};
}

const Project = (name) => {
    const projectTaskList = TaskList();

    const createProject = () => {
        const container = document.createElement("div");
        container.classList.add("project");

        const projectTitle = document.createElement("div");
        projectTitle.classList.add("project-title");
        projectTitle.textContent=name;

        const deleteIcon = document.createElement("img");
        deleteIcon.classList.add("delete-project");
        deleteIcon.src = remove;

        const arrowIcon = document.createElement("img");
        arrowIcon.src = arrow;
        arrowIcon.classList.add("arrow");


        container.appendChild(projectTitle);
        container.appendChild(deleteIcon);
        container.appendChild(arrowIcon);
        return container;
    }


    return {name, projectTaskList, createProject};
}


export {
    ProjectList, Project
}

