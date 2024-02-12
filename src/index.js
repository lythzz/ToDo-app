// Verificar localStorage
// Adicionar projetos
// Atualizar DOM
//

import { list } from "./scripts/createProject";
import { setEventListeners, loadTasks, loadProjects } from "./scripts/UI";


loadProjects()
list.select(0)
loadTasks()
setEventListeners()



