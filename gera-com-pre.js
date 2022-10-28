
let ma = [];  
for (let a=0;a<81;a++) ma[a] = 0;

let cgeral = 0;
let sa = [5,4,1,3,4,3,1,4,5];

let linhas = [  [0,1,2,9,10,11,18,19,20],     
                [3,4,5,12,13,14,21,22,23], 
                [6,7,8,15,16,17,24,25,26],    
                [27,28,29,36,37,38,45,46,47],
                [30,31,32,39,40,41,48,49,50], 
                [33,34,35,42,43,44,51,52,53],
                [54,55,56,63,64,65,72,73,74], 
                [57,58,59,66,67,68,75,76,77],
                [60,61,62,69,70,71,78,79,80] ];

for ( let l = 0; l < 3 ; l++ ) { // qual casa 3x3 vamos preencher
    for ( let c = 0; c < 3 ; c++ ) { // qual casa 3x3 vamos preencher

        nalet = Math.floor(Math.random() * sa.length ); // de qual indice de sa é o número de itens que vamos por nessa casa 3x3
        //console.log(sa, nalet, sa[nalet]);
        colocados = 0;
        while ( colocados < sa[nalet] ) {
            
            num_sort = Math.floor(Math.random() * 9) + 1;
            sli_sort = Math.floor(Math.random() * 3);
            sco_sort = Math.floor(Math.random() * 3);

            indice = ( l * 27) + ( c * 9 ) + ( sli_sort * 3 ) + ( sco_sort );
            
            // não aceita esta posição se ali já existir um número
            if ( ma[indice] > 0 ) continue;

            // não repetir dentro de uma das 9 celulas globais LC
            let lc = ( l * 27) + ( c * 9 );
            let novo = true;
            for ( prlc = lc; prlc < lc + 9; prlc++ ) {
                if ( ma[prlc] == num_sort ) novo = false;
            }
            if ( novo == false ) continue;

            // não repetir dentro da mesma linha maior
            let lbusco = [];
            let colEncontrada = -1;
            for ( let b = 0; b < 9; b++ ) {
                if ( linhas[b].includes(indice) == true ) {
                    lbusco = linhas[b];
                    colEncontrada = lbusco.indexOf(indice);
                    break;
                }
            }
            let existeLinha = false;
            for (let b = 0; b < 9; b++ ) {
                if ( ma[lbusco[b]] == num_sort ) { 
                    existeLinha = true; 
                    //colEncontrada = b;
                    break; 
                }
            }
            if ( existeLinha == true ) continue;

            // não repetir dentro da mesma coluna maior
            let existeNaColuna = false;
            for (let b = 0; b < 9; b++ ) {
                let mtesta = linhas[b];
                if ( ma[mtesta[colEncontrada]] == num_sort ) { 
                    existeNaColuna = true; 
                    break; 
                }
            }
            if ( existeNaColuna == true ) continue;

            colocados = colocados + 1;
            cgeral += 1;
            //console.log(cgeral," l:",l," c:",c," - F:",colocados," ns::",num_sort," ls:",sli_sort," cs:",sco_sort," .:",sa[nalet]," -->",sa);
            //console.log(sa.length, nalet);
            ma[indice] = num_sort;

        }
        sa.splice(nalet,1);
    }        
}

console.log("====================================");

let cg = 0;
let cgm0 = 0;
for ( let l = 0; l < 3 ; l++ ) { // qual casa 3x3 vamos preencher
    for ( let c = 0; c < 3 ; c++ ) { // qual casa 3x3 vamos preencher
        for ( let k = 0; k < 3 ; k++ ) { // qual casa 3x3 vamos preencher
            for ( let m = 0; m < 3 ; m++ ) { // qual casa 3x3 vamos preencher
                indice = ( l * 27) + ( c * 9 ) + ( k * 3 ) + ( m );
                if ( ma[indice] > 0 ) {
                    cgm0 = cgm0 + 1;
                    //console.log(cg,cgm0,indice,ma[indice]);
                }
                cg = cg + 1;
            }
        }
    }
}

console.log("================================");

console.log("celula 3x3 - 01 - ",ma[0],   ma[1],   ma[2],   ma[3],   ma[4],   ma[5],   ma[6],   ma[7],   ma[8]);
console.log("celula 3x3 - 02 - ",ma[0+9], ma[1+9], ma[2+9], ma[3+9], ma[4+9], ma[5+9], ma[6+9], ma[7+9], ma[8+9]);
console.log("celula 3x3 - 03 - ",ma[0+18],ma[1+18],ma[2+18],ma[3+18],ma[4+18],ma[5+18],ma[6+18],ma[7+18],ma[8+18]);

console.log("celula 3x3 - 04 - ",ma[0+27],ma[1+27],ma[2+27],ma[3+27],ma[4+27],ma[5+27],ma[6+27],ma[7+27],ma[8+27]);
console.log("celula 3x3 - 05 - ",ma[0+36],ma[1+36],ma[2+36],ma[3+36],ma[4+36],ma[5+36],ma[6+36],ma[7+36],ma[8+36]);
console.log("celula 3x3 - 06 - ",ma[0+45],ma[1+45],ma[2+45],ma[3+45],ma[4+45],ma[5+45],ma[6+45],ma[7+45],ma[8+45]);

console.log("celula 3x3 - 07 - ",ma[0+54],ma[1+54],ma[2+54],ma[3+54],ma[4+54],ma[5+54],ma[6+54],ma[7+54],ma[8+54]);
console.log("celula 3x3 - 08 - ",ma[0+63],ma[1+63],ma[2+63],ma[3+63],ma[4+63],ma[5+63],ma[6+63],ma[7+63],ma[8+63]);
console.log("celula 3x3 - 09 - ",ma[0+72],ma[1+72],ma[2+72],ma[3+72],ma[4+72],ma[5+72],ma[6+72],ma[7+72],ma[8+72]);

console.log("================================");

linhas.forEach( e => {
    console.log("Linha Gr: ", ma[e[0]], ma[e[1]], ma[e[2]], ma[e[3]], ma[e[4]], ma[e[5]], ma[e[6]], ma[e[7]], ma[e[8]]);
} );

console.log("================================");

let p = 0;
for ( let i = 0; i < 9 ; i++ ) {
    console.log("Coluna Gr: ",  ma[(linhas[0])[i]], ma[(linhas[1])[i]], ma[(linhas[2])[i]], ma[(linhas[3])[i]], ma[(linhas[4])[i]], 
                                ma[(linhas[5])[i]], ma[(linhas[6])[i]], ma[(linhas[7])[i]], ma[(linhas[8])[i]] );
}

console.log("================================");

for ( let i = 0; i < 81; i++ ) {
    console.log("testando ações para SEQ: " + i + " : " + ( ma[i] == 0 ? "-" : ma[i] ) );
    if ( ma[i] != 0 ) continue;
    let iteracao = 0;
    while (true) {
        num_sort = Math.floor(Math.random() * 9) + 1;
        iteracao = iteracao + 1;

        if ( existeLinGr(i,num_sort)  == true ) continue;
        console.log("T: LGR: ", iteracao, i, num_sort);

        if ( existeCEL3x3(i,num_sort) == true ) continue;
        console.log("T: C33: ", iteracao, i, num_sort);


        //if ( existeColGr(i,num_sort)  == true ) continue;

        ma[i] = num_sort;
        break;
    }
}

function existeLinGr (indice, numero) {
    liscel = [ [0,1,2,9,10,11,18,19,20], [3,4,5,12,13,14,21,22,23], [6,7,8,15,16,17,24,25,26],    
             [27,28,29,36,37,38,45,46,47], [30,31,32,39,40,41,48,49,50], [33,34,35,42,43,44,51,52,53],
             [54,55,56,63,64,65,72,73,74], [57,58,59,66,67,68,75,76,77], [60,61,62,69,70,71,78,79,80] 
            ];
    for ( let i = 0; i < liscel.length; i++ ) {
        if ( liscel[i].includes(indice) ) {
            for ( let x = 0; x < 9; x++) {
                if ( ma[ ((liscel[i])[x]) ] == numero ) return true;                
            }
            return false;
        }
    }
    return null;
 }

 function existeCEL3x3 (indice, numero) {
    liscel = [ [0,1,2,3,4,5,6,7,8], [9,10,11,12,13,14,15,16,17], [18,19,20,21,22,23,24,25,26], 
               [27,28,29,30,31,32,33,34,35], [36,37,38,39,40,41,42,43,44], [45,46,47,48,49,50,51,52,53], 
               [54,55,56,57,58,59,60,61,62], [63,64,65,66,67,68,69,70,71], [72,73,74,75,76,77,78,79,80] 
             ];
    for ( let i = 0; i < liscel.length; i++ ) {
        if ( liscel[i].includes(indice) ) {
            for ( let x = 0; x < 9; x++) {
                if ( ma[ ((liscel[i])[x]) ] == numero ) return true;                
            }
            return false;
        }
    }
    return null;
 }
 
console.log("================================");


