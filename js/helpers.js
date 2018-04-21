function makeBoard(column) {
    //render of t
    var boardString = '';
    for (let i = 0; i < column; i++) {
         boardString += '<div class="hex-row n' + i + '">';
        for (let j = 0; j < column; j++) {
            boardString += ' <div class="hex"> <div class="top"></div> <div class="middle"></div> <div class="bottom"></div> </div>';
        }
        boardString += '</div>';
    }
    document.getElementsByClassName('board')[0].innerHTML = boardString;
    //evento de click
    const hexagonos = document.getElementsByClassName('hex');
    for (let index = 0; index < hexagonos.length; index++) {
        hexagonos[index].onclick = function () {
            // debugger;
            // var line = index / 8;
            // var column = index % 8;
            // board = markPosition(board,line, column);
            hexagonos[index].className = 'hex selected';
            // if(isInLastStage(hexagonos)) {
            //     alert('você é um ganhador!');
            // }
        };

    }
}
function renderBoard(board) {
    // function to render de array of array witch is de board in de screen
    for (let i = 0; i < 8; i++) {
        document.getElementsByClassName('board')[0].innerHTML += '<div class="linha">';
        for (let j = 0; j < 8; j++) {
            document.getElementsByClassName('board')[0].innerHTML += '<div class="hexagono"></div>';
        }
        document.getElementsByClassName('board')[0].innerHTML += '</div>';
    }
}
function markPosition(board,line, column) {
    const hexagonos = document.getElementsByClassName('hexagono');
    hexagonos[index].className = 'hexagono selected';   
}