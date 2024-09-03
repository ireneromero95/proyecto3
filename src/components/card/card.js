import "./card.css"
import { createButton } from "../button/button"

export const cardTemplate = (item) => {
  return `
    <li class="gallery-item" style="background-image: url(${item.urls.regular}); border: 5px solid ${item.color}">
    <div class="info">
        <div class="save-btn">
        ${createButton({id: "save", img:"/assets/save.png", alt:"Save button"})}
        </div>
        <div class="links">
            <a href=${item.links.html} class="full-link">${item.links.html}</a>
            <div>
                <a href=${item.urls.full} target="_blank" class="links-icon">
                    <img src="/assets/upload.webp" alt="Upload icon"/>
                </a>
                <a href="#null" class="links-icon">
                    <img src="/assets/plus.png" alt="More icon"/>
                </a>    
            </div>
        </div>
    </div>
    </li>
    `
}