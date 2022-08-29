export const placeholderComponent = () => {
  const div = document.createElement('div')
  div.classList.add('placeholder')

  const img = document.createElement('i')
  img.classList.add('placeholder-img', 'fa-solid', 'fa-8x', 'fa-clipboard-check')

  const text = document.createElement('p')
  text.classList.add('placeholder-text')
  text.textContent = 'Please add your first item!'

  div.append(img)
  div.append(text)

  return div
}