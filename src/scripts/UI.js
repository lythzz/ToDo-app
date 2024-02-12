import {createProject, removeProject, list } from "./createProject";
import { createTask, removeTask} from "./createTask";
import { getTodayTasks, getWeekTasks } from "./dateFilter";
import { setStorage } from "./storage";


const setEventListeners = () => {
    const newProjectBtn = document.querySelector('#newProject')
    newProjectBtn.addEventListener('click', showProjectForm)

    const cancelBtn = document.querySelector('.cancel')
    cancelBtn.addEventListener('click', hideProjectForm)

    const submitBtn = document.querySelector('.submit')
    submitBtn.addEventListener('click', processInput)

    const toggleBtn = document.querySelector('#toggleProjects')
    toggleBtn.addEventListener('click', toggleProjects)

    const submitTask = document.querySelector('.submitTaskForm')
    submitTask.addEventListener('click', function(event){
        event.preventDefault()
        processTaskInput()
    })

    const cancelTask = document.querySelector('.closeTaskForm')
    cancelTask.addEventListener('click', closeTaskModal)

    const newTaskBtn = document.querySelector('.newTask')
    newTaskBtn.addEventListener('click', openTaskModal)

    const homeBtn = document.querySelector('#home')
    homeBtn.addEventListener('click', () => {selectProject(homeBtn); setStorage(); })

    const weekBtn = document.querySelector('#week')
    weekBtn.addEventListener('click', () => {selectProject(weekBtn); setStorage(); })

    const todayBtn = document.querySelector('#today')
    todayBtn.addEventListener('click', () => {selectProject(todayBtn); setStorage(); })
}

const showProjectForm = () => {
    const form = document.querySelector('.projectForm')
    form.classList.remove('hidden')
    document.querySelector('#projectName').focus()
}

const hideProjectForm = () => {
    const input = document.querySelector('#projectName')
    input.value = "";

    const form = document.querySelector('.projectForm')
    form.classList.add('hidden')
}

const toggleProjects = () => {
    const projects = document.querySelector('.projects')
    const toggleBtn = document.querySelector('#toggleProjects')

    if(projects.classList. contains('hidden')){
        projects.classList.remove('hidden')
        toggleBtn.style.transform = 'rotate(0)'

        } else {
            projects.classList.add('hidden')
            toggleBtn.style.transform = 'rotate(-0.25turn)'
    }     
}

const openTaskModal = () => {
    const modal = document.querySelector('.modal')
    modal.style.display = 'block'
}

const closeTaskModal = () => {
    const modal = document.querySelector('.modal')
    modal.style.display = 'none'

    const name = document.querySelector('#taskName')
    name.value = ''

    const date = document.querySelector('#taskDate')
    date.value = ''

    const desc = document.querySelector('#taskDesc')
    desc.value = ''   
}

//Projects UI relative
const processInput = () => {
    const projectName = document.querySelector('#projectName').value
    if(projectName == ''||list.checkNames(projectName)){
        return
    } else {
        createProject(projectName)
        loadProjects()
        hideProjectForm()
    }
}

const loadProjects = () => {
    const projectDOM = document.querySelector('.projects')
    const childs = document.querySelectorAll('.pContainer')

    if(childs.length>0){
        childs.forEach(child => {
            projectDOM.removeChild(child)
        });
    }

    const projects = list.get()
    projects.forEach(e => {
        if(e.name!='home'&&e.name!='today'&&e.name!='week'){
        const name = document.createElement('p')
        const remove = document.createElement('p')
        const div = document.createElement('div')

        name.innerText = e.name
        remove.innerHTML = '<i class="fa-solid fa-trash"></i>'

        name.classList.add('pName')
        remove.classList.add('pRemove')
        div.classList.add('pContainer')
        div.setAttribute('id', `${e.name}`)

        div.addEventListener('click', () => selectProject(div))
        remove.addEventListener('click', function(){
            removeProject(e.name)
            projectDOM.removeChild(document.querySelector(`#${e.name}`))
        })
        div.appendChild(name)
        div.appendChild(remove)
        projectDOM.appendChild(div)
}})}

const selectProject = (div) => {
    const id = div.getAttribute('id')
    const newTaskBtn = document.querySelector('.newTask')
    if(newTaskBtn.classList.contains('hidden')){
        newTaskBtn.classList.remove('hidden')
    }
    if(id=='today'||id=='week'){
        newTaskBtn.classList.add('hidden')
    }
    const index = list.getIndex(id)
    list.clearSelected()
    list.select(index)
    loadTasks()


    const prevSelected = document.querySelector('.selected')
    if(prevSelected!==null){
    prevSelected.classList.remove('selected')}
    div.classList.add('selected')
}

//Task UI
const processTaskInput = () => {
    const name = document.querySelector('#taskName').value
    const date = document.querySelector('#taskDate').value
    const desc = document.querySelector('#taskDesc').value

    if(name==''||date==''){
        return
    }

    createTask(name, date, desc)
    closeTaskModal()
}

const loadTasks =  () => {
    getTodayTasks()
    getWeekTasks()
    const index = list.getSelected()
    const container = document.querySelector('.tasksContainer')
    container.innerHTML = ''

    if(index==undefined||list.get()[index].taskList.length<1){
        return
    }

    list.get()[index].taskList.forEach(task => {
    const taskContainer = document.createElement('div')

    const taskInfo = document.createElement('div')
    const check = document.createElement('input')
    const taskText = document.createElement('div')
    const taskTitle = document.createElement('div')
    const taskDesc = document.createElement('div')

    const taskInfo2 = document.createElement('div')
    const taskOptions = document.createElement('div')
    const taskDate = document.createElement('div')

    taskContainer.classList.add('task')

    taskInfo.classList.add('taskInfo')
    taskInfo2.classList.add('taskInfo')
    check.setAttribute('id', 'taskDone')
    check.setAttribute('type', 'checkbox')
    taskText.classList.add('taskText')
    taskTitle.classList.add('taskTitle')
    taskDesc.classList.add('taskDesc')

    taskOptions.classList.add('taskOptions')
    taskDate.classList.add('taskDate')

    taskTitle.innerText = task.name
    taskDesc.innerText = task.description
    taskDate.innerText = task.dueDate
    taskOptions.innerHTML = '<i class="fa-solid fa-trash"></i>'

    taskOptions.addEventListener('click', () => removeTask(task.name))    

    taskInfo.appendChild(check)
    taskText.appendChild(taskTitle)
    taskText.appendChild(taskDesc)
    taskInfo.appendChild(taskText)
    
    taskInfo2.appendChild(taskDate)
    taskInfo2.appendChild(taskOptions)
    

    taskContainer.appendChild(taskInfo)
    taskContainer.appendChild(taskInfo2)

    container.appendChild(taskContainer)
    });
}

export{setEventListeners, loadTasks, loadProjects}    