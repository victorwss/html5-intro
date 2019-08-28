# Exercício - Introdução ao HTML5

Esse é um exercício de correção automática sobre o conteúdo da aula de Introdução ao HTML5 de Tecnologias Web da Faculdade Impacta de Tecnologia.

## Como fazer

Você deve mexer apenas nos arquivos HTML dentro da pasta **src**. Nâo mexa nos outros arquivos, pois isso pode comprometer os testes. 

Cada arquivo HTML dentro da pasta **src** possui um enunciado do que é esperado dentro dele. Escreva o código HTML e rode os testes para ver se acertou.

Não há necessidade de escrever a estrutura inteira de um documento HTML (`<html>, <head>, <body>`, etc.). Escreva apenas as tag's necessárias para a resolução do exercício.

Edite o arquivo `membros.json` com as informações dos membros do grupo (até 3, no mínimo 1).

## Como Rodar

O exerício funciona usando o framework de testes para JavaScirpt [Jasmine](https://jasmine.github.io). Para testar esse exercício sem limitação de navegador, recomenda-se usar o HTTPServer do Python (ou qualquer outro servidor HTTP de sua preferência).

Para usar o HTTP Server do Python (v3+), na pasta deste exercício execute o comando:

```shell
python -m http.server
```

Depois basta entrar em algum navegador na url http://localhost:8000/SpecRunner.html e ver os testes sendo executados.

## Como fica a nota

A nota desse exercício será uma proporção entre os testes passados e não passados. São ao todo 48 testes.

Exemplos:

- Dos 48, 42 passaram: `(42 / 48) * 10 = 8,75`
- Dos 48, 16 passaram: `(16 / 48) * 10 = 3,34`
- Todos passaram: `(48 / 48) * 10 = 10`
