let ma = [];

// existeLinGr (indice, numero) {
let listaExisteLinGr = [ [0,1,2,9,10,11,18,19,20], [3,4,5,12,13,14,21,22,23], [6,7,8,15,16,17,24,25,26],    
               [27,28,29,36,37,38,45,46,47], [30,31,32,39,40,41,48,49,50], [33,34,35,42,43,44,51,52,53],
               [54,55,56,63,64,65,72,73,74], [57,58,59,66,67,68,75,76,77], [60,61,62,69,70,71,78,79,80] 
             ];

// existeCEL3x3 (indice, numero) {
let listaExisteCEL3x3 = [ [0,1,2,3,4,5,6,7,8], [9,10,11,12,13,14,15,16,17], [18,19,20,21,22,23,24,25,26], 
               [27,28,29,30,31,32,33,34,35], [36,37,38,39,40,41,42,43,44], [45,46,47,48,49,50,51,52,53], 
               [54,55,56,57,58,59,60,61,62], [63,64,65,66,67,68,69,70,71], [72,73,74,75,76,77,78,79,80] 
             ];             

// function existeColGr (indice, numero) {
let listaExisteColGr = [ [0,3,6,27,30,33,54,57,60], [1,4,7,28,31,34,55,58,61], [2,5,8,29,32,35,56,59,62],
               [9, 12,15,36,39,42,63,66,69], [10,13,16,37,40,43,64,67,70], [11,14,17,38,41,44,65,68,71],
               [18,21,24,45,48,51,72,75,78], [19,22,25,46,49,52,73,76,79], [20,23,26,47,50,53,74,77,80]
             ];

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
                if ( existeInconsis(l,num_sort,listaExisteLinGr)  == true ) continue;
                if ( existeInconsis(l,num_sort,listaExisteCEL3x3) == true ) continue;
                if ( existeInconsis(l,num_sort,listaExisteColGr)  == true ) continue;
                ma[l] = num_sort;
                break;
            }
            if ( iteracao > 100 ) break;
        }
        if ( iteracao > 100 ) {
            for ( let l = 0+contador; l < 9 + contador ; l++ ) { ma[l] = 0; }
            iteracaoMilhao = iteracaoMilhao + 1;
            if ( iteracaoMilhao > 5 ) break;
            continue;
        }
        break;
    }
    console.log(contador, " : ", iteracao, contador);
    if ( iteracaoMilhao > 5 ) { ma.map( e => e = 0 );  contador=0; continue; }
    contador = contador + 9;
}  while ( contador < 82 )

let d = document; 

//d.getElementsByTagName("body")[0].appendChild(d.createElement("div")).classList.add("todas");
todas = d.getElementsByClassName("todas")[0];

// todas.appendChild(document.createElement("div")).classList.add("linf");
// linTitulo = document.getElementsByClassName("linf")[0];
// linTitulo.appendChild(document.createElement("button")).classList.add("button01");

contador = 0;
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
                e.textContent = ma[contador];
                contador += 1;
            }
        }
    }
}

let l = 0;
console.log("-------------------------------");
listaExisteLinGr.forEach( e => {
    l += 1;
    console.log("| ", ma[e[0]], ma[e[1]], ma[e[2]], " | ", ma[e[3]], ma[e[4]], ma[e[5]], " | ", ma[e[6]], ma[e[7]], ma[e[8]], " |");
    if ( l == 3 || l == 6 || l == 9 ) {
        console.log("-------------------------------");
    }
});

 function existeInconsis (indice, numero, lista) {
    for ( let i = 0; i < lista.length; i++ ) {
        if ( lista[i].includes(indice) ) {
            for ( let x = 0; x < 9; x++) {
                if ( ma[ ((lista[i])[x]) ] == numero ) return true;
            }
           return false;
        }
    }
    return null;
 }