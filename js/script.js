function playerMove(board, line, column) {
    if (board[line][column] === 0) {
        markPosition(board, line, column);
        setTimeout(() => {
            aiMove(board);
        }, 500);
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
}