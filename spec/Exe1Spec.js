describe('Exercício 1 - Tags HTML5', () => {

    beforeEach(() => this.$div = document.querySelector('#exercicio'))

    describe('Título', () => {
        beforeEach(() => this.h1 = this.$div.querySelector('h1'))
        it('deve utilizar a tag correta',() => {
            expect(this.h1)
            .withContext('Utilize a tag correta para título de texto principais')
            .toBeTruthy()
        })
        it('texto deve estar escrito corretamente', () => {
            expect(this.h1.innerText.trim())
            .withContext('Escreva exatamente o que está descrito no enunciado')
            .toBe('Meu Primeiro HTML')
        })
    })
    describe('Texto', () => {
        beforeEach(() => this.p = this.$div.querySelector('p'))
        it('deve utilizar a tag correta',() => {
            expect(this.p)
            .withContext('Utilize a tag correta para textos comuns/parágrafos')
            .toBeTruthy()
        })
        it('texto deve estar escrito corretamente', () => {
            expect(this.p.innerText.trim())
            .withContext('Escreva exatamente o que está descrito no enunciado')
            .toBe('Desde 1999, o desenvolvimento da linguagem HTML (HyperText Markup Language) ficou estacionado na versão 4. De lá pra cá, a W3C esteve focada em linguagens como XML (Extensible Markup Language) e SVG (Scalable Vector Graphics).')
        })
        it('deve conter um texto em negrito', () => {
            let bold = this.p.querySelector('strong')
            expect(bold)
            .withContext('Use uma tag que deixe negrito, mas que não seja a <b>')
            .toBeTruthy()
            expect(bold.innerText.trim())
            .withContext('Escreva exatamente como no enunciado (maiúsculas, minúsculas e pontuação)')
            .toBe('Extensible Markup Language')
        })
        it('deve conter um texto em itálico', () => {
            let em = this.p.querySelector('em')
            expect(em)
            .withContext('Use uma tag que deixe itálico, mas que não seja a <i>')
            .toBeTruthy()
            expect(em.innerText.trim())
            .withContext('Escreva exatamente como no enunciado (maiúsculas, minúsculas e pontuação)')
            .toBe('HyperText Markup Language')
        })
        it('deve conter um texto sublinhado', () => {
            let ins = this.p.querySelector('ins')
            expect(ins)
            .withContext('Use uma tag que deixe sublinhado, mas que não seja a <u>')
            .toBeTruthy()
            expect(ins.innerText.trim())
            .withContext('Escreva exatamente como no enunciado (maiúsculas, minúsculas e pontuação)')
            .toBe('Scalable Vector Graphics')
        })
    })
    describe('Imagem', () => {
        beforeEach(() => this.img = this.$div.querySelector('img'))
        it('deve utilizar a tag correta',() => {
            expect(this.img)
            .withContext('Utilize a tag correta para imagens no corpo do documento')
            .toBeTruthy()
        })
        it('Endereço deve estar correto', () => {
            expect(this.img.src)
            .withContext('O endereço para a imagem deve ser igual ao do enunciado')
            .toBe('https://www.w3.org/html/logo/img/html5-topper.png')
        })
        it('Texo alternativo deve estar correto', () => {
            expect(this.img.alt)
            .withContext('Texto alternativo deve estar igual ao enunciado')
            .toBe('HTML5 Logo')
        })
    })
    describe('Link', () => {
        beforeEach(() => this.anchor = this.$div.querySelector('a'))
        it('deve utilizar a tag correta',() => {
            expect(this.anchor)
            .withContext('Utilize a tag correta para hyperlinks no corpo do documento')
            .toBeTruthy()
        })
        it('Endereço deve estar correto', () => {
            expect(this.anchor.href)
            .withContext('O endereço do link deve ser igual ao do enunciado')
            .toBe('https://www.w3.org/html/')
        })
        it('Texo do link deve estar correto', () => {
            expect(this.anchor.innerText.trim())
            .withContext('Texto deve estar igual ao enunciado')
            .toBe('Saiba mais sobre o HTML5')
        })
    })
    describe('Citação', () => {
        beforeEach(() => this.quote = this.$div.querySelector('blockquote'))
        it('deve utilizar a tag correta',() => {
            expect(this.quote)
            .withContext('Utilize a tag correta para fazer citações em documentos HTML')
            .toBeTruthy()
        })
        it('Texto deve estar correto', () => {
            expect(this.quote.innerText.trim())
            .withContext('Escreva exatamente como no enunciado (maiúsculas, minúsculas e pontuação)')
            .toBe('Aprender HTML5 é o início da sua jornada na web Professor de TecWeb')
        })
        it('Citação deve conter autor', () => {
            let cite = this.quote.querySelector('cite')
            expect(cite)
            .withContext('Utilize a tag mais adequada para marcar o autor original da citação')
            .toBeTruthy()
            expect(cite.innerText.trim())
            .withContext('Texto do autor deve estar igual ao enunciado')
            .toBe('Professor de TecWeb')
        })
    })
})