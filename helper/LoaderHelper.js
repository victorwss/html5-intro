const preparar = (done) => {
    let $div = document.createElement('div')
    $div.id = 'fixtures'
    document.querySelector('body').appendChild($div)
    done()
}

const carregar = (fixture, done) => {

    fetch('src/'+fixture)
        .then((response) => response.text())
        .then((html) => {
            document.querySelector('div#fixtures').innerHTML = html
            done()
        })
}

const limpar = () => document.querySelector('div#fixtures').innerHTML = ''

