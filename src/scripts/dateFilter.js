import { list } from "./createProject";
import {format} from 'date-fns'

const getTodayTasks = () => {
const today = format(new Date, 'dd/MM/yyyy')
const i = list.getIndex('today')
let todayTasks = list.get()[i].taskList
todayTasks.splice(0, todayTasks.length)

list.get().forEach(project => {
    if(project.name!='today'&&project.name!='week'){
        project.taskList.forEach(task => {
            if(task.dueDate==today){
                todayTasks.push(task)
            
        }
    }
)}})
}

const getWeekTasks = () => {
    const date = new Date
    const today = format(date, 'dd/MM/yyyy')
    const week = format(date.setDate(date.getDate() + 7), 'dd/MM/yyyy')
    const i = list.getIndex('week')
    const weekTasks = list.get()[i].taskList
    weekTasks.splice(0, weekTasks.length)
    
    list.get().forEach(project => {
        if(project.name!='today'&&project.name!='week'){
            project.taskList.forEach(task => {
                if(task.dueDate>=today&&task.dueDate<=week){
                    weekTasks.push(task)
                }
            }   
    )}})}

export {getTodayTasks, getWeekTasks}