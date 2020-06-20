const container = document.querySelector('div#container')

const createCircles = () => {
    for (let c = 1; c <= 7; c++) {
        const div = document.createElement('div')
        div.setAttribute('id', `circle${c}`)
        div.style.background = colorChange()
        container.appendChild(div)
    }
}

const options = ['color', 'intensity', 'width', 'height']

const handleCircle = (id, option, optionChange) => {
    let circle = document.getElementById(`${id}`)
    switch (optionChange) {
        case 'color':
            circle.style.background = option
            break
        case 'intensity':
            circle.style.filter = `brightness(${option}%)`
            break
        case 'width':
            circle.style.width = `${option}px`
            break
        case 'height':
            circle.style.height = `${option}px`
            break
    }
}

const circleRows = (value) => {
    let circle = []
    for (c = 1; c <= 7; c++) {
        circle[c - 1] = document.getElementById(`circle${c}`)
    }
    container.style.display = 'inline-grid'
    switch (value) {
        case '1':
            container.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr 1fr 1fr'
            container.style.gridTemplateRows = '1fr'
            for (c = 0; c <= 6; c++)
                circle[c].style.gridRow = '1'
            break
        case '2':
            container.style.gridTemplateColumns = '1fr 1fr 1fr 1fr'
            container.style.gridTemplateRows = '1fr 1fr'
            for (c = 0; c <= 3; c++)
                circle[c].style.gridRow = '1'
            for (c = 4; c <= 6; c++)
                circle[c].style.gridRow = '2'
            break
        case '3':
            container.style.gridTemplateColumns = '1fr 1fr 1fr'
            container.style.gridTemplateRows = '1fr 1fr 1fr'
            for (c = 0; c <= 2; c++)
                circle[c].style.gridRow = '1'
            for (c = 3; c <= 4; c++)
                circle[c].style.gridRow = '2'
            for (c = 5; c <= 6; c++)
                circle[c].style.gridRow = '3'
            break
        case '4':
            container.style.gridTemplateColumns = '1fr 1fr'
            container.style.gridTemplateRows = '1fr 1fr 1fr 1fr'
            for (c = 0; c <= 1; c++)
                circle[c].style.gridRow = '1'
            for (c = 2; c <= 3; c++)
                circle[c].style.gridRow = '2'
            for (c = 4; c <= 5; c++)
                circle[c].style.gridRow = '3'
            circle[6].style.gridRow = '4'
            break
        case '5':
            container.style.gridTemplateColumns = '1fr 1fr'
            container.style.gridTemplateRows = '1fr 1fr 1fr 1fr 1fr'
            for (c = 0; c <= 1; c++)
                circle[c].style.gridRow = '1'
            for (c = 2; c <= 3; c++)
                circle[c].style.gridRow = '2'
            for (c = 3; c <= 5; c++)
                circle[c + 1].style.gridRow = `${c}`
            break
        case '6':
            container.style.gridTemplateColumns = '1fr 1fr'
            container.style.gridTemplateRows = '1fr 1fr 1fr 1fr 1fr 1fr'
            for (c = 0; c <= 1; c++)
                circle[c].style.gridRow = '1'
            for (c = 2; c <= 6; c++)
                circle[c].style.gridRow = `${c}`
            break
        case '7':
            container.style.gridTemplateColumns = '1fr'
            container.style.gridTemplateRows = '1fr 1fr 1fr 1fr 1fr 1fr 1fr'
            for (c = 0; c <= 6; c++)
                circle[c].style.gridRow = `${c + 1}`
            break
    }
}

function colorChange() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color
}