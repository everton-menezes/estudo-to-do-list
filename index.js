let tasks = [
    { id: 1, description: 'Tarefa 1', checked: false},
    { id: 2, description: 'Tarefa 2', checked: false},
    { id: 3, description: 'Tarefa 3', checked: false},
    { id: 4, description: 'Tarefa 4', checked: false},
    { id: 5, description: 'Tarefa 5', checked: false},
    { id: 6, description: 'Tarefa 6', checked: false},
    { id: 7, description: 'Tarefa 7', checked: false},
    { id: 8, description: 'Tarefa 8', checked: false},
    { id: 9, description: 'Tarefa 9', checked: false},
]

const removeTask = (taskId) => {
    tasks = tasks.filter(({ id }) => parseInt(id) !== parseInt(taskId))

    document
        .getElementById('to-do-list')
        .removeChild(document.getElementById(taskId))
}

const createTaskListItem = (task, checkbox) => {
    const list = document.getElementById('to-do-list')
    const toDo = document.createElement('li')

    const removeTaskButton = document.createElement('button')
    removeTaskButton.textContent = 'X'
    removeTaskButton.ariaLabel = 'Remover Tarefa'

    removeTaskButton.onclick = () => removeTask(task.id)

    toDo.id = task.id
    toDo.appendChild(checkbox)
    toDo.appendChild(removeTaskButton)
    list.appendChild(toDo)

    return toDo;
}

const getCheckboxInput = ({id, description, checked}) => {
    const checkbox = document.createElement('input')
    const label = document.createElement('label')
    const wrapper = document.createElement('div')
    const checkboxId = `${id}-checkbox`

    checkbox.type = 'checkbox'
    checkbox.id = checkboxId
    checkbox.checked = checked || false

    label.textContent = description
    label.htmlFor = checkboxId
 
    wrapper.className = 'checkbox-label-container'
    wrapper.appendChild(checkbox)
    wrapper.appendChild(label)

    return wrapper

}

const getNewTaskId = () => {
    const lastId = tasks[tasks.length - 1]?.id
    return lastId ? lastId +1 : 1
}

const getNewTaskData = (event) => {
    const description = event.target.elements.description.value
    const id = getNewTaskId()

    return { description, id }
}

const createTask = (event) => {
    event.preventDefault()
    const newTaskData = getNewTaskData(event)

    const { id, description } = newTaskData

    const checkbox = getCheckboxInput(newTaskData)
    createTaskListItem(newTaskData, checkbox)

    tasks = [
        ...tasks,
        {id: newTaskData.id, description: newTaskData.description, checked: false}
    ]
}

window.onload = function(){
    const form = document.getElementById('create-to-do-form')
    form.addEventListener('submit', createTask)

    tasks.forEach((task) => {
        const checkbox = getCheckboxInput(task)
        createTaskListItem(task, checkbox)
    })
}