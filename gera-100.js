let ma = [];

// cada elemento é uma lista de índices para uma linha horizontal completa
// de cima para baixo
let listaExisteLinGr = [ [0,1,2,9,10,11,18,19,20], [3,4,5,12,13,14,21,22,23], [6,7,8,15,16,17,24,25,26],
               [27,28,29,36,37,38,45,46,47], [30,31,32,39,40,41,48,49,50], [33,34,35,42,43,44,51,52,53],
               [54,55,56,63,64,65,72,73,74], [57,58,59,66,67,68,75,76,77], [60,61,62,69,70,71,78,79,80] 
             ];

// cada elemento é uma lista de índices para uma das 9 celulas do jogo (celula 3x3 )
// da esquerda para direita, de cima para baixo
let listaExisteCEL3x3 = [ [0,1,2,3,4,5,6,7,8], [9,10,11,12,13,14,15,16,17], [18,19,20,21,22,23,24,25,26],
               [27,28,29,30,31,32,33,34,35], [36,37,38,39,40,41,42,43,44], [45,46,47,48,49,50,51,52,53],
               [54,55,56,57,58,59,60,61,62], [63,64,65,66,67,68,69,70,71], [72,73,74,75,76,77,78,79,80]
             ];             

// cada elemento é uma lista de índices para uma linha vertical completa
// da esquerda para a direita
let listaExisteColGr = [ [0,3,6,27,30,33,54,57,60], [1,4,7,28,31,34,55,58,61], [2,5,8,29,32,35,56,59,62],
               [9, 12,15,36,39,42,63,66,69], [10,13,16,37,40,43,64,67,70], [11,14,17,38,41,44,65,68,71],
               [18,21,24,45,48,51,72,75,78], [19,22,25,46,49,52,73,76,79], [20,23,26,47,50,53,74,77,80]
             ];

// tempo para iniciar a contagem regressiva;
let tempototal = 600;
let tempo = tempototal;
let decorrido = 0;

let pontos = 0;

// gera na matriz "ma" números aleatórios consistentes com uma jogada completa
geraAleatorios(ma);

var d = document; 

let corpo = d.getElementsByClassName("corpo")[0];

// cria todo o HTML (no DOM) que apresentará os números do jogo
let contador = 0;
for (let i=0;i<3;i++) {
    corpo.appendChild(d.createElement("div")).classList.add("linha"+i);
    let l = d.getElementsByClassName("linha"+i)[0];
    for ( let x=0;x<3;x++) {
        l.appendChild(d.createElement("div")).classList.add("linha"+i+"cel"+x);
        let c = d.getElementsByClassName("linha"+i+"cel"+x)[0];
        for ( let k=0;k<3;k++) {
            c.appendChild(d.createElement("div")).classList.add("linha"+i+"cel"+x+"lc"+k);
            let m = d.getElementsByClassName("linha"+i+"cel"+x+"lc"+k)[0];
            m.classList.add("cadalinpeq");
            for ( let j=0;j<3;j++) {
                m.appendChild(d.createElement("div")).classList.add("linha"+i+"cel"+x+"lc"+k+"in"+j);
                let e = d.getElementsByClassName("linha"+i+"cel"+x+"lc"+k+"in"+j)[0];
                e.classList.add("cadapos");
                e.id = contador;
                contador += 1;
            }
        }
    }
}

// ajusta o botao de dificuldade 1 para ativo (ativando a classe respectiva)
d.getElementsByClassName('n1')[0].classList.add("nsel");

// mostra dados no console do java para debug (dados formato celulas 3x3)
apresentaConsole(listaExisteLinGr,ma);

// atualiza os elementos HTML com os dados aleatórios gerados anteriormente
// remove alguns números, conforme o nível de dificuldade
// ajusta as classes que definem se o campo pode ser preenchido
atualizaReferencias(ma,listaExisteCEL3x3);

[...d.getElementsByClassName('nd')].forEach( 
    rep => { rep.addEventListener( 
        'click', (event) => { [...d.getElementsByClassName('nd')].forEach( 
             ele => ele.classList.remove("nsel") 
         );
         event.currentTarget.classList.add("nsel");
         geraAleatorios(ma);
         atualizaReferencias(ma,listaExisteCEL3x3);
         apresentaConsole(listaExisteLinGr,ma);
         ajustaPrimeiraOpcao();
    });
});

// adiciona evento ao botão de NOVA JOGADA
d.getElementsByClassName('njogo')[0].addEventListener( 'click', () => { 
    // se o botão for pressionado será gerada/apresentada uma nova jogada
    geraAleatorios(ma);
    tempo = tempototal;
    decorrido = 0;
    atualizaReferencias(ma,listaExisteCEL3x3);
    apresentaConsole(listaExisteLinGr,ma);
    ajustaPrimeiraOpcao();
});

// Adiciona classe padrão aos campos de input
// Adiciona Listener para cada campo de input
// Adiciona classe padrão aos campos de input (se cor da fonte for black)
// Adiciona classe especial ao campo de input que/se foi clicado
[...d.getElementsByClassName('cadapos')].forEach( ele => { 
    ele.addEventListener('click', (event) => {
        if ( event.currentTarget.classList.contains("cadapos_flexivel") ) { 
            [...d.getElementsByClassName('cadapos')].forEach( eli => {
                eli.classList.remove("cadapos_selec");
                eli.classList.add("cadapos_padrao");
            });
            event.currentTarget.classList.add("cadapos_selec");
            event.currentTarget.classList.remove("cadapos_padrao");
        }
    });
});

// ajusta classe de input selecionado ao primeiro livre (flexível)
ajustaPrimeiraOpcao();

// adiciona evento a cada um dos 9 botões que aplicam os número 1-9
// para o campo selecionado (borda vermelha)
[...d.getElementsByClassName('numeroJogar')].forEach( ele => {
    ele.addEventListener( 'click', (event) => {
       let fieldDestino = d.getElementsByClassName('cadapos_selec')[0];
       if ( fieldDestino ) {
           aplicaValorEmCampo(event.currentTarget.textContent,fieldDestino );
       }
    });
});

// ajusta o controle da contagem regressiva
let intervalId = setInterval( () => {
    if ( decorrido == tempototal ) { 
        d.getElementById("tempoId").textContent = "00:00";
        decorrido += 1;
        mensagemEnfatizada("Você foi derrotado. Pontuação ZERADA!!!");
    }
    if ( decorrido > tempototal ) return;
    if ( decorrido == 0 ) { d.getElementById("njogoId").disabled = false; }
    tempo -= 1;
    decorrido += 1;
    if ( decorrido == 10 ) { d.getElementById("njogoId").disabled = true; }    
    d.getElementById("tempoId").textContent = 
    ((Math.floor(tempo / 60)).toString().length == 1 ? "0" + (Math.floor(tempo / 60)).toString() : (Math.floor(tempo / 60)).toString())
    + ":" + 
    ((tempo % 60).toString().length == 1 ? "0" + (tempo % 60).toString() : (tempo % 60).toString());
},1000);

// função que inverte o status de visualização do modal das intruções
const switchModal = () => {
    const modal = d.querySelector('.modal');
    const actualStyle = modal.style.display;
    if (actualStyle == 'block' ) {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
    }
}

// adiciona um "ouvinte" para quando clicar em algo na tela
// se for na janela modal aí inverte o status de visualização

// ativa a tela de help se clicar no texto "HELP"
const btn = d.querySelector('.modalBtn');
btn.addEventListener('click', switchModal);

// se modal estiver na tela e clicar fora, remove modal de HELP 
window.onclick = function (event) {
     const modal = d.querySelector('.modal');
     if (event.target == modal ) { switchModal(); }
 }

// adiciona um "ouvinte" para click no botão que é usado para fechar o modal
d.getElementsByClassName('fecharModal')[0].addEventListener('click', () => {
    switchModal();
    beep();
})

// mostra a janela modal com as instruções
switchModal();

// se clicar, a qualquer tmepo, um número de 1 a 9 
// havendo um campo em selecionado
// aplica o número clicado sobre o campo
window.onkeypress = function (event) {
    // event.target --> mostra o elemento
    console.log('tecla: ', event.key);
    if ( event.key > 0 && event.key <= 9 ) {
        let fieldDestino = d.getElementsByClassName('cadapos_selec')[0];
        if ( fieldDestino ) {
            aplicaValorEmCampo(event.key,fieldDestino );
        }
    }
}

// ======================================================================================= //

function beep () {
    var context = new AudioContext();
    var oscillator = context.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = 400;
    oscillator.connect(context.destination);
    oscillator.start(); 
    // Beep for 500 milliseconds
    setTimeout(function () {
        oscillator.stop();
        }, 50
    );
}

// *************************************************************************************** //

function aplicaValorEmCampo (conteudo, destino) {

    if ( existeInconsis(parseInt(destino.id),parseInt(conteudo),listaExisteLinGr,ma)  || 
         existeInconsis(parseInt(destino.id),parseInt(conteudo),listaExisteCEL3x3,ma) ||
         existeInconsis(parseInt(destino.id),parseInt(conteudo),listaExisteColGr,ma) ) {
         beep();
         //mensagemEnfatizada("Há uma inconsistência nessa opção!");
    } else {
         destino.textContent = parseInt(conteudo);
         ma[destino.id] = parseInt(conteudo);
         destino.classList.remove('cadapos_selec');
         // avalia se está tudo preenchido (se estiver testa correção)
         fullFields();
         // ajusta classe de input selecionado ao primeiro livre (da cor black)
         ajustaPrimeiraOpcao();
    }

}

// *************************************************************************************** //

// Mostra na tela a mensagem que veio no parâmetro
function mensagemEnfatizada(msg) {
    alert(msg);
}

// *************************************************************************************** //

// libera para entrar com o número-opção no primeiro campo livre (até agora não preenchido)
// faz isso inserindo uma classe que, por sinal, deixa a borda vermelha
function ajustaPrimeiraOpcao () {

    let todosOsCampos = [...d.getElementsByClassName('cadapos')];
    todosOsCampos.forEach( ele => ele.classList.remove("cadapos_selec") );
    let primeiroIndiceLivre = todosOsCampos.findIndex( (e,i,a) => 
        e.classList.contains("cadapos_flexivel") && e.textContent == " "
    );
    if ( primeiroIndiceLivre != -1 ) todosOsCampos[primeiroIndiceLivre].classList.add("cadapos_selec");
}

// *************************************************************************************** //
            
// verifica se todos os campos foram preenchidos com algum número
function fullFields() {

    if ( [...d.getElementsByClassName('cadapos')].findIndex( (e,i,a) => e.textContent === " " ) !== -1 ) 
        return false;

    if ( correctionCheck(ma,listaExisteLinGr,listaExisteColGr,listaExisteCEL3x3) ) {

        let nDificuldade = [...d.getElementsByClassName('nd')].findIndex( (e,i,a) => e.classList.contains("nsel") );
        let mult = ([1,5,10,15,20])[nDificuldade];

        if ( tempo > 0 ) { pontos += (tempo*mult); } else { pontos = 0; }
        d.getElementById("pontosId").textContent = pontos;
        tempo = tempototal;
        decorrido = 0;
        mensagemEnfatizada("Parabéns, tudo certo!!!");
        geraAleatorios(ma);
        atualizaReferencias(ma,listaExisteCEL3x3);
        apresentaConsole(listaExisteLinGr,ma);
    } else {
        mensagemEnfatizada("Algo de errado não está certo!!! (sic)");
    }

    return true;
}

// *************************************************************************************** //

// verifica se o preenchimento atual está correto
function correctionCheck(lista,listaExisteLinGr,listaExisteColGr,listaExisteCEL3x3) {
    for ( let x = 0 ; x < 9 ; x++ ) {
        if ( listaExisteLinGr[x].reduce(  (pre, cur) => pre + lista[cur], 0) != 45 ) return false;
        if ( listaExisteColGr[x].reduce(  (pre, cur) => pre + lista[cur], 0) != 45 ) return false;
        if ( listaExisteCEL3x3[x].reduce( (pre, cur) => pre + lista[cur], 0) != 45 ) return false;
    };
    return true;
}

// *************************************************************************************** //

// apresenta no console todos os números do jogo (no formato final)
function apresentaConsole(lista,matriz) {
    console.log("-------------------------------");
    lista.forEach( (ele,index,array) => {
        console.log("| ", matriz[ele[0]], matriz[ele[1]], matriz[ele[2]], " | ", 
                          matriz[ele[3]], matriz[ele[4]], matriz[ele[5]], " | ", 
                          matriz[ele[6]], matriz[ele[7]], matriz[ele[8]], " |");
        if ( index == 2 || index == 5 || index == 8 ) {
            console.log("-------------------------------");
        }
    });
}

// *************************************************************************************** //

// nos 9 elementos de "lista", procura onde está o "indice" informado
// encontrado o "indice", percorre as 9 posições do elemento onde foi encontrado o "indice"
// -- verificando se na "listamatriz", considerada a lista de indices localizada, já não existe o "numero" informado
function existeInconsis (indice, numero, lista, listaMatriz) {
    let qualIndiceNivel1 = lista.findIndex( ele => ele.includes(indice) );
    return lista[qualIndiceNivel1].some( ele => listaMatriz[ele] == numero );
 }

// *************************************************************************************** // 

// gera 81 números aleatórios em "ma"
 function geraAleatorios (lista) {
    lista.forEach( ele => ele = 0);
    let iteracao = 0, iteracaoMilhao = 0, contador = 0;
    do { 
        // gera até completar elementos (0-80)
        iteracaoMilhao = 0;
        while ( true ) {
            for ( let l = 0+contador; l < 9+contador ; l++ ) {  // gera 9 números
                iteracao = 0;
                while (true) {
                    iteracao = iteracao + 1;
                    num_sort = Math.floor(Math.random() * 9) + 1; // numero aleatório
                    if ( iteracao > 100 ) break; 
                  
                    if ( existeInconsis(l,num_sort,listaExisteLinGr,lista) ) continue; 
                    if ( existeInconsis(l,num_sort,listaExisteCEL3x3,lista) ) continue; 
                    if ( existeInconsis(l,num_sort,listaExisteColGr,lista) ) continue; 
                    lista[l] = num_sort;
                    break;

                }
                if ( iteracao > 100 ) break;
            }
            if ( iteracao > 100 ) {
                // executou mais de 100 vezes sem conseguir concluir os números da linha da jogada, reiniciar
                for ( let l = 0+contador; l < 9 + contador ; l++ ) { lista[l] = 0; }
                iteracaoMilhao = iteracaoMilhao + 1;
                if ( iteracaoMilhao > 5 ) break;
                // se já reiniciou no perfil completo mais de 5 vezes --> reiniciar geral
                continue;
            }
            break;
        }
        if ( iteracaoMilhao > 5 ) { lista.map( e => e = 0 );  contador=0; continue; }
        contador = contador + 9;
    }  while ( contador < 81 )    
 }

// *************************************************************************************** //

// atualiza numeros sorteados, excluindo conforme nível de dificuldade
// atualiza classes para inputs
// atualiza cores das fontes dos inputs (vermelho/black) parametro permite selecionar
 function atualizaReferencias(lista,listaCEL3x3) {

    let sa = [  [9,8,8,7,8,9,8,8,9], [8,7,7,6,7,8,7,7,8], [7,6,6,5,6,7,6,6,7], 
                 [6,5,5,4,5,6,5,5,6], [5,4,4,3,4,5,4,4,5] ];

    let nDificuldade = [...d.getElementsByClassName('nd')].findIndex( (e,i,a) => e.classList.contains("nsel") );

    let celatuar = 0;
    while ( sa[nDificuldade].length > 0) {
        num_sort = Math.floor(Math.random() * sa[nDificuldade].length);
        // sorteia qual dos elementos da matriz "sa" vai ser utilizado agora
        // para limitar o número de elementos visíveis na cel3x3 de "celatuar"
        for ( let i = 0; i < 9 - (sa[nDificuldade])[num_sort] ; i++ ) {
            while ( true ) {
                n_sort = Math.floor(Math.random() * 9);
                // sorteia qual a posição, dentro de CEL3x3, será apagada
                if ( lista [ (listaCEL3x3[celatuar])[n_sort] ] != 0 ) {
                     lista [ (listaCEL3x3[celatuar])[n_sort] ] = 0;
                     // só tem sentido zerar se ainda tinha número aqui
                    break;
                }
            }
        }
        sa[nDificuldade].splice(num_sort,1);        
        // elimina da lista temporária sa essa opção de números de itens visíveis
        celatuar += 1;
        // ajusta o número da próxima cel3x3 a ajustar
    }

    // atualiza a classe padrao para os inputs
    // atualiza o campo input com os números sorteados
    // ajusta a cor da fonte do campo input (p/permitir input final)
    [...d.getElementsByClassName('cadapos')].forEach( (ele,index,array) => { 
        
        ele.classList.add("cadapos_padrao");
        ele.classList.remove("cadapos_selec");
        
        ele.textContent = lista[index];
        if ( ele.textContent == 0 ) { 
            ele.textContent = " ";
            ele.classList.add("cadapos_flexivel");
            ele.classList.remove("cadapos_fixa");
        } else {
            ele.classList.add("cadapos_fixa");
            ele.classList.remove("cadapos_flexivel");
        }

    });

 }

 // *************************************************************************************** //
