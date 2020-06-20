const flipbox1 = document.querySelector('.flip-box1')
const flipbox2 = document.querySelector('.flip-box2')
const enterImageButton = document.querySelector('#enter-img')

let actualRotateOfImages = {
    img0: 0,
    img1: 0,
    img2: 0,
    img3: 0
}

const imgLink = 'https://www.w3schools.com/howto/img_paris.jpg'

window.addEventListener('load', () => setImages(imgLink))

enterImageButton.addEventListener('click', () => changeImages())

function setImages(imgLink) {
    divIsEmpty = flipbox1.firstElementChild === null

    if (divIsEmpty) {
        for (let imagesQuantity = 0; imagesQuantity < 4; imagesQuantity++) {
            let arrowsPositions = [
                'bottom: 5px; right: 5px',
                'bottom: 5px; right: 30px',
                'top: 5px; left: 5px',
                'top: 30px; left: 5px',
            ]

            let arrowsPositionsTransform = [
                '',
                '180deg',
                '270deg',
                '90deg',
            ]

            let arrowsRotateImg = [
                90,
                -90,
                180,
                -180,
            ]

            let divImg = document.createElement('div')
            let img = document.createElement('img')

            divImg.setAttribute('id', `divImg${imagesQuantity}`)
            divImg.style = 'margin: 2px; width: 200px; height: 200px; position: relative;'

            img.setAttribute('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTCKJOrJn3POcSGescvgx-Ydc-QZ4rLX4GMGkauWrP1K50BDO3K&usqp=CAU')
            img.setAttribute('id', `img${imagesQuantity}`)
            img.setAttribute('onerror', `imageError(event)`)
            img.style = `width: 200px; height: 200px;`

            for (let arrowPosition = 0; arrowPosition < 4; arrowPosition++) {
                let imgArrow = document.createElement('img')

                imgArrow.setAttribute('src', 'https://image.flaticon.com/icons/svg/134/134312.svg')

                let arrowStyle = 'position: absolute; height: 20px; display: none; background-color: white; cursor: pointer; z-index: 1;'
                imgArrow.style = `
                ${arrowStyle}
                ${arrowsPositions[arrowPosition]};
                transform: rotate(${arrowsPositionsTransform[arrowPosition]})
                `

                imgArrow.addEventListener('click', event => rotateImg(event, arrowsRotateImg[arrowPosition]))

                divImg.appendChild(imgArrow)
            }

            divImg.addEventListener('mouseover', () => {
                const arrows = document.querySelectorAll(`#divImg${imagesQuantity} img:not(#img${imagesQuantity})`)

                for (const arrow of arrows) {
                    arrow.style.display = 'block'
                }
            })

            divImg.addEventListener('mouseout', () => {
                const arrows = document.querySelectorAll(`#divImg${imagesQuantity} img:not(#img${imagesQuantity})`)

                for (const arrow of arrows) {
                    arrow.style.display = 'none'
                }
            })

            divImg.appendChild(img)

            imagesQuantity <= 1 ? flipbox1.appendChild(divImg) : flipbox2.appendChild(divImg)
        }
    } else {
        const images = document.querySelectorAll('main img')

        for (const image of images) if (image.id != '') image.setAttribute('src', imgLink)
    }
}

function changeImages() {
    const imageLinkInput = document.querySelector('#input-img')

    let newImgLink = imageLinkInput.value
    imageLinkInput.value = ''

    setImages(newImgLink)
}

function imageError(event) {
    event.target.src = imgLink
    if (event.target.id === 'img0') {
        alert('Image Not Found')
    }
}

function rotateImg(event, transform) {
    let imageID = event.path[1].id.replace('divI', 'i')

    const image = document.querySelector(`#${imageID}`)

    actualRotateOfImages[imageID] += transform

    if (actualRotateOfImages[imageID] >= 360) {
        actualRotateOfImages[imageID] -= 360
    }

    image.style.transform = `rotate(${actualRotateOfImages[imageID]}deg)`
}