const loginButton = document.querySelector('#loginButton')
const cancelButton = document.querySelector('#cancelButton')
const inputID = document.querySelector('#userID')
const inputPassword = document.querySelector('#userPassword')

const backgroundPattern = 'var(--background-pattern)'
const backgroundEmptyText = 'var(--background-empty-text)'
const backgroundUserInvalid = 'var(--background-user-invalid)'
const borderPattern = 'var(--border-pattern)'
const borderEmptyText = 'var(--border-empty-text)'
const borderUserInvalid = 'var(--border-user-invalid)'

loginButton.addEventListener('click', () => validateUserAndSetColor())
cancelButton.addEventListener('click', clearInputs)

inputID.addEventListener('change', () => validateUserAndSetColor('inputId'))
inputPassword.addEventListener('change', () => validateUserAndSetColor('inputPassword'))

function validateUserAndSetColor(inputType = 'button') {
    let user = {
        id: inputID.value.replace(' ', ''),
        password: inputPassword.value.replace(' ', '')
    }

    let colorOfValidationAndInput = validateUserAndReturnColor()

    let { colorStyleId, colorStylePassword } = colorOfValidationAndInput

    setColorStyle(colorStyleId, colorStylePassword)

    function validateUserAndReturnColor() {
        let colorStyle = []

        for (let data in user) {
            if (user.hasOwnProperty(data)) {

                if (user[data] == '') {
                    if (inputType == 'button') {
                        colorStyle.push(backgroundEmptyText)
                        console.log('--> Dado está vazio, type: button, ', colorStyle)
                        continue
                    } else {
                        colorStyle.push(borderEmptyText)
                        console.log('--> Dado está vazio, type: input, ', colorStyle)
                        continue
                    }
                }

                if (user[data] != 'testuser' && user[data] != 'mypassword') {
                    if (inputType == 'button') {
                        colorStyle.push(backgroundUserInvalid)
                        console.log('--> Dado está inválido, type: button, ', colorStyle)
                        continue
                    } else {
                        colorStyle.push(borderUserInvalid)
                        console.log('--> Dado está inválido, type: input, ', colorStyle)
                        continue
                    }
                }

                inputType == 'button' ? colorStyle.push(backgroundPattern) : colorStyle.push(borderPattern)
            }
        }

        console.log('Retornando, ', colorStyle)

        return {
            colorStyleId: colorStyle[0],
            colorStylePassword: colorStyle[1]
        }
    }

    function setColorStyle(colorId, colorPassword) {
        if (inputType == 'button') {
            inputID.style.border = inputPassword.style.border = borderPattern

            inputID.style.backgroundColor = `${colorId}`
            inputPassword.style.backgroundColor = `${colorPassword}`
        } else {
            if (inputType == 'inputId') {
                inputID.style.backgroundColor = backgroundPattern
                inputID.style.border = `${colorId}`
            }
                
            if (inputType == 'inputPassword') {
                inputPassword.style.backgroundColor = backgroundPattern
                inputPassword.style.border = `${colorPassword}`
            }
        }
    }
}

function clearInputs() {
    inputID.value = inputPassword.value = ''
    inputID.style.backgroundColor = inputPassword.style.backgroundColor = backgroundPattern
    inputID.style.borderColor = inputPassword.style.borderColor = borderPattern
}