import { deleteTaskInTaskList, updateTaskInTaskList } from "./tasklist.js"

export const taskListComponent = ({id, description, _id, done}) => {
  const todoItem = document.createElement('li')
  todoItem.classList.add(`todo-item`)
  
  
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.id = id
  checkbox.checked = done
  checkbox.onchange = function(e){
    updateTaskInTaskList(id, {done: e.target.checked})
  }

  const textNode = document.createElement('span')
  textNode.textContent = description 
  if (done){
    textNode.classList.add(`done`)
  }

  const delButton = document.createElement('button')
  delButton.type = 'submit'
  delButton.textContent = `DEL`
  delButton.id = _id
  delButton.onclick = function() {
    deleteTaskInTaskList(id)
  }

  todoItem.append(checkbox)
  todoItem.append(textNode)
  todoItem.append(delButton)

  return todoItem
}