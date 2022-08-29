import { addTodoTask, deleteTodoTask, getTodoList, updateTodoTask } from "./api-client.js"
import { taskListComponent } from "./component.js"
import { placeholderComponent } from "./placeholderComponent.js"
import { modal } from './modal.js'

class XMap {
  constructor() {
    this._map = new Map()
    getTodoList()
      .then(res => {
       for (let i=0; i < res.data.length; i++){
        let body = res.data[i]
        this._map.set(body.id, body)
       }
       console.log
       render()
      })
  }

  set (key, value) {
    this._map.set(key, value)
    addTodoTask(this._map.get(key))
      .then(res => {
        updateTaskInTaskList(key, { _id: res.data._id })
      })
    render()
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
// _id _createdOn _updatedOn are set by te API
const insertIntoTaskList = (text) => {
  let id = Math.floor(Math.random() * 10000000)
  let _id
  let _createdOn
  let done = false
  let description = text
  taskList.set(id, {id: id, description: description, done: done, _id: _id, _createdOn: _createdOn})
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

document.getElementById('todo-btn').addEventListener('click', (e)=> {
  e.preventDefault()
  let task = document.getElementById('todo-text')
  if (task.value) {
    insertIntoTaskList(task.value)
  }
  task.value = ''
})