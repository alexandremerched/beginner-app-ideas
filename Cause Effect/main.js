const peopleList = [
    {
        name: 'Alexandre',
        street: 'R. Carneiro Leão',
        city: 'Rio Branco',
        state: 'AC',
        country: 'Brasil',
        telephone: '+55 (68)99226-7088',
        birthday: '23/8/2002'
    }
]

function createAndRenderList() {
    addToPeopleList(4)
    renderDetails()
}

function addToPeopleList(amountPeople) {
    for (let personIndex = 1; personIndex <= amountPeople; personIndex++) {
        let person = createPeople(personIndex)
        peopleList[personIndex] = person
    }
}

function createPeople(index) {
    let person = {}
    let dados = {
        //That's just my peculiarity
        country: Math.floor(Math.random() * 200) + 50,
        ddd: Math.floor(Math.random() * 70) + 20,
        number1: Math.floor(Math.random() * 99999),
        number2: Math.floor(Math.random() * 9999),
        day: Math.floor(Math.random() * 30) + 1,
        month: Math.floor(Math.random() * 12) + 1,
        year: Math.floor(Math.random() * 25) + 1980,
    }

    person['name'] = `Pessoa ${index}`
    person['street'] = `Rua ${index}`
    person['city'] = `Cidade ${index}`
    person['state'] = `Estado ${index}`
    person['country'] = `País ${index}`
    person['telephone'] = `+${dados.country} (${dados.ddd})${dados.number1}-${dados.number2}`
    person['birthday'] = `${dados.day}/${dados.month}/${dados.year}`

    return person
}

function renderDetails() {
    const ulNames = document.getElementById('listNames')

    for (let personIndex = 0; personIndex < peopleList.length; personIndex++) {
        let li = document.createElement('li')
        let input = document.createElement('input')

        input.setAttribute('style', 'text-align: center;')
        input.setAttribute('type', 'button')
        input.setAttribute('onclick', `updatePane(${personIndex});showOptionsAndResetStyleBorder()`)
        input.setAttribute('onmouseover', `highlightName(${personIndex}, true)`)
        input.setAttribute('onmouseout', `highlightName(${personIndex}, false)`)
        input.value = peopleList[personIndex].name

        li.appendChild(input)
        ulNames.appendChild(li)
    }
}

function updatePane(personIndex) {
    let name = document.getElementById('fullname')
    let address = document.getElementById('address')
    let tel = document.getElementById('telNumber')
    let birthday = document.getElementById('birthday')

    name.name = personIndex

    name.value = peopleList[personIndex].name
    address.value = `${peopleList[personIndex].street}, ${peopleList[personIndex].city} - ${peopleList[personIndex].state}`
    tel.value = peopleList[personIndex].telephone
    birthday.value = peopleList[personIndex].birthday
}