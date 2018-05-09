function playerMove(board, line, column, modo) {
    if (board[line][column] === 0) {
        markPosition(board, line, column);
        if (gameOver(board)) {
            resetButtons();
            alert('Você ganhou!');
        } else {
            setTimeout(() => {
                if (modo === 0) {
                    randomMove(board);
                    resp = 'O modo aleatório ganhou!';
                } else if (modo === 1) {
                    aiCutOff(board, -1);
                    resp = 'A IA com CutOff ganhou!';
                } else if (modo === 2) {
                    aiMinimax(board, -1);
                    resp = 'A IA com minimax ganhou!';
                }

                if (gameOver(board, -1)) {
                    resetButtons();
                    alert(resp);
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

function modoIaVsIa(board) {
    var fimJogo = false
    let contador = 0
    while (!fimJogo) {
        alert("proxima jogada CutOff")
        aiCutOff(board, -1)
        if (gameOver(board, -1)) {
            fimJogo = true
            resetButtons()
            alert("A IA com CutOff ganhou!")
        } else {
            alert("proxima jogada MiniMax")
            aiMinimax(board, 1)
        }
        if (gameOver(board, 1)) {
            fimJogo = true
            resetButtons()
            alert("A IA com Minimax")
        }
        contador++
    }
}