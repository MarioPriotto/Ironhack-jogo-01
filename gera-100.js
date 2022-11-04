class sudoku { 

    constructor (tempototal) {
        this.tempototal = 600;
        this.multiplicadoresPontos = [1,5,10,15,20];
        this.ma = [];
        this.listaExisteLinGr = [ [0,1,2,9,10,11,18,19,20], [3,4,5,12,13,14,21,22,23], [6,7,8,15,16,17,24,25,26],
                       [27,28,29,36,37,38,45,46,47], [30,31,32,39,40,41,48,49,50], [33,34,35,42,43,44,51,52,53],
                       [54,55,56,63,64,65,72,73,74], [57,58,59,66,67,68,75,76,77], [60,61,62,69,70,71,78,79,80] 
                     ];
        this.listaExisteCEL3x3 = [ [0,1,2,3,4,5,6,7,8], [9,10,11,12,13,14,15,16,17], [18,19,20,21,22,23,24,25,26],
                       [27,28,29,30,31,32,33,34,35], [36,37,38,39,40,41,42,43,44], [45,46,47,48,49,50,51,52,53],
                       [54,55,56,57,58,59,60,61,62], [63,64,65,66,67,68,69,70,71], [72,73,74,75,76,77,78,79,80]
                     ];             
        this.listaExisteColGr = [ [0,3,6,27,30,33,54,57,60], [1,4,7,28,31,34,55,58,61], [2,5,8,29,32,35,56,59,62],
                       [9, 12,15,36,39,42,63,66,69], [10,13,16,37,40,43,64,67,70], [11,14,17,38,41,44,65,68,71],
                       [18,21,24,45,48,51,72,75,78], [19,22,25,46,49,52,73,76,79], [20,23,26,47,50,53,74,77,80]
                     ];
        this.tempototal = 600;
        this.tempo = tempototal;
        this.decorrido = 0;
        this.pontos = 0;
    }

    aplicaValorEmCampo (conteudo, destino) {
        if ( this.existeInconsis(parseInt(destino.id),parseInt(conteudo),this.listaExisteLinGr,this.ma)  || 
             this.existeInconsis(parseInt(destino.id),parseInt(conteudo),this.listaExisteCEL3x3,this.ma) ||
             this.existeInconsis(parseInt(destino.id),parseInt(conteudo),this.listaExisteColGr,this.ma) ) {
            beep();
        } else {
            destino.textContent = parseInt(conteudo);
            this.ma[destino.id] = parseInt(conteudo);
            destino.classList.remove('cadapos_selec');
            this.fullFields();
            this.ajustaPrimeiraOpcao();
        }
    }

    ajustaPrimeiraOpcao () {
        let todosOsCampos = [...d.getElementsByClassName('cadapos')];
        todosOsCampos.forEach( 
            ele => ele.classList.remove("cadapos_selec") 
        );
        let primeiroIndiceLivre = todosOsCampos.findIndex( (e,i,a) => 
            e.classList.contains("cadapos_flexivel") && e.textContent == " "
        );
        if ( primeiroIndiceLivre != -1 ) todosOsCampos[primeiroIndiceLivre].classList.add("cadapos_selec");
    }

    fullFields() {
        if ( [...d.getElementsByClassName('cadapos')].findIndex( (e,i,a) => e.textContent === " " ) !== -1 ) 
            return false;
        if ( this.correctionCheck() ) {
            let nDificuldade = [...d.getElementsByClassName('nd')].findIndex( 
                (e,i,a) => e.classList.contains("nsel") 
            );
            let mult = ([1,5,10,15,20])[nDificuldade];
            if ( this.tempo > 0 ) { 
                this.pontos += (this.tempo*mult); 
            } else { 
                this.pontos = 0; 
            }
            d.getElementById("pontosId").textContent = this.pontos;
            this.tempo = this.tempototal;
            this.decorrido = 0;
            mensagemEnfatizada("Parabéns, tudo certo!!!");
            this.geraAleatorios();
            this.removeGerarNivelDificuldade();
            this.atualizaClasseCadaPosicao();
            this.apresentaConsole();
        } else {
            mensagemEnfatizada("Algo de errado não está certo!!! (sic)");
        }
        return true;
    }

    correctionCheck() {
        for ( let x = 0 ; x < 9 ; x++ ) {
            if ( this.listaExisteLinGr[x].reduce(  (pre, curr) => pre + this.ma[curr], 0) != 45 ) return false;
            if ( this.listaExisteColGr[x].reduce(  (pre, curr) => pre + this.ma[curr], 0) != 45 ) return false;
            if ( this.listaExisteCEL3x3[x].reduce( (pre, curr) => pre + this.ma[curr], 0) != 45 ) return false;
        };
        return true;
    }

    apresentaConsole() {
        // console.log("-------------------------------");
        // this.listaExisteLinGr.forEach( (ele,index,array) => {
        //     console.log("| ", this.ma[ele[0]], this.ma[ele[1]], this.ma[ele[2]], " | ", 
        //                     this.ma[ele[3]], this.ma[ele[4]], this.ma[ele[5]], " | ", 
        //                     this.ma[ele[6]], this.ma[ele[7]], this.ma[ele[8]], " |");
        //     if ( index == 2 || index == 5 || index == 8 ) {
        //         console.log("-------------------------------");
        //     }
        // });
    }

    existeInconsis (indice, numero, lista) {
        let qualIndiceNivel1 = lista.findIndex( 
            ele => ele.includes(indice) 
        );
        return lista[qualIndiceNivel1].some( 
            ele => this.ma[ele] == numero 
        );
    }

    geraAleatorios () {
        this.ma.forEach( ele => ele = 0);
        let iteracao = 0, iteracaoMilhao = 0, contador = 0;
        do { 
           iteracaoMilhao = 0;
           while ( true ) {
                for ( let l = 0+contador; l < 9+contador ; l++ ) {
                    iteracao = 0;
                    while (true) {
                        iteracao = iteracao + 1;
                        let num_sort = Math.floor(Math.random() * 9) + 1;
                        if ( iteracao > 100 ) break; 
                        if ( this.existeInconsis(l,num_sort,this.listaExisteLinGr,this.ma) ) continue; 
                        if ( this.existeInconsis(l,num_sort,this.listaExisteCEL3x3,this.ma) ) continue; 
                        if ( this.existeInconsis(l,num_sort,this.listaExisteColGr,this.ma) ) continue; 
                        this.ma[l] = num_sort;
                        break;
                    }
                    if ( iteracao > 100 ) break;
                }
                if ( iteracao > 100 ) {
                    for ( let l = 0+contador; l < 9 + contador ; l++ ) { this.ma[l] = 0; }
                    iteracaoMilhao = iteracaoMilhao + 1;
                    if ( iteracaoMilhao > 5 ) break;
                    continue;
                }
                break;
           }
           if ( iteracaoMilhao > 5 ) { this.ma.map( e => e = 0 );  contador=0; continue; }
           contador = contador + 9;
        }  while ( contador < 81 )    
    }

    removeGerarNivelDificuldade() {
        let sa = [  [9,8,8,7,8,9,8,8,9], [8,7,7,6,7,8,7,7,8], [7,6,6,5,6,7,6,6,7], 
                    [6,5,5,4,5,6,5,5,6], [5,4,4,3,4,5,4,4,5] ];
        let nDificuldade = [...d.getElementsByClassName('nd')].findIndex( (e,i,a) => e.classList.contains("nsel") );
        let celatuar = 0;
        while ( sa[nDificuldade].length > 0) {
            let num_sort = Math.floor(Math.random() * sa[nDificuldade].length);
            for ( let i = 0; i < 9 - (sa[nDificuldade])[num_sort] ; i++ ) {
                while ( true ) {
                    let n_sort = Math.floor(Math.random() * 9);
                    if ( this.ma [ (this.listaExisteCEL3x3[celatuar])[n_sort] ] != 0 ) {
                         this.ma [ (this.listaExisteCEL3x3[celatuar])[n_sort] ] = 0;
                         break;
                    }
                }
            }
            sa[nDificuldade].splice(num_sort,1);        
            celatuar += 1;
        }
    }

    atualizaClasseCadaPosicao () {
        [...d.getElementsByClassName('cadapos')].forEach( 
            (ele,index,array) => { 
                ele.classList.add("cadapos_padrao");
                ele.classList.remove("cadapos_selec");
                ele.textContent = this.ma[index];
                if ( ele.textContent == 0 ) { 
                    ele.textContent = " ";
                    ele.classList.add("cadapos_flexivel");
                    ele.classList.remove("cadapos_fixa");
                } else {
                    ele.classList.add("cadapos_fixa");
                    ele.classList.remove("cadapos_flexivel");
                }
            }
        );
    }

}

// *************************************************************************************** //

var instancia = new sudoku(600);
var d = document; 
var corpo = d.getElementsByClassName("corpo")[0];

instancia.geraAleatorios();

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

d.getElementsByClassName('n1')[0].classList.add("nsel");
instancia.apresentaConsole();
instancia.removeGerarNivelDificuldade();
instancia.atualizaClasseCadaPosicao();

[...d.getElementsByClassName('nd')].forEach( 
    rep => { 
        rep.addEventListener( 
            'click', (event) => { 
                [...d.getElementsByClassName('nd')].forEach( 
                    ele => ele.classList.remove("nsel") 
                );
                event.currentTarget.classList.add("nsel");
                instancia.geraAleatorios();
                instancia.removeGerarNivelDificuldade();
                instancia.atualizaClasseCadaPosicao();
                instancia.apresentaConsole();
                instancia.ajustaPrimeiraOpcao();
            }
        );
    }
);

d.getElementById('njogoId').addEventListener( 
    'click', () => { 
        instancia.geraAleatorios();
        instancia.tempo = instancia.tempototal;
        instancia.decorrido = 0;
        instancia.removeGerarNivelDificuldade();
        instancia.atualizaClasseCadaPosicao();
        instancia.apresentaConsole();
        instancia.ajustaPrimeiraOpcao();
    }
);

[...d.getElementsByClassName('cadapos')].forEach( 
    ele => { 
        ele.addEventListener(
            'click', (event) => {
                if ( event.currentTarget.classList.contains("cadapos_flexivel") ) { 
                    [...d.getElementsByClassName('cadapos')].forEach( 
                        eli => {
                            eli.classList.remove("cadapos_selec");
                            eli.classList.add("cadapos_padrao");
                        }
                    );
                    event.currentTarget.classList.add("cadapos_selec");
                    event.currentTarget.classList.remove("cadapos_padrao");
                }
            }
        );
    }
);

instancia.ajustaPrimeiraOpcao();

[...d.getElementsByClassName('numeroJogar')].forEach( 
    ele => {
        ele.addEventListener( 
            'click', (event) => {
                let fieldDestino = d.getElementsByClassName('cadapos_selec')[0];
                if ( fieldDestino ) { 
                    instancia.aplicaValorEmCampo(event.currentTarget.textContent,fieldDestino); 
                }
            }
        );
    }
);

let intervalId = setInterval( () => {
    if ( instancia.decorrido == instancia.tempototal ) { 
        d.getElementById("tempoId").textContent = "00:00";
        instancia.decorrido += 1;
        mensagemEnfatizada("Você foi derrotado. Pontuação ZERADA!!!");
    }
    if ( instancia.decorrido > instancia.tempototal ) return;
    if ( instancia.decorrido == 0 ) d.getElementById("njogoId").disabled = false;
    instancia.tempo -= 1;
    instancia.decorrido += 1;
    if ( instancia.decorrido == 10 ) d.getElementById("njogoId").disabled = true;
    d.getElementById("tempoId").textContent = 
        ((Math.floor(instancia.tempo / 60)).toString().length == 1 
            ? "0" + (Math.floor(instancia.tempo / 60)).toString() 
            : (Math.floor(instancia.tempo / 60)).toString()
        ) + ":" + 
        ((instancia.tempo % 60).toString().length == 1 
            ? "0" + (instancia.tempo % 60).toString() 
            : (instancia.tempo % 60).toString()
        );
    },1000
);

const switchModal = () => {
    const modal = d.querySelector('.modal');
    const actualStyle = modal.style.display;
    if (actualStyle == 'block' ) {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
    }
}

d.querySelector('.modalBtn').addEventListener('click', switchModal);

window.onclick = function (event) {
     const modal = d.querySelector('.modal');
     if (event.target == modal) switchModal();
};

[...d.getElementsByClassName('fecharModal')].forEach(
    ele => ele.addEventListener(
        'click', () => {
            switchModal();
            beep();
        }
    )
);

switchModal();

window.onkeypress = function (event) {
    //console.log('tecla: ', event.key);
    if ( event.key > 0 && event.key <= 9 ) {
        let fieldDestino = d.getElementsByClassName('cadapos_selec')[0];
        if ( fieldDestino ) {
            instancia.aplicaValorEmCampo(event.key,fieldDestino );
        }
    }
}

// *************************************************************************************** //

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

 function mensagemEnfatizada(msg) { alert(msg); }

 // *************************************************************************************** //
 
 