import { list } from "./createProject";
import { setStorage } from "./storage";
import { loadTasks } from "./UI";
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

function removeTask(name){
    list.removeTask(name)

    loadTasks()
    setStorage()
}

export {createTask, removeTask}