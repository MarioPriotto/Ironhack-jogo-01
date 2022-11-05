// Boas práticas / reavaliar:

// -padronizar os parâmetros das arrow functions (colocar todos ou somente os necessários)
// -ordenar os métodos conforme a lógica sequencial de uso
// -comentar o código
// -tentar optar pelo uso exclusivo de arrow function em detrimento a funções anônimas
// -repensar funções como variáveis (usar em todas ou não usar)

// -utilizar as classes e constituir múltiplas telas simultâneas.

class sudoku { 

    constructor (timeTotal) {
        this.timeTotal = timeTotal;
        this.lArrayField = [];
        this.timeRest = timeTotal;
        this.timeElapsed = 0;
        this.score = 0;
    }

    updateValueField (contentField, elementoTarget) {
        const key = elementoTarget.getAttribute("sequential");
        if ( contentField.toUpperCase() === "X" ) {
             elementoTarget.textContent = " ";
             this.lArrayField[key] = 0;
             return;
        }
        if ( this.numberAlreadyExists(parseInt(key),parseInt(contentField),lArrayLinGr,this.lArrayField)  || 
             this.numberAlreadyExists(parseInt(key),parseInt(contentField),lArrayCEL3x3,this.lArrayField) ||
             this.numberAlreadyExists(parseInt(key),parseInt(contentField),lArrayColGr,this.lArrayField) ) {
             beep();
        } else {
             elementoTarget.textContent = parseInt(contentField);
             this.lArrayField[key] = parseInt(contentField);
             elementoTarget.classList.remove('cadapos_selec');
             this.fullFields();
             this.checkFirstOption();
        }
    }

    checkFirstOption () {
        const allFieldContents = [...d.getElementsByClassName('cadapos')];
        allFieldContents.forEach( 
            ele => ele.classList.remove("cadapos_selec") 
        );
        const FirstFree = allFieldContents.findIndex( (e,i,a) => 
            e.classList.contains("cadapos_flexivel") && e.textContent === " "
        );
        if ( FirstFree != -1 ) allFieldContents[FirstFree].classList.add("cadapos_selec");
    }

    fullFields() {
        if ( [...d.getElementsByClassName('cadapos')].findIndex( (e,i,a) => e.textContent === " " ) !== -1 )
            return false;
        if ( this.correctionCheck() ) {
            const mult = lArrayScoreMultiplier[levelChallenge()];
            if ( this.timeRest > 0 ) { 
                this.score += (this.timeRest*mult); 
            } else { 
                this.score = 0; 
            }
            d.getElementById("pontosId").textContent = this.score;
            this.timeRest = this.timeTotal;
            this.timeElapsed = 0;
            showMessage("Parabéns, tudo certo!!!");
            this.generatorsRandom();
            this.clearNumbersForHard();
            this.updateClassesPositions();
        } else {
            showMessage("Algo de errado não está certo!!! (sic)");
        }
        return true;
    }

    correctionCheck() {
        for ( let x = 0 ; x < 9 ; x++ ) {
            if ( lArrayLinGr[x].reduce(  (pre, curr) => pre + this.lArrayField[curr], 0) != 45 ) 
                return false;
            if ( lArrayColGr[x].reduce(  (pre, curr) => pre + this.lArrayField[curr], 0) != 45 ) 
                return false;
            if ( lArrayCEL3x3[x].reduce( (pre, curr) => pre + this.lArrayField[curr], 0) != 45 ) 
                return false;
        };
        return true;
    }

    numberAlreadyExists (indice, numero, lista) {
        const whatKeyLevelOne = lista.findIndex( 
            ele => ele.includes(indice) 
        );
        return lista[whatKeyLevelOne].some( 
            ele => this.lArrayField[ele] === numero 
        );
    }

    generatorsRandom () {
        this.lArrayField.forEach( ele => ele = 0);
        let iteration = 0, iterationMultiple = 0, contSequential = 0;
        do { 
           iterationMultiple = 0;
           while ( true ) {
                for ( let l = contSequential; l < 9+contSequential ; l++ ) {
                    iteration = 0;
                    while (true) {
                        iteration += 1;
                        const num_sort = Math.floor(Math.random() * 9) + 1;
                        if ( iteration > 100 ) break; 
                        if ( this.numberAlreadyExists(l,num_sort,lArrayLinGr,this.lArrayField) ) continue; 
                        if ( this.numberAlreadyExists(l,num_sort,lArrayCEL3x3,this.lArrayField) ) continue; 
                        if ( this.numberAlreadyExists(l,num_sort,lArrayColGr,this.lArrayField) ) continue; 
                        this.lArrayField[l] = num_sort;
                        break;
                    }
                    if ( iteration > 100 ) break;
                }
                if ( iteration > 100 ) {
                    for ( let l = contSequential; l < 9 + contSequential ; l++ ) this.lArrayField[l] = 0;
                    iterationMultiple += 1;
                    if ( iterationMultiple > 5 ) break;
                    continue;
                }
                break;
           }
           if ( iterationMultiple > 5 ) { this.lArrayField.map( e => e = 0 );  contSequential=0; continue; }
           contSequential += 9;
        }  while ( contSequential < 81 )
    }

    clearNumbersForHard() {
        // o "let" abaixo é obrigatório para deixar a matriz no contexto deste método.
        let lWorkArrayOffersNumbers = [...lArrayOffersNumbers[levelChallenge()]];
        let cellApplication = 0;
        while ( lWorkArrayOffersNumbers.length > 0) {
            const num_sort = Math.floor(Math.random() * lWorkArrayOffersNumbers.length);            
            for ( let i = 0; i < 9 - lWorkArrayOffersNumbers[num_sort] ; i++ ) {
                while ( true ) {
                    const n_sort = Math.floor(Math.random() * 9);
                    if ( this.lArrayField [ (lArrayCEL3x3[cellApplication])[n_sort] ] !== 0 ) {
                         this.lArrayField [ (lArrayCEL3x3[cellApplication])[n_sort] ] = 0;
                         break;
                    }
                }
            }
            lWorkArrayOffersNumbers.splice(num_sort,1);        
            cellApplication += 1;
        }
    }

    updateClassesPositions () {
        [...d.getElementsByClassName('cadapos')].forEach( 
            (ele,index,array) => { 
                ele.classList.add("cadapos_padrao");
                ele.classList.remove("cadapos_selec");
                ele.textContent = this.lArrayField[index];
                if ( parseInt(ele.textContent) === 0 ) { 
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

    timeText() {
        let timeMin = (Math.floor(this.timeRest / 60)).toString();
        if ( timeMin.length === 1 ) timeMin = "0" + timeMin;
        let timeSec = (this.timeRest % 60).toString();
        if ( timeSec.length === 1 ) timeSec = "0" + timeSec;
        return timeMin + ":" + timeSec;
    }    

}

// *************************************************************************************** //

var lArrayScoreMultiplier = [1,5,10,15,20];
var lArrayOffersNumbers =   [ [9,8,8,7,8,9,8,8,9], [8,7,7,6,7,8,7,7,8], [7,6,6,5,6,7,6,6,7], 
                              [6,5,5,4,5,6,5,5,6], [5,4,4,3,4,5,4,4,5] 
                            ];
var lArrayLinGr = [ [0,1,2,9,10,11,18,19,20], [3,4,5,12,13,14,21,22,23], [6,7,8,15,16,17,24,25,26],
                    [27,28,29,36,37,38,45,46,47], [30,31,32,39,40,41,48,49,50], [33,34,35,42,43,44,51,52,53],
                    [54,55,56,63,64,65,72,73,74], [57,58,59,66,67,68,75,76,77], [60,61,62,69,70,71,78,79,80] 
                  ];
var lArrayCEL3x3 = [ [0,1,2,3,4,5,6,7,8], [9,10,11,12,13,14,15,16,17], [18,19,20,21,22,23,24,25,26],
                     [27,28,29,30,31,32,33,34,35], [36,37,38,39,40,41,42,43,44], [45,46,47,48,49,50,51,52,53],
                     [54,55,56,57,58,59,60,61,62], [63,64,65,66,67,68,69,70,71], [72,73,74,75,76,77,78,79,80]
                   ];             
var lArrayColGr = [ [0,3,6,27,30,33,54,57,60], [1,4,7,28,31,34,55,58,61], [2,5,8,29,32,35,56,59,62],
                    [9, 12,15,36,39,42,63,66,69], [10,13,16,37,40,43,64,67,70], [11,14,17,38,41,44,65,68,71],
                    [18,21,24,45,48,51,72,75,78], [19,22,25,46,49,52,73,76,79], [20,23,26,47,50,53,74,77,80]
                  ];

var d = document; 
var corpo = d.getElementsByClassName("corpo")[0];

var inst = new sudoku(600);
inst.generatorsRandom();

let contSequential = 0;
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
                const ele = d.getElementsByClassName("linha"+i+"cel"+x+"lc"+k+"in"+j)[0];
                ele.classList.add("cadapos");
                ele.setAttribute("sequential", contSequential);
                contSequential += 1;
            }
        }
    }
}

([...d.getElementsByClassName('nd')])[0].classList.add("nsel");

inst.clearNumbersForHard();
inst.updateClassesPositions();

[...d.getElementsByClassName('nd')].forEach( 
    rep => { 
        rep.addEventListener( 
            'click', (event) => { 
                [...d.getElementsByClassName('nd')].forEach( 
                    ele => ele.classList.remove("nsel") 
                );
                event.currentTarget.classList.add("nsel");
                inst.generatorsRandom();
                inst.clearNumbersForHard();
                inst.updateClassesPositions();
                inst.checkFirstOption();
                if ( inst.timeElapsed <= 10 ) {
                    inst.timeRest = inst.timeTotal;
                    inst.timeElapsed = 0;
                }
            }
        );
    }
);

d.getElementById('njogoId').addEventListener( 
    'click', () => { 
        inst.generatorsRandom();
        inst.timeRest = inst.timeTotal;
        inst.timeElapsed = 0;
        inst.clearNumbersForHard();
        inst.updateClassesPositions();
        inst.checkFirstOption();
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

inst.checkFirstOption();

[...d.getElementsByClassName('numeroJogar')].forEach( 
    ele => {
        ele.addEventListener( 
            'click', (event) => {
                const FieldTarget = 
                    [...d.getElementsByClassName('cadapos')].find( (e,i,a) => e.classList.contains("cadapos_selec") );
                if ( FieldTarget ) { 
                    inst.updateValueField(event.currentTarget.textContent,FieldTarget); 
                }
            }
        );
    }
);

let intervalId = setInterval( () => {
    if ( inst.timeElapsed >= inst.timeTotal ) { 
        if ( d.getElementById("tempoId").textContent === "00:00" ) return;
        d.getElementById("tempoId").textContent = "00:00";
        inst.timeElapsed = 0;
        showMessage("Você foi derrotado. Pontuação ZERADA!!!");
    }
    if ( inst.timeElapsed >= 0 && inst.timeElapsed <= 10 && d.getElementById("njogoId").disabled === true )
        d.getElementById("njogoId").disabled = false;
    inst.timeRest -= 1;
    inst.timeElapsed += 1;
    if ( inst.timeElapsed >= 10 && d.getElementById("njogoId").disabled == false ) 
        d.getElementById("njogoId").disabled = true;
    d.getElementById("tempoId").textContent = inst.timeText();
    },1000
);

const switchModal = () => {
    const modal = d.querySelector('.modal');
    if ( modal.classList.contains('modal_display_block') ) {
         modal.classList.add("modal_display_none");
         modal.classList.remove("modal_display_block");
    } else {
         modal.classList.add("modal_display_block");
         modal.classList.remove("modal_display_none");
    }
}

d.querySelector('.modalBtn').addEventListener('click', switchModal);

window.onclick = function (event) {
     const modal = d.querySelector('.modal');
     if (event.target === modal) switchModal();
};
// sem o ponto e vírgula acima, final da linha, o próximo comando [...d gera um erro.

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
    if ( (event.key > 0 && event.key <= 9) || event.key.toUpperCase() === "X" ) {
        const FieldTarget = 
            [...d.getElementsByClassName('cadapos')].find((e,i,a) => e.classList.contains("cadapos_selec"));
        if ( FieldTarget ) {
            inst.updateValueField(event.key,FieldTarget );
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
    setTimeout(function () {
        oscillator.stop();
        }, 50
    );
 }

 // *************************************************************************************** //

 function showMessage(msg) { alert(msg); }

 // *************************************************************************************** //
 
 function levelChallenge() {
    return [...d.getElementsByClassName('nd')].findIndex( (e,i,a) => e.classList.contains("nsel") );
}            

 // *************************************************************************************** //
