import { addTodoTask, deleteTodoTask, getTodoList, updateTodoTask } from "./api-client.js"
import { taskListComponent } from "./component.js"
import { placeholderComponent } from "./placeholderComponent.js"
import { modal } from './modal.js'

class XMap {
  constructor() {
    this._map = new Map()
    // Get all, if any, task from the back-end on creating the instance of our map
    getTodoList()
      .then(res => {
       for (let i=0; i < res.data.length; i++){
        let body = res.data[i]
        this._map.set(body.id, body)
       }
      // Fire a render after getting the tasks from our back-end and adding them to our Map
      render()
      })
  }

  set (key, value) {
    // Add task to the Map
    this._map.set(key, value)
    // Update the back-end and subsequently update the task in our Map with the id from the back-end
    addTodoTask(this._map.get(key))
      .then(res => {
        this._map.set(key,  res.data )
        render()
      })
    }

  delete (key) {
    const _id = this._map.get(key)._id
    deleteTodoTask(_id)
    this._map.delete(key)
    render()
  }

  forEach(callback) {
    for (const [key, value] of this._map){
      callback(value)
    }
  }

  get (key) {
    return this._map.get(key)
  }


  update(id, props){
    const task = this._map.get(id)
    for(let key in task){
      if(props.hasOwnProperty(key)){
        task[key] = props[key]
      } 
    }
    // Updating the back end after the front-end
    updateTodoTask(task._id, this._map.get(id))
    render()
  }

  length() {
    return this._map.size
  }

  retrieve(key) {
    const obj = this._map.get(key)
    return obj
  }
}

const taskList = new XMap()

// task that get added from the input form
// text gets pulled from the input field
// done is set to false by default
// id is created to be used in the XMap()
// _id _createdOn _updatedOn are set by the API
const insertIntoTaskList = (text) => {
  let id = Math.floor(Math.random() * 10000000)
  let done = false
  let description = text
  taskList.set(id, {id: id, description: description, done: done})
}

export const updateTaskInTaskList = (id, props) => {
  taskList.update(id, props)
}

export const deleteTaskInTaskList = (id) => {
  taskList.delete(id)
}

export const displayEditModal = (id, description) => {
  const comp = modal(id, description)
  document.querySelector('body').append(comp)
}

// Render function that simply clears the list and renders all the items in our Map()
// If there are no items in Map() a placeholder is shown
function render() {
  // Clear the list before rendering
  document.getElementById('todo').innerHTML = ''
  if (taskList.length()) {
    taskList.forEach(item => {
    const comp = taskListComponent(item)
    document.getElementById('todo').append(comp)
  })
} else {
  const comp = placeholderComponent()
  document.getElementById('todo').append(comp)  
  }
}

// Listening for a task to be added
document.getElementById('todo-btn').addEventListener('click', (e)=> {
  e.preventDefault()
  let task = document.getElementById('todo-text')
  if (task.value) {
    insertIntoTaskList(task.value)
  }
  task.value = ''
})
