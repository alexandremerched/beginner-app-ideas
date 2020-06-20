const button = document.querySelector('input#start')
const speed = document.querySelector('input#speed')
let infineloop = false
let againStart = false

const buttonChange = async () => {
    button.value == 'Start' ? button.value = 'Stop' : button.value = 'Start'
    if (button.value == 'Stop') {
        for (let c = 0; c <= 6; c++) {
            looping(c)
        }
    } else {
        againStart = true
    }
}

const looping = async (pos) => {
    let intensity = [
        getIntensity('circle1'),
        getIntensity('circle2'),
        getIntensity('circle3'),
        getIntensity('circle4'),
        getIntensity('circle5'),
        getIntensity('circle6'),
        getIntensity('circle7'),
    ]
    while (button.value == 'Stop') {
        while (intensity[pos] >= 40) {
            if (button.value == 'Start')
                break
            intensity[pos]--
            const lights = document.getElementById(`circle${pos + 1}`)
            lights.style.filter = `brightness(${intensity[pos]}%)`
            await sleep(speed.value)
        }
        while (intensity[pos] <= 100) {
            if (button.value == 'Start')
                break
            intensity[pos]++
            const lights = document.getElementById(`circle${pos + 1}`)
            lights.style.filter = `brightness(${intensity[pos]}%)`
            await sleep(speed.value)
        }
    }
}

const getIntensity = (id) => {
    let key = Math.floor(Math.random() * 6) + 1
    let circle = document.getElementById(`${id}`)
    if (againStart == false) {
        switch (key) {
            case 1:
                circle.style.filter = `brightness(${Math.floor(Math.random() * 17)}%)`
                break
            case 2:
                circle.style.filter = `brightness(${Math.floor(Math.random() * 34) + 17}%)`
                break
            case 3:
                circle.style.filter = `brightness(${Math.floor(Math.random() * 51) + 34}%)`
                break
            case 4:
                circle.style.filter = `brightness(${Math.floor(Math.random() * 68) + 51}%)`
                break
            case 5:
                circle.style.filter = `brightness(${Math.floor(Math.random() * 85) + 68}%)`
                break
            case 6:
                circle.style.filter = `brightness(${Math.floor(Math.random() * 100) + 85}%)`
                break
        }
    }
    return circle.style.filter.replace('brightness', '').replace('(', '').replace('%)', '')
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}