const buttonLoadDB = document.querySelector('#loadDB')
const buttonQueryDB = document.querySelector('#queryDB')
const buttonClearDB = document.querySelector('#clearDB')

const logText = document.querySelector('#logText')
const queryText = document.querySelector('#queryText')

buttonLoadDB.addEventListener('click', () => loadDB())
buttonQueryDB.addEventListener('click', () => queryDB())
buttonClearDB.addEventListener('click', () => clearDB())

function showInLog(text) {
    logText.innerHTML += `- ${text} \n`
    logText.scrollTop = logText.scrollHeight
}

function showInQuery(email, name, userid) {
    queryText.innerHTML += `${userid} - ${name}, ${email} \n`
    queryText.scrollTop = logText.scrollHeight
}