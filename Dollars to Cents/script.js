const button = document.querySelector('#buttonConvert')

button.addEventListener('click', dollarToCents)

function dollarToCents() {
    const dollarInput = document.querySelector('#dollarInput')
    const centsInput = document.querySelector('#centsInput')
    const centsTextarea = document.querySelector('#centsTextarea')

    let dollarValue = dollarInput.value
    let dollarValueIsNaN = isNaN(dollarValue)

    if (!dollarValueIsNaN) {
        centsValue = Math.round(dollarValue * 100)
        centsValueInFull = centsInFull(centsValue)

        centsInput.value = centsValue
        centsTextarea.value = centsValueInFull
    } else {
        alert('Enter a valid number')
    }

    function centsInFull(value) {
        let coinsNameValue = [0, 0, 0, 0]
        let coinsValue = [25, 10, 5, 1]

        for (let coinsIndex = 0; coinsIndex < coinsValue.length; coinsIndex++) {
            while (value > coinsValue[coinsIndex]) {
                value -= coinsValue[coinsIndex]
                coinsNameValue[coinsIndex] += 1
            }
        }

        return `${coinsNameValue[0]} quarters, ${coinsNameValue[1]} dimes, ${coinsNameValue[2]} nickel and ${coinsNameValue[3]} pennies`
    }
}