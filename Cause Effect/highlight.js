const name = document.getElementById('fullname')
const options = document.getElementById('highlightOptions')
const optionsValue = document.getElementsByName('optionsHighlight')

const styleBorder = {
    size: '2',
    type: 'solid',
    color: 'teal'
}

function highlightName(personIndex, turn = true) {
    if (name.name == personIndex) {
        if (turn) {
            name.style.borderWidth = `${styleBorder.size}px`
            name.style.borderColor = styleBorder.color
        } else if (!turn) {
            name.style.border = '1px solid black'
        }
    }
}

function showOptionsAndResetStyleBorder() {
    options.style.display = 'flex'
    styleBorder.size = '2px'
    styleBorder.color = 'teal'
}

function closeOptionsAndResetAll() {
    closeOptionsAndResetBorderName()
    clearOptionsValue()

    function closeOptionsAndResetBorderName() {
        options.style.display = 'none'
        name.style.border = '1px solid black'
    }

    function clearOptionsValue() {
        for (let indexValueOption = 0; indexValueOption < 2; indexValueOption++) {
            optionsValue[indexValueOption].value = ''
        }
    }
}

function setBorderStyleHighlight(event, value) {
    switch (value) {
        case 'size':
            name.style.borderWidth = `${event.target.value}px`
            styleBorder.size = event.target.value
            break;
        case 'color':
            name.style.borderColor = event.target.value
            styleBorder.color = event.target.value
            break;
    }
}