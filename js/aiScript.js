function randomMove(board) {
    // random ai move
    let line;
    let column;
    do {
        line = parseInt(Math.random() * board.length);
        column = parseInt(Math.random() * board.length);
    } while (board[line][column] !== 0);
    markPosition(board, line, column, 'ai');
}

function aiMinimax(board, player) {
    // Minimax ai move
    let line;
    let column;
    let par = []
    par = calculaMinimax(board);
    if (par[0] == player) {
        line = par[1][0]
        column = par[1][1]
    } else {
        do {
            line = parseInt(Math.random() * board.length);
            column = parseInt(Math.random() * board.length);
        } while (board[line][column] !== 0);
    }
    markPosition(board, line, column, player === -1 ? 'ai' : '');
}

function aiCutOff(board, player) {
    // Minimax ai move
    let line;
    let column;
    let par = []
    par = calculaAvaliacaoComCutOff(board)
    if (par[0] == player) {
        line = par[1][0]
        column = par[1][1]
    } else {
        do {
            line = parseInt(Math.random() * board.length);
            column = parseInt(Math.random() * board.length);
        } while (board[line][column] !== 0);
    }
    markPosition(board, line, column, player === -1 ? 'ai' : '');
}

function aiMoveLargura(board) {
    // movimento ai busca largura
    par = new Array()
    let line;
    let column;
    par = especula(board)
    line = par[0]
    column = par[1]
    markPosition(board, line, column, player === -1 ? 'ai' : '');
}