function makeBoard(size, modo) {
    //render of t
    let board = new Array();
    let boardString = '';
    for (let i = 0; i < size; i++) {
        board[i] = new Array();
        boardString += `<div class="hex-row n${i}">`;
        for (let j = 0; j < size; j++) {
            board[i][j] = 0;
            boardString += ' <div class="hex"> <div class="top"></div> <div class="middle"></div> <div class="bottom"></div> </div>';
        }
        boardString += '</div>';
    }
    document.getElementsByClassName('board')[0].innerHTML = boardString;
    //action of the event of click
    if (modo === 0 || modo === 1 || modo === 2) {
        let hexagonos = document.getElementsByClassName('hex');
        for (let index = 0; index < hexagonos.length; index++) {
            hexagonos[index].onclick = () => {
                const column = index % size;
                const line = (index - column) / board[0].length;
                playerMove(board, line, column, modo);
            };

        }
    } else if (modo === 3) {
        let fimJogo = false;
        let contador = 0;
        while (!fimJogo) {
            alert("proxima jogada Minimax")
            //aiMove(board);
            aiMinimax(board, -1);
            debugger;
            //alert("calcula")
            //		calculaPontos(board, -1)
            if (gameOver(board, -1)) {
                fimJogo = true
                alert("A IA com MiniMax ganhou")
            } else {
                alert("proxima jogada BuscaLargura")
                aiMoveLargura(board);
                //		calculaPontos(board)
            }
            if (gameOver(board, 1)) {
                fimJogo = true
                alert("A IA com busca na largura ganhou")
            }
            contador++
            alert("proxima rodada")
        }
    }
}


function markPosition(board, line, column, player = null) {
    player = player && `${ player }-` || '';
    const positionValue = player === "ai-" ? -1 : 1;
    const hexagonos = document.getElementsByClassName('hex');
    board[line][column] = positionValue;
    hexagonos[(line * board.length) + column].className = `hex ${ player }selected`;
}