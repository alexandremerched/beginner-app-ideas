let value = 23600/2

function funcao(value) {
    let daysOfLoss = [3, 6, 9, 11, 12, 14, 15, 19, 22, 25, 28, 30, 31, 33, 34, 38]

    for (let count = 1; count <= 20; ++count) {
        if (daysOfLoss.indexOf(count) === -1) {
            value += 2000
        } else {
            value -= 1300
        }

        console.log(value)
    }
}

funcao(value)