# Exercício - Introdução ao HTML5

Esse é um exercício de correção automática sobre o conteúdo da aula de Introdução ao HTML5 de Tecnologias Web da Faculdade Impacta de Tecnologia.

## O que fazer?

Você deve mexer apenas no arquivo `ac1.html`. Lá há 4 `<div>`s chamadas _exercicio1_, _exercicio2_, _exercicio3_ e _exercicio4_ e um JSON onde deve ser escrito o HTML. Há um JSON perto do começo do arquivo também que vocês devem alterar. Vocês não devem mexer em mais nada mais além disso dentro do arquivo para não quebrar os testes.

Comece pela função que fornece um JSON com o nome e o RA dos alunos. Se você não conseguir fazer isso corretamente, sua nota será zero independente de todo o resto.

## Como saber se o que fiz está certo?

O exercício funciona usando um framework de testes em JavaScript desenvolvido para a atividade.

Para testar esse exercício, basta abrir qualquer arquivo HTML em um navegador moderno (Chrome ou Firefox) e ver os testes serem executados.

O navegador vai mostrar a sua página HTML junto com os resultados dos testes.

Obviamente, o HTML dado aqui falhará em todos os testes. Não só isso, já te dará de cara uma caixa de mensagem de erro amarela com letras grandes vermelhas piscando bem chamativas dizendo que você precisa configurar o JSON com o nome dos alunos.

O seu objetivo é editar esse HTML de forma a fazer todos os testes passarem. Não tem muito segredo, basta fazer EXATAMENTE o que o enunciado pede, nem mais e nem menos. Se tiver algum erro, os testes te dirão o que há de errado.

Edite o seu `ac1.html` até que todos os testes passem (ou até que você desista, mas espero que não).

## E os demais arquivos?

Os testes estão no arquivo `ac1-teste.js`. O código responsável por gerenciar os testes está no `lib/testefw.js`. Outros arquivos com nomes semelhantes também correspondem aos testes.
É recomendável você deixar estes arquivos como estão, pois o professsor sempre usará os originais na correção, logo não há porque alterá-los.
Se você tiver coragem, você até pode mexer nesses arquivos para fazer algum experimento, colocar linhas de `console.log` para tentar entender como o código funciona, desmontar ou alterar pedaços para fazer debugging, etc.
No entanto, o funcionamento interno desses arquivos está em um nível bastante avançado e complexo e não é esperado que alunos que estejam recém-começando em HTML e menos ainda em JavaScript os entendam.
De toda forma, se quiser fuçar neles, sempre tenha em mão os arquivos originais para se certificar de que não bagunçou nada.

## Como fica a nota?

Os próprios testes já calculam a nota automaticamente, da seguinte forma:

- Faça o exercício 0 antes de qualquer coisa. Ele se chama exercício 0 porque se você não o fizer direito, a sua nota também será 0.

- Cada exercício vale 2.5 com nota proporcional à quantidade de testes correspondentes que passou.

- Se você bagunçar com a estrutura do HTML mexendo onde não era pra mexer sofrerá uma penalidade de até -2 pontos. Isso serve para te desencorajar a zoar com o que não deve ser zoado no HTML.

No entanto, há algumas observações a serem feitas:

- Se você(s) fizer(em) a entrega incorretamente, será(ão) penalizado em -1 ponto.

- Você(s) só deve(m) entregar o arquivo `ac1.html`. Vou ignorar quaisquer mudanças realizadas em outros arquivos e sempre fazer a correção com os demais arquivos originais.

- Quem tentar colocar algum tipo de malware ou código malicioso no `ac1.html` fica com nota zero.

- **Fique(m) atento(s) a erros que aparecerem no console do navegador. Eles podem sinalizar um problema sério e ocasionar uma nota zero.**

- **Colocar scripts que travem ou não terminem de carregar nunca (por exemplo, `while (true) { /* fica preso no laço infinito. */}`) também podem ocasionar uma nota zero.** E neste AC vocês nem deviam fazer script nenhum!

- Se o professor encontrar alguma tentativa de burlar os testes, você vai perder pontos!

- Partes do HTML que contiverem algum mecanismo para tentar burlar os testes terão a sua nota correspondente zerada. Entretanto, apesar de ser possível burlar os testes, fazer isso dá muito mais trabalho e é muito mais difícil do que resolver os exercícios da forma como são pedidos, então não vale a pena tentar fazer isso.

## Como fazer a entrega?

A entrega deve ser feita pelo formulário na AC 1 do classroom.

Coloque nele um arquivo ZIP contendo o seu arquivo `ac1.html`. Os demais arquivos não são necessários, pois usarei sempre os originais.

Em caso de múltiplas entregas de um mesmo grupo de alunos, ainda que por pessoas diferentes do mesmo grupo, irei considerar apenas a última.

Quem fizer a entrega de uma forma errada (ex: arquivo RAR ao invés de ZIP, ou entregar pelo classroom diretamente ao invés do forms, ou enviar por e-mail ou de qualquer outra forma), vai ser penalizado em -1 ponto. Isso se o professor quiser e puder aceitar a entrega feita assim.