settings = document.getElementById('settings')

const createSettings = () => {
    options = document.createElement('div')
    let labelInput = document.createElement('label')
    let rowsInput = document.createElement('input')
    let br = document.createElement('br')

    options.setAttribute('name', 'options')
    options.setAttribute('class', 'options')
    rowsInput.setAttribute('type', 'number')
    rowsInput.setAttribute('id', 'rowsInput')
    rowsInput.setAttribute('placeholder', 'max: 7')
    rowsInput.setAttribute('onkeyup', 'circleRows(this.value)')

    labelInput.setAttribute('for', 'rowsInput')
    labelInput.textContent = 'How many rows:'

    for (let c = 1; c <= 7; c++) {
        let label = document.createElement('label')
        let br = document.createElement('br')
        let inputs = [
            document.createElement('input'),
            document.createElement('input'),
            document.createElement('input'),
            document.createElement('input')
        ] 
        let types = [
            'color',
            'intensity',
            'width',
            'height'
        ]

        label.setAttribute('for', `color ${c}`)
        label.textContent = `Circle ${c}:`

        options.appendChild(br)
        options.appendChild(label)

        inputs[0].setAttribute('id', `color${c}`)

        for (pos = 0; pos < 4; pos++) {
            if (pos < 3)
                inputs[pos+1].setAttribute('type', 'number')
            inputs[pos].setAttribute('placeholder', `${types[pos]}`)
            inputs[pos].setAttribute('onkeyup', `handleCircle('circle${c}', this.value, '${types[pos]}')`)
            inputs[pos].setAttribute('style', 'margin: 3px;')
            options.appendChild(inputs[pos])
        }

        settings.appendChild(options)
        options.style.display = 'none'
    }

    options.appendChild(br)
    options.appendChild(labelInput)
    options.appendChild(rowsInput)
}

const showSettings = () => {
    options.style.display == 'block' ? options.style.display = 'none' : options.style.display = 'block'
}