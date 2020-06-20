const main = document.querySelector('main')
const button = document.querySelector('#setCountdownButton')
const eventNameInput = document.querySelector('#eventName')
const eventDateInput = document.querySelector('#eventDate')
const eventTimeInput = document.querySelector('#eventTime')
let countdownID = 0

button.addEventListener('click', countdownEvent)

function countdownEvent() {
    const timeToSetEvent = validateEvent()

    if (!timeToSetEvent) return

    createCountdownDisplay()
    eventTime(timeToSetEvent)
}

function validateEvent() {
    let eventName = eventNameInput.value.trim()
    let eventDate = eventDateInput.value
    let eventTime = eventTimeInput.value
    let dateNow = moment().format('DD/MM/YYYY')
    let eventDateValidation = eventDate != '' ? moment(`${eventDate}`, ['DD/MM/YYYY', 'D/M/YYYY', 'DD/MM'], true).format() : eventDate = dateNow
    let eventTimeValidation = eventTime != '' ? moment(`${eventTime}`, ['H:m:s'], true).format() : eventTime = '00:00:00'

    let futureDate = moment(`${eventDate} ${eventTime}`, ['DD/MM/YYYY HH:mm:ss']).isSameOrAfter(moment().format())

    if (eventName.length > 147) {
        showPopup('O nome do evento é muito grande')
        return false
    }

    if (!eventName) {
        showPopup('O nome não pode ser vazio!')
        return false
    }

    if (eventDateValidation == 'Invalid date') {
        showPopup('Data incorreta!')
        return false
    }

    if (eventTimeValidation == 'Invalid date') {
        showPopup('Horário incorreto!')
        return false
    }

    if (!futureDate) {
        showPopup('Ainda não podemos voltar no tempo')
        return false
    }

    return [eventName, eventDate, eventTime]
}

function createCountdownDisplay() {
    let divCounterDisplay = document.createElement('div')
    let divCloseEvent = document.createElement('div')
    let pName = document.createElement('p')
    let pCounter  = document.createElement('p')

    divCounterDisplay.setAttribute('class', 'counter-display')
    divCloseEvent.setAttribute('class', 'close-event')
    pName.setAttribute('class', 'name')
    pCounter.setAttribute('class', 'counter-number')

    divCounterDisplay.setAttribute('id', `counterDisplay-${countdownID}`)
    divCloseEvent.setAttribute('id', `closeEvent-${countdownID}`)
    pName.setAttribute('id', `eventName-${countdownID}`)
    pCounter.setAttribute('id', `counterNumber-${countdownID}`)

    divCloseEvent.innerHTML = 'cancel'
    pCounter.innerHTML = '00:00:00'

    divCounterDisplay.append(divCloseEvent, pName, pCounter)
    main.appendChild(divCounterDisplay)
}

function eventTime(time) {
    const id = countdownID
    countdownID += 1

    let timeToSet = moment(`${time[1]} ${time[2]}`, 'DD/MM/YYYY HH:mm:ss')
    let timeNow = moment()

    let duration = moment.duration(timeToSet.diff(timeNow))

    const counterDisplay = document.querySelector(`#counterDisplay-${id}`)
    const counter = document.querySelector(`#counterNumber-${id}`)
    const eventName = document.querySelector(`#eventName-${id}`)
    const closeEvent = document.querySelector(`#closeEvent-${id}`)

    closeEvent.style.display = 'block'

    closeEvent.addEventListener('click', function () {
        endCounter()
    })

    eventName.innerHTML = time[0]

    const timer = setInterval(function () {
        duration = moment.duration(duration.asSeconds() - 1, 'seconds')
        let year = duration.years()
        let month = duration.months()
        let day = duration.days()
        let hour = duration.hours()
        let min = duration.minutes()
        let sec = duration.seconds()

        if (hour < 10 && min.length != 2) hour = '0' + hour
        if (min < 10 && min.length != 2) min = '0' + min
        if (sec < 10 && sec.length != 2) sec = '0' + sec

        if (year > 0) {
            counter.innerHTML = `${year}a ${month}m ${day}d ${hour}:${min}:${sec}`
        } else if (month > 0) {
            counter.innerHTML = `${month}m ${day}d ${hour}:${min}:${sec}`
        } else if (day > 0) {
            counter.innerHTML = `${day}d ${hour}:${min}:${sec}`
        } else {
            counter.innerHTML = `${hour}:${min}:${sec}`
        }

        if (year == 0 && month == 0 && day == 0 && hour == 0 && min == 0 && sec == 0) {
            endCounter()
        }
    }, 1000)

    function endCounter() {
        clearInterval(timer)
        counterDisplay.parentNode.removeChild(counterDisplay)
    }
}