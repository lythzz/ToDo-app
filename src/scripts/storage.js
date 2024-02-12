import { list } from "./createProject";

function setStorage(){
    localStorage.clear()
    localStorage.setItem('list', JSON.stringify(list.get()))
}

export {setStorage}