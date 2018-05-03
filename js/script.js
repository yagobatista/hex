function playerMove(board, line, column) {
    if (board[line][column] === 0) {
        markPosition(board, line, column);
        if (gameOver(board)) {
            alert('Você ganhou!');
        } else {
            setTimeout(() => {
                randomMove(board);
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