import "./button.css"

export const createButton = ({id, img, alt}) => {
  return `<button id= "${id}"><img src= "${img}" alt="${alt}"></button>`
}