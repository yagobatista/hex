function playerMove(board, line, column) {
    if (board[line][column] === 0) {
        markPosition(board, line, column);
        if (!gameOver(board)) {
            setTimeout(() => {
                aiMove(board);
            }, 500);
        }
    }
}

function aiMove(board) {
    // random ai move
    let line;
    let column;
    do {
        line = parseInt(Math.random() * board.length);
        column = parseInt(Math.random() * board.length);
    } while (board[line][column] !== 0);
    markPosition(board, line, column, 'ai');
    if (gameOver(board, -1)) {
        alert('A ia ganhou!')
    }
}

function gameOver(board, player = 1) {

	aux = [board.length,board.length]
	corte = new Array(aux)
	retorno = false
	for (let i = board.length-1; i >= 0; i--){
		if (((player < 0 && board[board.length-1][i] == player) && (buscaProfundidade(board.length-1, i, board, player, corte)) ) || ((player > 0 && board[i][board.length-1] == player) && (buscaProfundidade(i,board.length-1, board, player, corte)))) {
			retorno = true;
		} 
	}
	return retorno;
}


