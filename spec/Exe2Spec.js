describe('Exercício 2 - Headings', () => {

    beforeEach(() => this.$div = document.querySelector('#exercicio'))

    describe('Títulos de primeiro nível', () => {
        beforeEach(() => this.h1 = this.$div.querySelectorAll('h1'))
        it('devem haver 4 títulos de primeiro nível', () => {
            expect(this.h1.length)
            .withContext('Títulos de primeiro nível são os que possuem um único número na frente')
            .toBe(4)
        })
        it('os textos devem estar corretos', () => {
            expect(this.h1[0].innerText.trim()).withContext('Respeite as maiúsculas e minúsculas. Não escreva os números da frente')
            .toBe('Introdução')
            expect(this.h1[1].innerText.trim()).withContext('Respeite as maiúsculas e minúsculas. Não escreva os números da frente')
            .toBe('Objetivos')
            expect(this.h1[2].innerText.trim()).withContext('Respeite as maiúsculas e minúsculas. Não escreva os números da frente')
            .toBe('Revisão da Literatura')
            expect(this.h1[3].innerText.trim()).withContext('Respeite as maiúsculas e minúsculas. Não escreva os números da frente')
            .toBe('Conclusão')
        })
    })
    describe('Títulos de segundo nível', () => {
        beforeEach(() => this.h2 = this.$div.querySelectorAll('h2'))
        it('devem haver 3 títulos de segundo nível', () => {
            expect(this.h2.length)
            .withContext('Títulos de segundo nível são os que possuem dois números na frente')
            .toBe(3)
        })
        it('os textos devem estar corretos', () => {
            expect(this.h2[0].innerText.trim()).withContext('Respeite as maiúsculas e minúsculas. Não escreva os números da frente')
            .toBe('Objetivo Geral')
            expect(this.h2[1].innerText.trim()).withContext('Respeite as maiúsculas e minúsculas. Não escreva os números da frente')
            .toBe('Objetivo Específico')
            expect(this.h2[2].innerText.trim()).withContext('Respeite as maiúsculas e minúsculas. Não escreva os números da frente')
            .toBe('Como fazer as citações no texto')
        })
    })
    describe('Títulos de terceiro nível', () => {
        beforeEach(() => this.h3 = this.$div.querySelectorAll('h3'))
        it('devem haver 4 títulos de terceiro nível', () => {
            expect(this.h3.length)
            .withContext('Títulos de terceiro nível são os que possuem três números na frente')
            .toBe(4)
        })
        it('os textos devem estar corretos', () => {
            expect(this.h3[0].innerText.trim()).withContext('Respeite as maiúsculas e minúsculas. Não escreva os números da frente')
            .toBe('Primeiro Específico')
            expect(this.h3[1].innerText.trim()).withContext('Respeite as maiúsculas e minúsculas. Não escreva os números da frente')
            .toBe('Segundo Específico')
            expect(this.h3[2].innerText.trim()).withContext('Respeite as maiúsculas e minúsculas. Não escreva os números da frente')
            .toBe('Citações diretas')
            expect(this.h3[3].innerText.trim()).withContext('Respeite as maiúsculas e minúsculas. Não escreva os números da frente')
            .toBe('Citações indiretas')
        })
    })
    describe('Títulos de quarto nível', () => {
        beforeEach(() => this.h4 = this.$div.querySelectorAll('h4'))
        it('devem haver 3 títulos de quarto nível', () => {
            expect(this.h4.length)
            .withContext('Títulos de quarto nível são os que possuem quatro números na frente')
            .toBe(3)
        })
        it('os textos devem estar corretos', () => {
            expect(this.h4[0].innerText.trim()).withContext('Respeite as maiúsculas e minúsculas. Não escreva os números da frente')
            .toBe('Citação direta de livro')
            expect(this.h4[1].innerText.trim()).withContext('Respeite as maiúsculas e minúsculas. Não escreva os números da frente')
            .toBe('Citação direta de artigo')
            expect(this.h4[2].innerText.trim()).withContext('Respeite as maiúsculas e minúsculas. Não escreva os números da frente')
            .toBe('Exemplos de citação indireta')
        })
    })
    describe('Títulos de quinto nível', () => {
        beforeEach(() => this.h5 = this.$div.querySelectorAll('h5'))
        it('devem haver 3 títulos de quinto nível', () => {
            expect(this.h5.length)
            .withContext('Títulos de quinto nível são os que não possuem números e estão logo abaixo dos de quarto nível')
            .toBe(3)
        })
        it('os textos devem estar corretos', () => {
            expect(this.h5[0].innerText.trim()).withContext('Respeite as maiúsculas e minúsculas. Não escreva os números da frente')
            .toBe('Imagem 1 - Exemplo de citação direta de livro')
            expect(this.h5[1].innerText.trim()).withContext('Respeite as maiúsculas e minúsculas. Não escreva os números da frente')
            .toBe('Artigos em Inglês')
            expect(this.h5[2].innerText.trim()).withContext('Respeite as maiúsculas e minúsculas. Não escreva os números da frente')
            .toBe('Artigos em Português')
        })
    })
    describe('Títulos de sexto nível', () => {
        beforeEach(() => this.h6 = this.$div.querySelectorAll('h6'))
        it('devem haver 2 títulos de sexto nível', () => {
            expect(this.h6.length)
            .withContext('Títulos de sexto nível são os que não possuem números e estão logo abaixo dos de quinto nível')
            .toBe(2)
        })
        it('os textos devem estar corretos', () => {
            expect(this.h6[0].innerText.trim()).withContext('Respeite as maiúsculas e minúsculas. Não escreva os números da frente')
            .toBe('Imagem 2 - Exemplo de citação direta de artigo em inglês')
            expect(this.h6[1].innerText.trim()).withContext('Respeite as maiúsculas e minúsculas. Não escreva os números da frente')
            .toBe('Imagem 3 - Exemplo de citação direta de artigo em português')
        })
    })
})