"use strict";

prepararTestes(funcs => {
    const erroGravissimo = funcs.erroGravissimo;
    const grupo = funcs.grupo;
    const teste = funcs.teste;
    const igual = funcs.igual;
    const naoDeuErro = funcs.naoDeuErro;
    const Utilitarios = funcs.Utilitarios;
    const ErroFormatado = funcs.ErroFormatado;
    const numeroMaximoDeAlunos = 5;

    window.onerror = (ev, arquivo, linha, coluna, erro) => {
        erroGravissimo(""
                + "<h1>SE VOCÊ ESTÁ VENDO ISSO, É PORQUE HÁ ERROS ESTRUTURAIS GRAVES NO QUE VOCÊS DESENVOLVERAM.</h1>"
                + "<p>Este é um erro gravíssimo. Veja mais detalhes no console do navegador para tentar entender onde ocorreu o erro.</p>"
                + "<p>Quem entregar para o professor algo que faça esta mensagem aparecer, vai ficar com nota zero!</p>"
        );
    };
    const divNota = document.querySelector("#testefw-nota");
    if (divNota) divNota.style.display = "none";

    // JSON DOS ALUNOS.
    let jsonOk = false;
    function testOk() { return jsonOk; }
    function setTestOk(ok) { jsonOk = ok; }

    function validarJsonAlunos() {
        const alunos = dadosDosAlunos(), nomes = [], ras = [];
        if (!(alunos instanceof Array)) throw new Error("Os dados do(a)(s) aluno(a)(s) deveriam estar em um array.");
        if (alunos.length === 0) throw new Error("Você(s) se esqueceu(ram) de preencher os dados com o JSON do(a)(s) aluno(a)(s).");

        alunos.forEach((aluno, idx) => {
            const numero = idx + 1;

            if (!aluno.hasOwnProperty("nome")) throw new Error(`O(a) aluno(a) ${numero} está sem nome no JSON.`);

            if (typeof aluno.nome !== "string") throw new Error(`O nome do(a) aluno(a) ${numero} deveria ser uma string.`);
            if (["João da Silva", "Maria da Silva", ""].indexOf(aluno.nome.trim()) >= 0) {
                throw new Error(`O nome do(a) aluno(a) ${numero} não está correto.`);
            }
            if (aluno.nome !== aluno.nome.trim()) {
                throw new Error(`Não deixe espaços em branco sobrando no começo ou no final do nome de ${aluno.nome} no JSON.`);
            }
            if (nomes.indexOf(aluno.nome) >= 0) throw new Error("Há nomes de alunos(as) repetidos no JSON.");
            nomes.push(aluno.nome);

            if (!aluno.hasOwnProperty("ra")) throw new Error(`O RA de ${aluno.nome} está faltando no JSON.`);
            if (typeof aluno.ra !== "number") throw new Error(`O RA de ${aluno.nome} deveria ser um número.`);
            if (Number.isNaN(aluno.ra) || aluno.ra !== Math.floor(aluno.ra) || aluno.ra <= 0 || aluno.ra === 123456 || aluno.ra === 654321) {
                throw new Error(`O RA de ${aluno.nome} não está correto.`);
            }
            if (ras.indexOf(aluno.ra) >= 0) throw new Error("Há RAs repetidos no JSON.");
            ras.push(aluno.ra);

            if (Object.keys(aluno).length !== 2) {
                throw new Error(`O JSON de ${aluno.nome} tem coisas a mais além do nome e do RA.`);
            }
        });
        if (alunos.length > numeroMaximoDeAlunos) {
            throw new Error(`Vocês só podem fazer grupo de até ${numeroMaximoDeAlunos} alunos(as).`);
        }
        return alunos;
    }

    function mostrarValidacaoJsonAlunos() {
        try {
            const alunos = validarJsonAlunos();
            alunos.forEach(a => {
                const li = document.createElement("li");
                li.append(a.nome);
                document.querySelector("#testefw-alunos").append(li);
            });
        } catch (e) {
            erroGravissimo(""
                    + "<h1>SE VOCÊ ESTÁ VENDO ISSO, É PORQUE VOCÊ NÃO DEFINIU CORRETAMENTE O JSON COM OS INTEGRANTES DO SEU GRUPO.</h1>"
                    + "<p>Arrumar isto é a primeira coisa que você tem que fazer neste AC, e assim que o fizer esta mensagem vai desaparecer.</p>"
                    + "<p>Procure a função dadosDosAlunos() no arquivo ac1.html.</p>"
                    + "<p>Quem entregar para o professor um HTML que faça esta mensagem aparecer, vai ficar com nota zero!</p>"
            );
            throw e;
        }
    }

    grupo("JSON com nomes dos alunos", "Verifica o JSON com a identificação do(a)(s) aluno(a)(s) está ok").naoFracionado.minimo(-10).testes([
        teste("Listagem de alunos ok.", () => mostrarValidacaoJsonAlunos(), naoDeuErro(), undefined, setTestOk)
    ]);

    // VALIDAÇÃO DE HTML.

    function validateHTML(htmlString) {
        return new Promise(resolve  => {
            "https://validator.w3.org/nu/"
            function veio() {
                console.log(this.responseText);
                resolve(this.responseText);
            }
            function abortado() {
                resolve("Cancelado");
            }
            function deuPau() {
                resolve(this.responseText);
            }

            const req = new XMLHttpRequest();
            req.addEventListener("load", veio);
            req.addEventListener("error", deuPau);
            req.addEventListener("abort", abortado);
            req.open("POST", "https://validator.w3.org/nu/");
            req.setRequestHeader("Content-Type", "text/html");
            req.send(htmlString);
        });
    }

    async function validateMe() {
        const source = await fetch(document.location.href).then(response => response.text());
        return await validateHTML(source);
    }

    function validou() {
        return {
            testar: valorObtido => {
                if (!valorObtido.includes('<p class="success">The document validates according to the specified schema(s).</p>')) {
                    throw new ErroFormatado(Utilitarios.escapeHtml('<p class="success">The document validates according to the specified schema(s).</p>'), valorObtido, ["", ""]);
                }
            },
            esperado: `Resultado esperado: ${Utilitarios.escapeHtml('<p class="success">The document validates according to the specified schema(s).</p>')}.`
        };
    }

    // UM MONTE DE COISAS INTERNAS.

    Object.defineProperty(Node.prototype, "nonBlankChildNodes", {
        get() {
            const resposta = [];
            const elems = this.childNodes;
            for (let e = 0; e < elems.length; e++) {
                const elem = elems[e];
                if (elem.constructor.name !== "Comment" && (elem.constructor.name !== "Text" || elem.textContent.trim() !== "")) resposta.push(elem);
            }
            return resposta;
        },
        enumerable: true,
        configurable: false,
    });

    let ex1Ok = false, ex2Ok = false, ex3Ok = false, ex4Ok = false,
            h1OkA = false, h1OkB = false, h1OkC = false,
            pOkA = false, pOkB = false, pOkC = false, pOkD = false,
            bOkA = false, bOkB = false,
            iOkA = false, iOkB = false,
            uOkA = false, uOkB = false,
            imgOkA = false, imgOkB = false,
            aOkA = false, aOkB = false,
            qOkA = false, qOkB = false, qOkC = false,
            cOkA = false, cOkB = false;
    const textao = "Desde 1999, o desenvolvimento da linguagem HTML (HyperText Markup Language) ficou estacionado na versão 4. De lá pra cá, a W3C esteve focada em linguagens como XML (Extensible Markup Language) e SVG (Scalable Vector Graphics). Mas finalmente, a partir de 2008, a HTML5 começou a ser desenvolvida e hoje é a versão dominante.";
    const url = "https://www.w3.org/html/logo/img/html5-topper.png";
    const link = "https://www.w3.org/html/";
    const citacao = "Aprender HTML5 é o início da sua jornada na web Professor de TecWeb";

    // ESTRUTURA DAS PÁGINAS.

    grupo("Estrutura da página", "Verifica se a estrutura da página foi mantida").minimo(-2).pararNoPrimeiroErro.testes([
        teste("O documento só tem os dois filhos."         , () => document.nonBlankChildNodes.length                                           , igual(2             )),
        teste("O documento tem um <!DOCTYPE>."             , () => document.nonBlankChildNodes[0].constructor.name                              , igual("DocumentType")),
        teste("O <!DOCTYPE html> está lá."                 , () => document.nonBlankChildNodes[0].name                                          , igual("html"        )),
        teste("O elemento-filho do documento é o <html>."  , () => document.nonBlankChildNodes[1].tagName                                       , igual("HTML"        )),
        teste("O <html> têm dois filhos."                  , () => document.querySelector("html").nonBlankChildNodes.length                     , igual(2             )),
        teste("O <html> contém o <head>."                  , () => document.querySelector("html").nonBlankChildNodes[0] === document.head       , igual(true          )),
        teste("O <html> contém o <body>."                  , () => document.querySelector("html").nonBlankChildNodes[1] === document.body       , igual(true          )),
        teste("O <body> contém o número certo de filhos."  , () => document.body.nonBlankChildNodes.length                                      , igual(5             )),
        teste("O elemento #exercicio1 é uma <div>."        , () => document.querySelector("#exercicio1").tagName                                , igual("DIV"), undefined, ok => ex1Ok = ok),
        teste("O <body> contém #exercicio2 no local certo.", () => document.body.nonBlankChildNodes[1] === document.querySelector("#exercicio2"), igual(true)                              ),
        teste("O elemento #exercicio2 é uma <div>."        , () => document.querySelector("#exercicio2").tagName                                , igual("DIV"), undefined, ok => ex2Ok = ok),
        teste("O <body> contém #exercicio3 no local certo.", () => document.body.nonBlankChildNodes[2] === document.querySelector("#exercicio3"), igual(true)                              ),
        teste("O elemento #exercicio3 é uma <div>."        , () => document.querySelector("#exercicio3").tagName                                , igual("DIV"), undefined, ok => ex3Ok = ok),
        teste("O <body> contém #exercicio4 no local certo.", () => document.body.nonBlankChildNodes[3] === document.querySelector("#exercicio4"), igual(true)                              ),
        teste("O elemento #exercicio4 é uma <div>."        , () => document.querySelector("#exercicio4").tagName                                , igual("DIV"), undefined, ok => ex4Ok = ok),
        teste("O <body> contém #exercicio1 no local certo.", () => document.body.nonBlankChildNodes[0] === document.querySelector("#exercicio1"), igual(true)          ),
        teste("Não há erros na estrutura do HTML."         , async () => await validateMe()                                                     , validou()            )
    ]);

    // EXERCÍCIOS.

    const testesEx1 = [
        teste("A tag do título deve estar presente. Utilize a tag correta para título de texto principais.", () => document.querySelector("#exercicio1 > h1") !== null                                                  , igual(true)                        , () => ex1Ok , ok => h1OkA  = ok),
        teste("Só deve haver uma tag de título no exercício 1."                                            , () => document.querySelectorAll("#exercicio1 > h1").length                                                 , igual(1)                           , () => h1OkA , ok => h1OkB  = ok),
        teste("A tag de título deve estar no local correto."                                               , () => document.querySelector("#exercicio1 > h1") === document.querySelector("#exercicio1 > :nth-child(1)") , igual(true)                        , () => h1OkB , ok => h1OkC  = ok),
        teste("A tag título contém o texto correto conforme o enunciado."                                  , () => document.querySelector("#exercicio1 > h1").innerHTML                                                 , igual("Meu Primeiro HTML")         , () => h1OkC                    ),
        teste("A tag do texto deve estar presente. Utilize a tag correta para textos comuns/parágrafos."   , () => document.querySelector("#exercicio1 > p") !== null                                                   , igual(true)                        , () => ex1Ok , ok => pOkA   = ok),
        teste("Só deve haver uma tag de texto."                                                            , () => document.querySelectorAll("#exercicio1 > p").length                                                  , igual(1)                           , () => pOkA  , ok => pOkB   = ok),
        teste("A tag de texto deve estar no local correto."                                                , () => document.querySelector("#exercicio1 > p") === document.querySelector("#exercicio1 > :nth-child(2)")  , igual(true)                        , () => pOkB  , ok => pOkC   = ok),
        teste("A tag do texto contém o texto correto conforme o enunciado."                                , () => document.querySelector("#exercicio1 > p").innerText                                                  , igual(textao)                      , () => pOkC  , ok => pOkD   = ok),
        teste("A tag de negrito deve estar presente. Não é <b>."                                           , () => document.querySelector("#exercicio1 > p > strong") != null                                           , igual(true)                        , () => pOkD  , ok => bOkA   = ok),
        teste("Só deve haver uma tag de negrito."                                                          , () => document.querySelectorAll("#exercicio1 > p > strong").length                                         , igual(1)                           , () => bOkA  , ok => bOkB   = ok),
        teste("O conteúdo do negrito deve ser o esperado."                                                 , () => document.querySelector("#exercicio1 > p > strong").innerHTML                                         , igual("Extensible Markup Language"), () => bOkB                     ),
        teste("A tag de itálico deve estar presente. Não é <i>."                                           , () => document.querySelector("#exercicio1 > p > em") != null                                               , igual(true)                        , () => pOkD  , ok => iOkA   = ok),
        teste("Só deve haver uma tag de itálico."                                                          , () => document.querySelectorAll("#exercicio1 > p > em").length                                             , igual(1)                           , () => iOkA  , ok => iOkB   = ok),
        teste("O conteúdo do itálico deve ser o esperado."                                                 , () => document.querySelector("#exercicio1 > p > em").innerHTML                                             , igual("HyperText Markup Language") , () => iOkB                     ),
        teste("A tag de sublinhado deve estar presente. É a <ins>"                                         , () => document.querySelector("#exercicio1 > p > ins") != null                                              , igual(true)                        , () => pOkD  , ok => uOkA   = ok),
        teste("Só deve haver uma tag de sublinhado."                                                       , () => document.querySelectorAll("#exercicio1 > p > ins").length                                            , igual(1)                           , () => uOkA  , ok => uOkB   = ok),
        teste("O conteúdo do sublinhado deve ser o esperado."                                              , () => document.querySelector("#exercicio1 > p > ins").innerHTML                                            , igual("Scalable Vector Graphics")  , () => uOkB                     ),
        teste("A tag <img> deve estar presente."                                                           , () => document.querySelector("#exercicio1 > img") != null                                                  , igual(true)                        , () => ex1Ok , ok => imgOkA = ok),
        teste("Só deve haver uma tag de imagem."                                                           , () => document.querySelectorAll("#exercicio1 > img").length                                                , igual(1)                           , () => imgOkA, ok => imgOkB = ok),
        teste("A tag da imagem deve estar no local correto."                                               , () => document.querySelector("#exercicio1 > img") === document.querySelector("#exercicio1 > :nth-child(3)"), igual(true)                        , () => imgOkB                   ),
        teste("A imagem deve ter o endereço correto."                                                      , () => document.querySelector("#exercicio1 > img").src                                                      , igual(url)                         , () => imgOkB                   ),
        teste("A imagem deve ter o alt correto."                                                           , () => document.querySelector("#exercicio1 > img").alt                                                      , igual("HTML5 Logo")                , () => imgOkB                   ),
        teste("A imagem não deve ter tags aninhadas."                                                      , () => document.querySelector("#exercicio1 > img").children.length                                          , igual(0)                           , () => imgOkB                   ),
        teste("A tag de link deve estar presente."                                                         , () => document.querySelector("a") != null                                                                  , igual(true)                        , () => ex1Ok , ok => aOkA   = ok),
        teste("Só deve haver uma tag de link."                                                             , () => document.querySelectorAll("a").length                                                                , igual(1)                           , () => aOkA  , ok => aOkB   = ok),
        teste("A tag de link deve estar no local correto."                                                 , () => document.querySelector("a") === document.querySelector("#exercicio1 > :nth-child(4)")                , igual(true)                        , () => aOkB                     ),
        teste("O link deve ter o endereço correto."                                                        , () => document.querySelector("a").href                                                                     , igual(link)                        , () => aOkB                     ),
        teste("O link deve ter o conteúdo esperado."                                                       , () => document.querySelector("a").innerHTML                                                                , igual("Saiba mais sobre o HTML5")  , () => aOkB                     ),
        teste("A tag de citação em bloco deve estar presente."                                             , () => document.querySelector("blockquote") != null                                                         , igual(true)                        , () => ex1Ok , ok => qOkA   = ok),
        teste("Só deve haver uma tag de citação."                                                          , () => document.querySelectorAll("blockquote").length                                                       , igual(1)                           , () => qOkA  , ok => qOkB   = ok),
        teste("A tag de citação deve estar no local correto."                                              , () => document.querySelector("blockquote") === document.querySelector("#exercicio1 > :nth-child(5)")       , igual(true)                        , () => qOkB                     ),
        teste("O conteúdo da citação deve ser o esperado."                                                 , () => document.querySelector("blockquote").innerText                                                       , igual(citacao)                     , () => qOkB  , ok => qOkC   = ok),
        teste("A tag <cite> deve estar presente dentro do bloco."                                          , () => document.querySelector("cite") != null                                                               , igual(true)                        , () => qOkC  , ok => cOkA   = ok),
        teste("Só deve haver uma tag de autor da citação."                                                 , () => document.querySelectorAll("cite").length                                                             , igual(1)                           , () => cOkA  , ok => cOkB   = ok),
        teste("A tag de autor deve estar no local correto."                                                , () => document.querySelector("cite") === document.querySelector("blockquote > cite")                       , igual(true)                        , () => cOkB                     ),
        teste("O conteúdo da tag de autor deve ser o esperado."                                            , () => document.querySelector("cite").innerHTML                                                             , igual("Professor de TecWeb")       , () => cOkB                     ),
        teste("Não há nada mais além do que o solicitado dentro de #exercicio1."                           , () => document.querySelector("#exercicio1").nonBlankChildNodes.length                                      , igual(5)                           , () => ex1Ok                    )
    ];

    const casosEx2 = [
        ["H1", "Introdução"],
        ["H1", "Objetivos"],
        ["H2", "Objetivo Geral"],
        ["H2", "Objetivo Específico"],
        ["H3", "Primeiro Específico"],
        ["H3", "Segundo Específico"],
        ["H1", "Revisão da Literatura"],
        ["H2", "Como fazer as citações no texto"],
        ["H3", "Citações diretas"],
        ["H4", "Citação direta de livro"],
        ["H5", "Imagem 1 - Exemplo de citação direta de livro"],
        ["H4", "Citação direta de artigo"],
        ["H5", "Artigos em Inglês"],
        ["H6", "Imagem 2 - Exemplo de citação direta de artigo em inglês"],
        ["H5", "Artigos em Português"],
        ["H6", "Imagem 3 - Exemplo de citação direta de artigo em português"],
        ["H3", "Citações indiretas"],
        ["H4", "Exemplos de citação indireta"],
        ["H1", "Conclusão"]
    ];
    const testesEx2 = [
        teste("Existem 19 elementos no exercício.", () => document.querySelector("#exercicio2").nonBlankChildNodes.length, igual(19), ex2Ok)
    ];
    for (const i in casosEx2) {
        testesEx2.push(teste(`Verifica se o tipo do elemento ${i} está ok.`    , eval(`() => document.querySelector("#exercicio2").nonBlankChildNodes[${i}].tagName`                  ), igual(casosEx2[i][0]), () => ex2Ok));
        testesEx2.push(teste(`Verifica se o conteúdo do elemento ${i} está ok.`, eval(`() => document.querySelector("#exercicio2").nonBlankChildNodes[${i}].innerHTML`                ), igual(casosEx2[i][1]), () => ex2Ok));
        testesEx2.push(teste(`Verifica se não há nada aninhado no ${i}.`       , eval(`() => document.querySelector("#exercicio2").nonBlankChildNodes[${i}].nonBlankChildNodes.length`), igual(1)             , () => ex2Ok));
    }

    function filhos() {
        let resposta = "";
        for (const i in arguments) {
            resposta += ` > :nth-child(${arguments[i]})`;
        }
        return resposta;
    }

    const casosEx3 = [
        ["DIV" , `("#exercicio3")`                                                 , 1, undefined                            ],
        ["OL"  , `("#exercicio3${filhos(1)               }")`                      , 3, undefined                            ],
        ["LI"  , `("#exercicio3${filhos(1, 1)            }")`                      , 1, "Fechar contrato"                    ],
        ["LI"  , `("#exercicio3${filhos(1, 2)            }")`                      , 2, undefined                            ],
        ["Text", `("#exercicio3${filhos(1, 2)            }").nonBlankChildNodes[0]`, 0, "Análise de sistema"                 ],
        ["OL"  , `("#exercicio3${filhos(1, 2, 1)         }")`                      , 3, undefined                            ],
        ["LI"  , `("#exercicio3${filhos(1, 2, 1, 1)      }")`                      , 2, undefined                            ],
        ["Text", `("#exercicio3${filhos(1, 2, 1, 1)      }").nonBlankChildNodes[0]`, 0, "Avaliação da empresa"               ],
        ["OL"  , `("#exercicio3${filhos(1, 2, 1, 1, 1)   }")`                      , 2, undefined                            ],
        ["LI"  , `("#exercicio3${filhos(1, 2, 1, 1, 1, 1)}")`                      , 1, "Entrevista com funcionários"        ],
        ["LI"  , `("#exercicio3${filhos(1, 2, 1, 1, 1, 2)}")`                      , 1, "Pesquisa de documentação da empresa"],
        ["LI"  , `("#exercicio3${filhos(1, 2, 1, 2)      }")`                      , 1, "Programação"                        ],
        ["LI"  , `("#exercicio3${filhos(1, 2, 1, 3)      }")`                      , 1, "Aprovação do projeto"               ],
        ["LI"  , `("#exercicio3${filhos(1, 3)            }")`                      , 1, "Treinamento dos usuários"           ]
    ];
    const testesEx3 = [];
    for (const i in casosEx3) {
        if (casosEx3[i][0] === "Text") {
            testesEx3.push(teste(`Verifica se o tipo do elemento ${i} está ok.`                 , eval(`() => document.querySelector${casosEx3[i][1]}.constructor.name`         ), igual("Text")        , () => ex3Ok));
            testesEx3.push(teste(`Verifica se o conteúdo do elemento ${i} está ok.`             , eval(`() => document.querySelector${casosEx3[i][1]}.textContent.trim()`       ), igual(casosEx3[i][3]), () => ex3Ok));
        } else {
            if (i > 0) {
                testesEx3.push(teste(`Verifica se o tipo do elemento ${i} está ok.`             , eval(`() => document.querySelector${casosEx3[i][1]}.tagName`                  ), igual(casosEx3[i][0]), () => ex3Ok));
            }
            testesEx3.push(teste(`Verifica se há a quantidade certa de filhos no elemento ${i}.`, eval(`() => document.querySelector${casosEx3[i][1]}.nonBlankChildNodes.length`), igual(casosEx3[i][2]), () => ex3Ok));
            if (casosEx3[i][3]) {
                testesEx3.push(teste(`Verifica se o conteúdo do elemento ${i} está ok.`         , eval(`() => document.querySelector${casosEx3[i][1]}.innerHTML`                ), igual(casosEx3[i][3]), () => ex3Ok));
            }
        }
    }

    const casosEx4 = [
        ["DIV"  , `("#exercicio4")`                     , 1, undefined                     , {                               }],
        ["TABLE", `("#exercicio4${filhos(1)         }")`, 2, undefined                     , {                               }],
        ["THEAD", `("#exercicio4${filhos(1, 1)      }")`, 1, undefined                     , {                               }],
        ["TR"   , `("#exercicio4${filhos(1, 1, 1)   }")`, 1, undefined                     , {                               }],
        ["TH"   , `("#exercicio4${filhos(1, 1, 1, 1)}")`, 1, "Tabela de Serviços Mecânicos", {scope: "colgroup", colspan: "5"}],
        ["TBODY", `("#exercicio4${filhos(1, 2)      }")`, 5, undefined                     , {                               }],
        ["TR"   , `("#exercicio4${filhos(1, 2, 1)   }")`, 5, undefined                     , {                               }],
        ["TH"   , `("#exercicio4${filhos(1, 2, 1, 1)}")`, 1, "Nacionais"                   , {scope: "rowgroup", rowspan: "5"}],
        ["TH"   , `("#exercicio4${filhos(1, 2, 1, 2)}")`, 1, "Veículos"                    , {scope: "col"                   }],
        ["TH"   , `("#exercicio4${filhos(1, 2, 1, 3)}")`, 1, "Serviço"                     , {scope: "col"                   }],
        ["TH"   , `("#exercicio4${filhos(1, 2, 1, 4)}")`, 1, "Tempo Previsto"              , {scope: "col"                   }],
        ["TH"   , `("#exercicio4${filhos(1, 2, 1, 5)}")`, 1, "Valor"                       , {scope: "col"                   }],
        ["TR"   , `("#exercicio4${filhos(1, 2, 2)   }")`, 4, undefined                     , {                               }],
        ["TD"   , `("#exercicio4${filhos(1, 2, 2, 1)}")`, 1, "Caminhonete S10"             , {                               }],
        ["TD"   , `("#exercicio4${filhos(1, 2, 2, 2)}")`, 1, "Suspensão"                   , {                               }],
        ["TD"   , `("#exercicio4${filhos(1, 2, 2, 3)}")`, 1, "3 horas e 25 minutos"        , {                               }],
        ["TD"   , `("#exercicio4${filhos(1, 2, 2, 4)}")`, 1, "350,00"                      , {                               }],
        ["TR"   , `("#exercicio4${filhos(1, 2, 3)   }")`, 4, undefined                     , {                               }],
        ["TD"   , `("#exercicio4${filhos(1, 2, 3, 1)}")`, 1, "Caminhonete Ranger"          , {                               }],
        ["TD"   , `("#exercicio4${filhos(1, 2, 3, 2)}")`, 1, "Freio"                       , {                               }],
        ["TD"   , `("#exercicio4${filhos(1, 2, 3, 3)}")`, 1, "3 horas e 45 minutos"        , {                               }],
        ["TD"   , `("#exercicio4${filhos(1, 2, 3, 4)}")`, 1, "200,00"                      , {                               }],
        ["TR"   , `("#exercicio4${filhos(1, 2, 4)   }")`, 4, undefined                     , {                               }],
        ["TD"   , `("#exercicio4${filhos(1, 2, 4, 1)}")`, 1, "Caminhonete Hilux"           , {                               }],
        ["TD"   , `("#exercicio4${filhos(1, 2, 4, 2)}")`, 1, "Troca de Bateria"            , {                               }],
        ["TD"   , `("#exercicio4${filhos(1, 2, 4, 3)}")`, 1, "30 minutos"                  , {                               }],
        ["TD"   , `("#exercicio4${filhos(1, 2, 4, 4)}")`, 1, "25,00"                       , {                               }],
        ["TR"   , `("#exercicio4${filhos(1, 2, 5)   }")`, 4, undefined                     , {                               }],
        ["TD"   , `("#exercicio4${filhos(1, 2, 5, 1)}")`, 1, "Caminhonete D10"             , {                               }],
        ["TD"   , `("#exercicio4${filhos(1, 2, 5, 2)}")`, 1, "Alinhamento"                 , {                               }],
        ["TD"   , `("#exercicio4${filhos(1, 2, 5, 3)}")`, 1, "1 hora e 40 minutos"         , {                               }],
        ["TD"   , `("#exercicio4${filhos(1, 2, 5, 4)}")`, 1, "220,00"                      , {                               }],
    ];
    const testesEx4 = [];
    for (const i in casosEx4) {
        if (i > 0) {
            testesEx4.push(teste(`Verifica se o tipo do elemento ${i} está ok.`                , eval(`() => document.querySelector${casosEx4[i][1]}.tagName`                  ), igual(casosEx4[i][0]       ), () => ex4Ok));
        }
        testesEx4.push(teste(`Verifica se há a quantidade certa de elementos aninhado no ${i}.`, eval(`() => document.querySelector${casosEx4[i][1]}.nonBlankChildNodes.length`), igual(casosEx4[i][2]       ), () => ex4Ok));
        if (casosEx4[i][3]) {
            testesEx4.push(teste(`Verifica se o conteúdo do elemento ${i} está ok.`            , eval(`() => document.querySelector${casosEx4[i][1]}.innerHTML`                ), igual(casosEx4[i][3]       ), () => ex4Ok));
        }
        for (const chave in casosEx4[i][4]) {
            testesEx4.push(teste(`Verifica se o ${chave} do elemento ${i} está ok.`            , eval(`() => document.querySelector${casosEx4[i][1]}.getAttribute(chave)`      ), igual(casosEx4[i][4][chave]), () => ex4Ok));
        }
    }

    grupo("Exercício 1", "HTML"    ).maximo(2.5).testes(testesEx1);
    grupo("Exercício 2", "Headings").maximo(2.5).testes(testesEx2);
    grupo("Exercício 3", "Listas"  ).maximo(2.5).testes(testesEx3);
    grupo("Exercício 4", "Tabela"  ).maximo(2.5).testes(testesEx4);

    // TRUQUE PARA O CSS FUNCIONAR.

    for (const e of document.querySelectorAll("td, th")) {
        e.setAttribute("text", e.innerText);
    }
})(-1);