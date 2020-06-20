const input = document.querySelector('input#input')
const label = document.querySelector('div#label')
const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '*', '/', '=', 'Backspace', '.']
let lastOperation = ''
let calculo = ''
let negative = false
let resetAll = false
let decimalNum = 0

document.body.addEventListener('keydown', function (e) {
    const isKeyboardCalculator = keys.some((keys) => e.key == keys)
    if (isKeyboardCalculator)
        calculator(e.key)
})

function calculator(param) {
    if (resetAll) {
        isNaN(param) ? ClearAll() : ClearAll(param)
        return
    }

    if (isNaN(param)) {
        switch (param) {
            case '=':
                let num = input.value
                input.value = eval(`${calculo} ${lastOperation} ${num}`)
                label.innerHTML += `${num} =`
                resetAll = true
                break
            case 'AC':
                ClearAll()
                break
            case 'C':
                input.value = 0
                decimalNum = 0
                break
            case 'Backspace':
                if (input.value.length > 2) {
                    input.value = input.value.slice(0, -1)
                } else {
                    input.value = 0
                    if (negative)
                        negative = false
                }
                if (decimalNum != 0)
                    decimalNum == 4 ? decimalNum -= 2 : decimalNum--
                break
            case 'negative':
                if (input.value != 0) {
                    input.value.indexOf('-') == -1 ? input.value = input.value.replace(/^/, '-') : input.value = input.value.replace('-', '')
                    negative = !negative
                }
                break
            case '.':
                if (input.value.indexOf('.') == -1) {
                    input.value += '.'
                }
                break
            default:
                if (input.value != '') {
                    calculo == '' ? calculo = input.value : calculo = eval(`${calculo} ${lastOperation} ${input.value}`)
                    label.innerHTML += `${input.value} ${param} `
                    input.value = '0'
                    lastOperation = param
                    negative = false
                    decimalNum = 0
                }
                break
        }
    } else {
        if (input.value.indexOf('.') != -1 && decimalNum <= 3)
            decimalNum++
        if (decimalNum < 4 && !(input.value.replace('.', '').length > (7 + decimalNum))) {
            if (input.value == 0)
                input.value = ''

            input.value += param

            if (negative && input.value.indexOf('-') == -1)
                input.value = input.value.replace(/^/, '-')
        }
    }
}

function ClearAll(num = 0) {
    input.value = num
    decimalNum = 0
    label.innerHTML = ''
    lastOperation = ''
    calculo = ''
    negative = false
    resetAll = false
}