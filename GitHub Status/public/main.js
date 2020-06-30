import getData from './api.js'

const button = document.querySelector('button')

button.addEventListener('click', () => {
    updateStatus()
})

async function updateStatus() {
    let backgroundColorError = 'rgba(255, 101, 101, 0.2)'
    let backgroundColorSuccessfully = 'rgba(101, 255, 111, 0.2)'

    await getData().then(data => {
        let result = data.components

        for (let i = 0; i < result.length - 1; i++) {
            if (i === 3) continue
            if (i < 3) {
                let p = document.querySelectorAll('.status-operation')[i]

                if (result[i].status !== "operational") {
                    p.style.backgroundColor = backgroundColorError
                }
                else {
                    p.style.backgroundColor = backgroundColorSuccessfully
                }

                p.innerHTML = result[i].status
            }
            else {
                let p = document.querySelectorAll('.status-operation')[i - 1]

                if (result[i].status !== "operational") {
                    p.style.backgroundColor = backgroundColorError
                }
                else {
                    p.style.backgroundColor = backgroundColorSuccessfully
                }

                p.innerHTML = result[i].status
            }
        }
    })
}

