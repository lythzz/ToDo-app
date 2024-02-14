import { list } from "./createProject";
import { setStorage } from "./storage";
import { loadTasks, openTaskModal } from "./UI";
import {format} from 'date-fns'

class Task{
    constructor(name, description, dueDate='No date'){
        this.name = name
        this.description = description
        this.dueDate = dueDate
        this.done = false
    }
}

function createTask(name, date, desc){

    const formatedDate = format(new Date(date.replace(/-/g, '\/')), 'dd/MM/yyyy')
    const task = new Task(name, desc, formatedDate)
    const index = list.getSelected()
    list.get()[index].taskList.push(task)
    setStorage()
    loadTasks()
    
}

function editTask (name, task) {
    openTaskModal()
    list.editQueue.name = name
    list.editQueue.task = task
    
    const header = document.querySelector('.formHeader')
    header.innerText = 'Edit Task'

    const submitTask = document.querySelector('.submitTaskForm')
    submitTask.classList.add('hidden')

    const editTask = document.querySelector('.editTaskForm')
    editTask.classList.remove('hidden')
    
}

function removeTask(name, task){
    list.removeTask(name, task)

    loadTasks()
    setStorage()
}

export {createTask, removeTask, editTask, Task}