const inputs = document.querySelectorAll('input')
const titleAnimation = document.querySelectorAll('link')[4].sheet
const startButton = document.querySelector('#startAnimation')
const stopButton = document.querySelector('#stopAnimation')
const colorVariationInput = document.querySelector('#colorVariation')
const timeVariationInput = document.querySelector('#timeVariation')
const box = document.querySelector('.box')
let colorVariation = timeVariation = boxColor = dynamicStyles = animationColors = null
let filledValues = {
    redInput: false,
    greenInput: false,
    blueInput: false
}

let styleEl = document.createElement('style')
document.head.appendChild(styleEl)
let style = styleEl.sheet

for (const input of inputs) {
    input.addEventListener('change', e => handleColor(e))
}

startButton.addEventListener('click', createAndStartAnimation)
stopButton.addEventListener('click', stopAnimation)

function handleColor(e) {
    filledValues[`${e.target.id}`] = e.target.value.length == 2 ? [true, `${e.target.value}`] : false

    if (filledValues.redInput[0] & filledValues.greenInput[0] & filledValues.blueInput[0]) {
        box.style.backgroundColor = boxColor = `#${filledValues.redInput[1]}${filledValues.greenInput[1]}${filledValues.blueInput[1]}`
    }
}

function createAndStartAnimation() {
    colorVariation = colorVariationInput.value <= 14 && colorVariationInput.value >= 1 ? colorVariation = `${parseInt(colorVariationInput.value)}` : null
    timeVariation = timeVariationInput.value <= 60 && timeVariationInput.value > 0 ? timeVariation = timeVariationInput.value : null

    if (colorVariation == null || timeVariation == null || boxColor == null) {
        alert('You need to put a starting color, color variation between 1 and 15, and put a time variation greate than 0 to 60')
    } else {
        createAnimation()
    }
}

function createAnimation() {
    if (!Array.isArray(boxColor)) {
        animationColors = [boxColor]
        boxColor = boxColor.replace('#', '').split('')
    } else {
        animationColors = [`#${filledValues.redInput[1]}${filledValues.greenInput[1]}${filledValues.blueInput[1]}`]
    }

    while (animationColors.length <= 10) {
        for (let hexadecimalNumbers = 0; hexadecimalNumbers < 6; hexadecimalNumbers++) {
            if (!boxColor[hexadecimalNumbers].isNaN) {
                boxColor[hexadecimalNumbers] = boxColor[hexadecimalNumbers].replace(/a|b|c|d|e|f/g, function (letter) {
                    switch (letter) {
                        case 'a':
                            return '10'
                        case 'b':
                            return '11'
                        case 'c':
                            return '12'
                        case 'd':
                            return '13'
                        case 'e':
                            return '14'
                        case 'f':
                            return '15'
                        default:
                            return letter
                    }
                })
            }

            boxColor[hexadecimalNumbers] = `${parseInt(boxColor[hexadecimalNumbers]) + parseInt(colorVariation)}`

            if (parseInt(boxColor[hexadecimalNumbers]) > 15) {
                boxColor[hexadecimalNumbers] = `${parseInt(boxColor[hexadecimalNumbers]) - 15}`
            }

            boxColor[hexadecimalNumbers] = boxColor[hexadecimalNumbers].replace(/10|11|12|13|14|15/g, function (number) {
                switch (number) {
                    case '10':
                        return 'a'
                    case '11':
                        return 'b'
                    case '12':
                        return 'c'
                    case '13':
                        return 'd'
                    case '14':
                        return 'e'
                    case '15':
                        return 'f'
                    default:
                        return number
                }
            })
        }
        animationColors[animationColors.length] = `#${boxColor[0] + boxColor[1] + boxColor[2] + boxColor[3] + boxColor[4] + boxColor[5]}`
    }

    let boxAnimation = `.box, button, footer{
        animation-name: colorCycleAnimation;
        animation-duration: ${timeVariation}s;
        animation-delay: 0s;
        animation-iteration-count: infinite;
    }`

    let titleAnimation = `header, h2 {
        animation-name: colorCycleAnimationsynchrony;
        animation-duration: ${timeVariation}s;
        animation-delay: 0s;
        animation-iteration-count: infinite;
    }`

    let colorCycleAnimation = `@keyframes colorCycleAnimation {
        0% {
            background-color: ${animationColors[0]};
        }
        10% {
            background-color: ${animationColors[1]};
        }
        20% {
            background-color: ${animationColors[2]};
        }
        30% {
            background-color: ${animationColors[3]};
        }
        40% {
            background-color: ${animationColors[4]};
        }
        50% {
            background-color: ${animationColors[5]};
        }
        60% {
            background-color: ${animationColors[6]};
        }
        70% {
            background-color: ${animationColors[7]};
        }
        80% {
            background-color: ${animationColors[8]};
        }
        90% {
            background-color: ${animationColors[9]};
        }
        100% {
            background-color: ${animationColors[10]};
        }
    }`

    let colorCycleAnimationsynchrony = `@keyframes colorCycleAnimationsynchrony {
        0% {
            color: ${animationColors[0]};
        }
        10% {
            color: ${animationColors[1]};
        }
        20% {
            color: ${animationColors[2]};
        }
        30% {
            color: ${animationColors[3]};
        }
        40% {
            color: ${animationColors[4]};
        }
        50% {
            color: ${animationColors[5]};
        }
        60% {
            color: ${animationColors[6]};
        }
        70% {
            color: ${animationColors[7]};
        }
        80% {
            color: ${animationColors[8]};
        }
        90% {
            color: ${animationColors[9]};
        }
        100% {
            color: ${animationColors[10]};
        }
    }`

    style.insertRule(boxAnimation, style.rules.length)
    style.insertRule(titleAnimation, style.rules.length)
    style.insertRule(colorCycleAnimation, style.rules.length)
    style.insertRule(colorCycleAnimationsynchrony, style.rules.length)

    startButton.disabled = true
    startButton.style.cursor = 'initial'

    for (const input of inputs) {
        input.disabled = true
    }

    style.disabled = false
    titleAnimation.disabled = true
}

function stopAnimation() {
    style.disabled = true
    titleAnimation.disabled = false

    startButton.disabled = false
    startButton.style.cursor = 'pointer'

    for (const input of inputs) {
        input.disabled = false
    }
}