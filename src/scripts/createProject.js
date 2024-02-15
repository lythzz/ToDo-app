import { setStorage } from "./storage"

//Projects management
class Project {
    constructor(name){
        this.name = name
        this.taskList = []
        this.selected = false
    }

    setName(name) {
        this.name = name
    }

    getName(){
        return this.name
    }

    addTask(task){
        this.taskList.push(task)
    }

    deleteTask(taskName) {
        this.tasks = this.tasks.filter((task) => task.name !== taskName)
    }
}

const list = (function(){
    let list = JSON.parse(localStorage.getItem('list'))
    if(list==null||list==undefined){
        list = [
            {
                'name': 'home',
                'taskList': [],
                'selected': true
            },
            {
                'name': 'today',
                'taskList': [],
                'selected': false
            },
            {
                'name': 'week',
                'taskList': [],
                'selected': false
            }
        ]
    }
    const get = () => {return list}
    const add = (project) => list.push(project)
    const checkNames = (name) => {
        for(let i = 0; i < list.length; i++){
            if(list[i].name==name){
                return true
            }
        }
    }

    const clearSelected = () => list.forEach(project => {
        project.selected = false
    });

    const select = (i) => list[i].selected = true;

    const getSelected = () => {
        for(let i = 0; i < list.length; i++){
            if(list[i].selected){
                return i
            }
        }
    }

    const getIndex = (name) =>{ for(let i = 0; i < list.length; i++){
            if(list[i].name==name){
                return i
            }
        }
    }
    const remove = (index) => {
        delete list[index]
        for(let i = index;i<list.length ;i++){ //altera o index dos obj para não deixar buracos na array
            list[i] = list[i+1]
        }
        list.pop()
        
    }

    const editQueue = {}

    const editTask = (name, oldTask, newTask) => {
        let index = getSelected()
        if(index==getIndex('today')||index==getIndex('week')){
            index = getIndex(oldTask.origin)
        }
        list[index].taskList.forEach(task => {
            if(task.name = name){
                const i = list[index].taskList.indexOf(task)
                list[index].taskList[i] = newTask
                console.log(list[index])
            }
        });
    }
    const removeTask = (task) => {
        let index = getSelected()
        if(index==getIndex('today')||index==getIndex('week')){
            index = getIndex(task.origin)
        }
        list[index].taskList = list[index].taskList.filter((listTask) => listTask.name !== task.name)
    }

    const checkTaskName = (name) => {
        const i = getSelected()
        for (let index = 0; index < list[i].taskList.length; index++) {
            if(list[i].taskList[index].name==name){
                return true
            }
        }
    }

    return {get, add, checkNames, select, clearSelected, getIndex, getSelected, remove, checkTaskName, removeTask, editTask, editQueue}
})();

function createProject(name){
    const proj = new Project(name)
    list.add(proj)
    setStorage()
}

function removeProject(name){
    const index = list.getIndex(name)
    list.remove(index)
    setStorage()
}

export { list, createProject, removeProject}