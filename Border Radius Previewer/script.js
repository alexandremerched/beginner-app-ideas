const section = document.querySelector('section')
const box = document.querySelector('div#box')
const buttons = document.querySelector('p#advanced')
const avancado = document.querySelector('input#avancado')
const resultado = document.querySelector('input#resultado')
const oclt = document.querySelector('input#ocultar')
const copy = document.querySelector('input#copy')
const item = document.createElement('textarea')
let border_radius = '10px 10px 10px 10px'
box.style.backgroundColor = 'rgb(2, 100, 156)'

function radius() {
    let value = {
        tRigth: document.querySelector('input#tr').value,
        tLeft: document.querySelector('input#tl').value,
        bRigth: document.querySelector('input#br').value,
        bLeft: document.querySelector('input#bl').value,
        tRigth2: document.querySelector('input#trr').value,
        tLeft2: document.querySelector('input#tll').value,
        bRigth2: document.querySelector('input#brr').value,
        bLeft2: document.querySelector('input#bll').value
    }

    for (pos in value) {
        if (value[pos] == '')
            value[pos] = 0
    }

    avancado.value == 'Normal'
        ? border_radius = `${value.tRigth}px ${value.tLeft}px ${value.bRigth}px ${value.bLeft}px / ${value.tRigth2}px ${value.tLeft2}px ${value.bRigth2}px ${value.bLeft2}px`
        : border_radius = `${value.tRigth}px ${value.tLeft}px ${value.bRigth}px ${value.bLeft}px`

    box.style.borderRadius = border_radius
}

function res() {
    oclt.style.display = 'inline'
    copy.style.display = 'inline'
    resultado.value = 'Atualizar'

    item.style.display = 'block'
    item.style.width = '485px'
    item.style.height = '100px'
    item.style.resize = 'none'
    item.value = `background-color: ${box.style.backgroundColor};\n\nborder-radius: ${border_radius};`

    section.appendChild(item)
}

function ocultar() {
    item.style.display = 'none'
    oclt.style.display = 'none'
    copy.style.display = 'none'
    resultado.value = 'Resultado'
}

function copiar() {
    item.select()
    document.execCommand('copy')
}

function show() {
    if (avancado.value == 'Avançado') {
        buttons.style.display = 'block'
        avancado.value = 'Normal'
    } else {
        buttons.style.display = 'none'
        avancado.value = 'Avançado'
    }
}

function colorChange() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    box.style.backgroundColor = color
}