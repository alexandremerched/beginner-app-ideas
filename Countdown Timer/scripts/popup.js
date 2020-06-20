const popup = document.querySelector('.popup-wrapper')

const showPopup = (content) => {
    const popupContent = document.querySelector('.popup-content p')

    popupContent.innerHTML = content
    popup.style.display = 'block'
}

popup.addEventListener('click', event => {
    const classNameOfClickedElement = event.target.classList[0]
    const classNames = ['popup-close', 'popup-wrapper']
    const shouldClosePopup = classNames.some(className => className === classNameOfClickedElement)

    if (shouldClosePopup) {
        popup.style.display = 'none'
    }
})