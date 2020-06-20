const Bin2Dec = () => {
    bin = document.querySelector('input#bin')
    dec = document.querySelector('input#dec')
    bin.value.length != 8 || /^-{0,1}\d+$/g.test(bin.value) == 0
        ? alert('Digite apenas 0 e 1 com exatamente 8 dígitos.')
        : num = parseInt(bin.value, 2), dec.value = num
}