import './style.css'
import { createButton } from './src/components/button/button'
import { createApi } from 'unsplash-js'
import { cardTemplate } from './src/components/card/card'

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY
})

const searchPhotos = async (keyword) => {
  const images = await unsplash.search.getPhotos({
    query: keyword,
    page: 1,
    perPage: 30
  })
  return images
}

// HEADER
const headerTemplate = () => {
  return `
  <h1>P</h1>
  <div id=busqueda>
  <input type="text" placeholder="Search" id="searchinput"/>
  ${createButton({
    id: 'searchbtn',
    img: '/assets/search.png',
    alt: 'Search icon'
  })} </div>
  ${createButton({
    id: 'darkmodebtn',
    img: '/assets/darkmode.png',
    alt: 'Dark mode icon'
  })}
  <img
    src="/assets/profilepic.png"
    alt="Profile image"
    class="profileimg"
  /> 
    `
}

const themeSwitch = () => {
  document.body.classList.toggle('dark')
}

const listeners = () => {
  const darkmodebtn = document.querySelector('#darkmodebtn')
  darkmodebtn.addEventListener('click', () => {
    themeSwitch()
    const theme = document.body.classList.contains('dark')
  })
}

const printHeaderTemplate = () => {
  document.querySelector('header').innerHTML = headerTemplate()
  listeners()
}

printHeaderTemplate()

const reload = document.querySelector('h1')
reload.addEventListener('click', () => {
  location.reload()
})

//GALLERY

const galleryTemplate = () => {
  return `
    <ul class="gallery">
    </ul>
    `
}

const printItems = (items) => {
  const gallery = document.querySelector('.gallery')
  gallery.innerHTML = ''
  for (const item of items) {
    gallery.innerHTML += cardTemplate(item)
  }
}

const galleryListeners = async () => {
  const input = document.querySelector('#searchinput')
  const searchbtn = document.querySelector('#searchbtn')
  searchbtn.addEventListener('click', async () => {
    const images = await searchPhotos(input.value)
    if (images.response.total != 0) {
      printItems(images.response.results)
    } else {
      const images = await searchPhotos('gatos')
      printItems(images.response.results)
      const sugestion = document.createElement('h2')
      sugestion.innerText = 'Prueba otra frase o palabra'
      const gallery = document.querySelector('.gallery')
      const main = document.querySelector('main')
      main.insertBefore(sugestion, gallery)
    }
    input.value = ''
  })
}

export const printTemplate = async () => {
  document.querySelector('main').innerHTML = galleryTemplate()
  galleryListeners()
  const images = await searchPhotos('gatos')
  printItems(images.response.results)
}

printTemplate()

// FOOTER

import { printFooterTemplate } from './src/components/FOOTER/footer'
printFooterTemplate()
