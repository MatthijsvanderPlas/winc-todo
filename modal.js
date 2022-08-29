import { updateTaskInTaskList } from './tasklist.js'

export const modal = (id, description) => {

  const grey = document.createElement('div')
  grey.classList.add('modal-bg')
  grey.onclick = function(e) {
    if(e.target.localName === 'div'){
      document.querySelector('body').children[1].remove()
    }
  }

  const elem = document.createElement('modal')
  elem.classList.add('modal')

  const form = document.createElement('form')
  form.classList.add('modal-form')

  const input = document.createElement('input')
  input.classList.add('modal-text')
  input.type = 'text'
  input.id = 'update'
  input.value = description

  const button = document.createElement('button')
  button.type = 'submit'
  button.classList.add('modal-btn')
  button.onclick = function(e) {
    const newDesc = document.getElementById('update').value
    updateTaskInTaskList(id, {description: newDesc})
  }

  const edit = document.createElement('i')
  edit.classList.add('fa-solid', 'fa-pen')
  button.append(edit)

  form.append(input)
  form.append(button)
  elem.append(form)
  grey.append(elem)

  return grey
}