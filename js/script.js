function playerMove(board, line, column, modo) {
    if (board[line][column] === 0) {
        markPosition(board, line, column);
        if (gameOver(board)) {
            document.getElementsByName('reiniciar')[0].className = 'show';
            document.getElementsByName('parar')[0].className = 'hide';
            document.getElementsByName('comecar')[0].className = 'hide';
            alert('Você ganhou!');
        } else {
            setTimeout(() => {
                if (modo === 0) {
                    randomMove(board);
                } else if (modo === 1) {
                    aiMoveLargura(board);
                } else if (modo === 2) {
                    aiMinimax(board, -1);
                }
            }, 500);
        }
    }
}

function gameOver(board, player = 1) {
    let aux = [board.length, board.length];
    let corte = new Array(aux);
    for (let i = board.length - 1; i >= 0; i--) {
        if (((board[board.length - 1][i] == player) && (buscaProfundidade(board.length - 1, i, board, player, corte, false))) || ((board[i][board.length - 1] == player) && (buscaProfundidade(i, board.length - 1, board, player, corte, true)))) {
            return true;
        }
    }
    return false;
}

function modoIaVsIa() {
    let fimJogo = false;
    let contador = 0;
    while (!fimJogo) {
        alert("proxima jogada Minimax");
        aiMinimax(board, -1);
        if (gameOver(board, -1)) {
            fimJogo = true
            alert("A IA com MiniMax ganhou")
        } else {
            alert("proxima jogada BuscaLargura")
            aiMoveLargura(board);
        }
        if (gameOver(board, 1)) {
            fimJogo = true
            alert("A IA com busca na largura ganhou")
        }
        contador++
        alert("proxima rodada")
    }
}