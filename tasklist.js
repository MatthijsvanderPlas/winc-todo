import { addTodoTask, deleteTodoTask, getTodoList, updateTodoTask } from "./api-client.js"
import { taskListComponent } from "./component.js"

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

  get (key) {
    return this._map.get(key)
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

  update(id, props){
    const task = taskList.get(id)
    for(let key in task){
      if(props.hasOwnProperty(key)){
        task[key] = props[key]
      }
    }
    updateTodoTask(task._id, this._map.get(id))
    render()
  }
}

const taskList = new XMap()

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

// Render function that simply clears the list and renders all the items in our Map()
function render() {
  document.getElementById('todo').innerHTML = ''
  taskList.forEach(item => {
  const comp = taskListComponent(item)
  document.getElementById('todo').append(comp)
  })
}

document.getElementById('todo-btn').addEventListener('click', (e)=> {
  e.preventDefault()
  let task = document.getElementById('todo-text')
  if (task.value) {
    insertIntoTaskList(task.value)
  }
})