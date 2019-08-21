describe('Exercício 1', () => {

    beforeAll((done) => preparar(done))

    beforeEach((done) => carregar('exe1.html', done))

    it('Testar', () => {
        if(document.querySelectorAll('h1.titulo').length > 0){
            expect(true).toBe(true)
        } else {
            fail('não encontrado')
        }
    })
})