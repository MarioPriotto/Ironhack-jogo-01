let ma = [];

let listaExisteLinGr = [ [0,1,2,9,10,11,18,19,20], [3,4,5,12,13,14,21,22,23], [6,7,8,15,16,17,24,25,26],    
               [27,28,29,36,37,38,45,46,47], [30,31,32,39,40,41,48,49,50], [33,34,35,42,43,44,51,52,53],
               [54,55,56,63,64,65,72,73,74], [57,58,59,66,67,68,75,76,77], [60,61,62,69,70,71,78,79,80] 
             ];

let listaExisteCEL3x3 = [ [0,1,2,3,4,5,6,7,8], [9,10,11,12,13,14,15,16,17], [18,19,20,21,22,23,24,25,26], 
               [27,28,29,30,31,32,33,34,35], [36,37,38,39,40,41,42,43,44], [45,46,47,48,49,50,51,52,53], 
               [54,55,56,57,58,59,60,61,62], [63,64,65,66,67,68,69,70,71], [72,73,74,75,76,77,78,79,80] 
             ];             

let listaExisteColGr = [ [0,3,6,27,30,33,54,57,60], [1,4,7,28,31,34,55,58,61], [2,5,8,29,32,35,56,59,62],
               [9, 12,15,36,39,42,63,66,69], [10,13,16,37,40,43,64,67,70], [11,14,17,38,41,44,65,68,71],
               [18,21,24,45,48,51,72,75,78], [19,22,25,46,49,52,73,76,79], [20,23,26,47,50,53,74,77,80]
             ];


// gera na lista "ma" números aleatórios consistentes com uma jogada
geraAleatorios(ma);

var d = document; 
let todas = d.getElementsByClassName("todas")[0];

// cria o HTML (no DOM) que apresenta os números do jogo
let contador = 0;
for (let i=0;i<3;i++) {
    todas.appendChild(d.createElement("div")).classList.add("linha"+i);
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
                // e.textContent = "-" + ma[contador];
                //e.textContent = ma[contador];
                contador += 1;
            }
        }
    }
}
d.getElementsByClassName('n1')[0].classList.add("nsel");

apresentaConsole(listaExisteLinGr,ma);
atualizaReferencias(ma,listaExisteCEL3x3);

// adiciona evento a cada um dos botões que ajustam o nível de dificuldade
for ( let i=1;i<6;i++) {
    d.getElementsByClassName('n'+i)[0].addEventListener( 'click', () => {
        [...d.getElementsByClassName('nd')].forEach( e => e.classList.remove("nsel") );
        d.getElementsByClassName('n'+i)[0].classList.add("nsel");
        geraAleatorios(ma);
        atualizaReferencias(ma,listaExisteCEL3x3);
        apresentaConsole(listaExisteLinGr,ma);
    });
}

// adiciona evento ao botão de NOVA JOGADA
d.getElementsByClassName('njogo')[0].addEventListener( 'click', () => { 
    geraAleatorios(ma);
    atualizaReferencias(ma,listaExisteCEL3x3);
    apresentaConsole(listaExisteLinGr,ma);
});

for (let i=0;i<3;i++) {
    for ( let x=0;x<3;x++) {
        for ( let k=0;k<3;k++) {
            for ( let j=0;j<3;j++) {
                let de = d.getElementsByClassName("linha"+i+"cel"+x+"lc"+k+"in"+j)[0];
                de.addEventListener( 'click', (event) => {
                    if ( de.textContent == " " ) { 

                        event.target.style.border = "1px solid red";
                        console.log("passou-0");
                    }
                });
                // de.addEventListener( 'mouseover', (event) => {
                //     if ( de.textContent == " " ) { 
                //         event.target.style.background = "rgba(88, 179, 195, 0.947)";
                //         console.log("passou-9");
                //     }
                // });
                // de.addEventListener( 'mouseout', (event) => {
                //     event.target.style.background = "aliceblue";
                //     console.log("passou-retirada");
                // });
            }
        }
    }
}

//d.getElementById('idtodas').addEventListener( 'keypress', function () {
//d.getElementById('idtodas').addEventListener("keypress",processar,true);

// *******************************************************************

function apresentaConsole(lista,matriz) {
    let l = 0;
    console.log("-------------------------------");
    lista.forEach( e => {
        l += 1;
        console.log("| ", matriz[e[0]], matriz[e[1]], matriz[e[2]], " | ", matriz[e[3]], matriz[e[4]], matriz[e[5]], " | ", matriz[e[6]], matriz[e[7]], matriz[e[8]], " |");
        if ( l == 3 || l == 6 || l == 9 ) {
            console.log("-------------------------------");
        }
    });
}

function existeInconsis (indice, numero, lista, listaMatriz) {
    for ( let i = 0; i < lista.length; i++ ) {
        if ( lista[i].includes(indice) ) {
            for ( let x = 0; x < 9; x++) {
                if ( listaMatriz[ ((lista[i])[x]) ] == numero ) return true;
            }
           return false;
        }
    }
    return null;
 }

 function geraAleatorios (lista) {
    //console.log("pegar-x1: ", lista[80]);
    for (let i = 0; i < 81; i++) lista[i] = 0;
    //console.log("pegar-x2: ", lista[80]);
    //atualizaReferencias();
    let iteracao = 0;
    let iteracaoMilhao = 0;
    let contador = 0;    
    do {
        iteracaoMilhao = 0;
        while ( true ) {
            for ( let l = 0+contador; l < 9+contador ; l++ ) {  
                iteracao = 0;
                while (true) {
                    iteracao = iteracao + 1;
                    num_sort = Math.floor(Math.random() * 9) + 1;
                    if ( iteracao > 100 ) break;
                    if ( existeInconsis(l,num_sort,listaExisteLinGr,lista)  == true ) continue;
                    if ( existeInconsis(l,num_sort,listaExisteCEL3x3,lista) == true ) continue;
                    if ( existeInconsis(l,num_sort,listaExisteColGr,lista)  == true ) continue;
                    // console.log("sorteio: ",num_sort, " - acumulado: ", lista[l]);
                    lista[l] = num_sort;
                    //console.log("sorteio: ",num_sort, " - acumulado: ", lista[l]);
                    break;
                }
                if ( iteracao > 100 ) break;
            }
            if ( iteracao > 100 ) {
                for ( let l = 0+contador; l < 9 + contador ; l++ ) { lista[l] = 0; }
                iteracaoMilhao = iteracaoMilhao + 1;
                if ( iteracaoMilhao > 5 ) break;
                continue;
            }
            break;
        }
        //console.log(contador, " : ", iteracao, contador);
        if ( iteracaoMilhao > 5 ) { lista.map( e => e = 0 );  contador=0; continue; }
        contador = contador + 9;
    }  while ( contador < 82 )    
 }

 function atualizaReferencias(lista,listaCEL3x3) {
    let d = document; 

    let sa = [5,4,1,3,4,3,1,4,5];

    let celatuar = 0;
    while ( sa.length > 0) {
        num_sort = Math.floor(Math.random() * sa.length);
        console.log(sa, num_sort, sa[num_sort], sa.length);
        for ( let i = 0; i < 9 - sa[num_sort] ; i++ ) {
            while ( true ) {
                n_sort = Math.floor(Math.random() * 9);
                console.log(celatuar, listaCEL3x3[celatuar], );
                if ( lista [ (listaCEL3x3[celatuar])[n_sort] ] != 0 ) {
                     lista [ (listaCEL3x3[celatuar])[n_sort] ] = 0;
                    break;
                }
            }
        }
        sa.splice(num_sort,1);        
        celatuar += 1;
    }

    let contador = 0;
    for (let i=0;i<3;i++) {
        for ( let x=0;x<3;x++) {
            for ( let k=0;k<3;k++) {
                for ( let j=0;j<3;j++) {
                    let e = d.getElementsByClassName("linha"+i+"cel"+x+"lc"+k+"in"+j)[0];
                    e.textContent = lista[contador];
                    if ( e.textContent == 0 ) { 
                        e.textContent = " ";
                    } else {
                        e.style.color = "red";
                    }
                    contador += 1;
                }
            }
        }
    }

 }

