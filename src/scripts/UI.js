import {createProject, removeProject, list } from "./createProject";
import {Task, createTask, editTask, removeTask} from "./createTask";
import { getTodayTasks, getWeekTasks } from "./dateFilter";
import { setStorage } from "./storage";
import {format, compareAsc} from 'date-fns'


const setEventListeners = () => {
    //Project event listeners
    const newProjectBtn = document.querySelector('#newProject')
    newProjectBtn.addEventListener('click', showProjectForm)

    const cancelBtn = document.querySelector('.cancel')
    cancelBtn.addEventListener('click', hideProjectForm)

    const submitBtn = document.querySelector('.submit')
    submitBtn.addEventListener('click', processInput)

    const toggleBtn = document.querySelector('#toggleProjects')
    toggleBtn.addEventListener('click', toggleProjects)


    //Task event listeners
    const submitTask = document.querySelector('.submitTaskForm')
    submitTask.addEventListener('click', function(event){
        event.preventDefault()
        processTaskInput()
    })

    const editTaskBtn = document.querySelector('.editTaskForm')
    editTaskBtn.addEventListener('click', function(event){
        event.preventDefault()
        processEditInput()
    })

    const cancelTask = document.querySelector('.closeTaskForm')
    cancelTask.addEventListener('click', closeTaskModal)

    const newTaskBtn = document.querySelector('.newTask')
    newTaskBtn.addEventListener('click', openTaskModal)

    //Sidebar buttons
    const homeBtn = document.querySelector('#home')
    homeBtn.addEventListener('click', () => {selectProject(homeBtn); setStorage(); })

    const weekBtn = document.querySelector('#week')
    weekBtn.addEventListener('click', () => {selectProject(weekBtn); setStorage(); })

    const todayBtn = document.querySelector('#today')
    todayBtn.addEventListener('click', () => {selectProject(todayBtn); setStorage(); }) 
}

const showProjectForm = () => {
    const projects = document.querySelector('.projects')
    if(projects.classList. contains('hidden')){
        toggleProjects()
    }

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
    
    const header = document.querySelector('.formHeader')
    header.innerText = 'New Task'

    const submitTask = document.querySelector('.submitTaskForm')
    submitTask.classList.remove('hidden')

    const editTask = document.querySelector('.editTaskForm')
    editTask.classList.add('hidden')
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
            projectDOM.removeChild(document.getElementById(`${e.name}`))
            const home = document.querySelector('#home')
            selectProject(home)
            
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

//Task UI managment
const processTaskInput = () => {
    const name = document.querySelector('#taskName')
    const date = document.querySelector('#taskDate')
    const desc = document.querySelector('#taskDesc').value
    if(name.value==''){
        alert("The task name can't be blank!")
        return
    } else if(list.checkTaskName(name.value)){
        alert(`There's already a task with that name!`)
        return
    } else if(date.value == ""){
        alert("The due date can't be blank!")
        return
    }

    const formatedDate = format(new Date(date.value.replace(/-/g, '\/')), 'dd/MM/yyyy')
    const today = format(new Date, 'dd/MM/yyyy')
    if(compareAsc(new Date(formatedDate), new Date(today))==1){
        alert("You cannot set the due date to a past day")
        return
    }

    createTask(name.value, formatedDate, desc)
    closeTaskModal()
}

const processEditInput = () => {
    const name = list.editQueue['name']
    const task = list.editQueue['task']

    const newName = document.querySelector('#taskName')
    const newDate = document.querySelector('#taskDate')
    const newDesc = document.querySelector('#taskDesc').value
    if(newName.value==''){
        alert("The task name can't be blank!")
        return
    } else if(list.checkTaskName(newName.value)){
        alert(`There's already a task with that name!`)
        return
    } else if(newDate.value == ""){
        alert("The due date can't be blank!")
        return
    }

    const formatedDate = format(new Date(newDate.value.replace(/-/g, '\/')), 'dd/MM/yyyy')
    const today = format(new Date, 'dd/MM/yyyy')
    if(compareAsc(new Date(formatedDate), new Date(today))==1){
        alert("You cannot set the due date to a past day")
        return
    }
   
    const newTask =  new Task(newName.value, newDesc, formatedDate)
    list.editTask(name, task, newTask)

    closeTaskModal()
    loadTasks()
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
    const taskDelete = document.createElement('div')
    const taskDate = document.createElement('div')
    const taskEdit = document.createElement('div')

    taskContainer.classList.add('task')

    taskInfo.classList.add('taskInfo')
    taskInfo2.classList.add('taskInfo')
    check.setAttribute('id', 'taskDone')
    check.setAttribute('type', 'checkbox')
    taskText.classList.add('taskText')
    taskTitle.classList.add('taskTitle')
    taskDesc.classList.add('taskDesc')

    taskDelete.classList.add('taskOptions')
    taskDate.classList.add('taskDate')
    taskEdit.classList.add('taskOptions')
    
    check.checked = task.done
    taskTitle.innerText = task.name
    taskDesc.innerText = task.description
    taskDate.innerText = task.dueDate
    taskDelete.innerHTML = '<i class="fa-solid fa-trash"></i>'
    taskEdit.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>'

    taskDelete.addEventListener('click', () => removeTask(task))
    taskEdit.addEventListener('click', () => editTask(task))
    check.addEventListener('click', () => {
        if(task.done){
            task.done = false
            taskText.classList.remove('done')
            taskDate.classList.remove('done')
        } else {
            taskText.classList.add('done')
            taskDate.classList.add('done')
            task.done = true
        }

        setStorage()
    })

    if(task.done){
        taskText.classList.add('done')
        taskDate.classList.add('done')
    }

    taskInfo.appendChild(check)
    taskText.appendChild(taskTitle)
    taskText.appendChild(taskDesc)
    taskInfo.appendChild(taskText)
    
    taskInfo2.appendChild(taskDate)
    taskInfo2.appendChild(taskDelete)
    taskInfo2.appendChild(taskEdit)

    taskContainer.appendChild(taskInfo)
    taskContainer.appendChild(taskInfo2)

    container.appendChild(taskContainer)
    });
}

export{setEventListeners, loadTasks, loadProjects, processEditInput, openTaskModal}    