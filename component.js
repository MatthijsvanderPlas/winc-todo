import { deleteTaskInTaskList, updateTaskInTaskList, displayEditModal } from "./tasklist.js"

export const taskListComponent = ({id = 0, description, _id, done}) => {
  const todoItem = document.createElement('li')
  todoItem.classList.add(`todo-item`)
  todoItem.onclick = function(e) {

    if (e.target.localName === 'span') {
      if (!done){
        displayEditModal(id, e.target.textContent)
      }
    }
  }
    
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.id = id
  checkbox.checked = done
  checkbox.onchange = function(e){
    updateTaskInTaskList(id, {done: e.target.checked})
  }

  const textNode = document.createElement('span')
  textNode.textContent = description
  textNode.dataset.id = id
  if (done){
    textNode.classList.add(`done`)
  }

  const delButton = document.createElement('button')
  delButton.type = 'submit'
  delButton.classList.add('del-btn')
  delButton.id = _id
  delButton.onclick = function() {
    deleteTaskInTaskList(id)
  }

  const trash = document.createElement('i')
  trash.classList.add('fa-solid', 'fa-trash-can')
  delButton.append(trash)

  todoItem.append(checkbox)
  todoItem.append(textNode)
  todoItem.append(delButton)

  return todoItem
}