describe('Exercício 3 - Listas', () => {

    beforeEach(() => this.$div = document.querySelector('#exercicio'))

    describe('Lista principal', () => {
        beforeEach(() => this.ol = this.$div.querySelector('ol'))
        it('deve ser uma lista ordenada', () => {
            expect(this.ol)
            .withContext('Use a tag mais razoável para delimitar uma lista ordenada')
            .toBeTruthy()
        })
        it('deve possuir 3 LIs filhos com textos corretos', () => {
            let lis = this.ol.querySelectorAll(":scope > li")
            expect(lis.length)
            .withContext('Apenas tags <li> podem ser filhas de listas (ordenadas ou não)')
            .toBe(3)
            
            expect(lis[0].childNodes[0].nodeValue.trim())
            .withContext('Texto deve estar correto, sem o número na frente, respeitando maiúsculas e minúsculas')
            .toBe("Fechar contrato")
            expect(lis[1].childNodes[0].nodeValue.trim())
            .withContext('Texto deve estar correto, sem o número na frente, respeitando maiúsculas e minúsculas')
            .toBe("Análise de sistema")
            expect(lis[2].childNodes[0].nodeValue.trim())
            .withContext('Texto deve estar correto, sem o número na frente, respeitando maiúsculas e minúsculas')
            .toBe("Treinamento dos usuários")
        })
    })
    describe('Lista secundária', () => {
        beforeEach(() => this.ol = this.$div.querySelector('ol li:nth-child(2) > ol'))
        it('deve ser uma lista ordenada e filha do segundo item da lista principal', () => {
            expect(this.ol)
            .withContext('Use a tag mais razoável para delimitar uma lista ordenada e certifique-se que essa lista é filha do segundo item da principal')
            .toBeTruthy()
        })
        it('deve possuir 3 LIs filhos com textos corretos', () => {
            let lis = this.ol.querySelectorAll(":scope > li")
            expect(lis.length)
            .withContext('Apenas tags <li> podem ser filhas de listas (ordenadas ou não)')
            .toBe(3)
            
            expect(lis[0].childNodes[0].nodeValue.trim())
            .withContext('Texto deve estar correto, sem o número na frente, respeitando maiúsculas e minúsculas')
            .toBe("Avaliação da empresa")
            expect(lis[1].childNodes[0].nodeValue.trim())
            .withContext('Texto deve estar correto, sem o número na frente, respeitando maiúsculas e minúsculas')
            .toBe("Programação")
            expect(lis[2].childNodes[0].nodeValue.trim())
            .withContext('Texto deve estar correto, sem o número na frente, respeitando maiúsculas e minúsculas')
            .toBe("Aprovação do projeto")
        })
    })
    describe('Lista terciária', () => {
        beforeEach(() => this.ol = this.$div.querySelector('ol li:nth-child(2) > ol li:nth-child(1) > ol'))
        it('deve ser uma lista ordenada e filha do primeiro item da lista secundária', () => {
            expect(this.ol)
            .withContext('Use a tag mais razoável para delimitar uma lista ordenada e certifique-se que essa lista é filha do primeiro item da lista secundária')
            .toBeTruthy()
        })
        it('deve possuir 2 LIs filhos com textos corretos', () => {
            let lis = this.ol.querySelectorAll(":scope > li")
            expect(lis.length)
            .withContext('Apenas tags <li> podem ser filhas de listas (ordenadas ou não)')
            .toBe(2)
            
            expect(lis[0].childNodes[0].nodeValue.trim())
            .withContext('Texto deve estar correto, sem o número na frente, respeitando maiúsculas e minúsculas')
            .toBe("Entrevista com funcionários")
            expect(lis[1].childNodes[0].nodeValue.trim())
            .withContext('Texto deve estar correto, sem o número na frente, respeitando maiúsculas e minúsculas')
            .toBe("Pesquisa de documentação da empresa")
        })
    })
})