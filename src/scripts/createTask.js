import { list } from "./createProject";
import { setStorage } from "./storage";
import { loadTasks, openTaskModal } from "./UI";

class Task{
    constructor(name, description, dueDate='No date'){
        this.name = name
        this.description = description
        this.dueDate = dueDate
        this.done = false
    }
}

function createTask(name, date, desc){
    const task = new Task(name, desc, date)
    const index = list.getSelected()
    list.get()[index].taskList.push(task)
    setStorage()
    loadTasks()
    
}

function editTask (task) {
    const name = document.querySelector('#taskName')
    const date = document.querySelector('#taskDate')
    const desc = document.querySelector('#taskDesc')
   
    const reverseDate = `${task.dueDate.slice(-4)}-${task.dueDate.slice(3,5)}-${task.dueDate.slice(0,2)}`

    name.value = task.name
    date.value = reverseDate
    desc.value = task.description

    openTaskModal()
    list.editQueue.name = task.name
    list.editQueue.task = task

    const header = document.querySelector('.formHeader')
    header.innerText = 'Edit Task'

    const submitTask = document.querySelector('.submitTaskForm')
    submitTask.classList.add('hidden')

    const editTask = document.querySelector('.editTaskForm')
    editTask.classList.remove('hidden')
    
}

function removeTask(task){
    list.removeTask(task.name, task)

    loadTasks()
    setStorage()
}

export {createTask, removeTask, editTask, Task}