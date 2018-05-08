function iaMarco(board, player) {
    let nota = 0;
    let notas = new Array();
    let score = 0;
    let jogada_escolhida = new Array();
    let rota = new Array();
    let rota_prioritaria = new Array();
    let simulacao = board.slice(0);
    let aux = [board.length, board.length];
    let corte = new Array(aux);

    for (let i = 0; i < simulacao.length; i++) {
        if (simulacao[0][i] != 1) {
            simulacao[0][i] = -1;
        }
    }
    for (let i = simulacao.length - 1; i >= 0; i--) {
        if ((player < 0 && simulacao[simulacao.length - 1][i] == player) && (especulaProfundidade(simulacao.length - 1, i, simulacao, player, corte, notas, rota)) || ((player > 0 && simulacao[i][simulacao.length - 1] == player) && (especulaProfundidade(i, board.length - 1, simulacao, player, corte, notas, rota)))) {
            //seleciona score mais favorável das notas
            return score;
        }
    }
    return retorno;
}

function randomMove(board) {
    // random ai move
    let line;
    let column;
    do {
        line = parseInt(Math.random() * board.length);
        column = parseInt(Math.random() * board.length);
    } while (board[line][column] !== 0);
    markPosition(board, line, column, 'ai');
    if (gameOver(board, -1)) {
        alert('A ia ganhou!');
    }
}

function aiMinimax(board, player) {
    // Minimax ai move
    let line;
    let column;
    let par = [];
    par = calculaMinimax(board, -1);
    if (par[0] == player) {
        line = par[1][0];
        column = par[1][1];
    } else {
        do {
            line = parseInt(Math.random() * board.length);
            column = parseInt(Math.random() * board.length);
        } while (board[line][column] !== 0);
    }
    //marca posicao e vê se ganhou
    markPosition(board, line, column, 'ai');
}

function aiMoveLargura(board) {
    // movimento ai busca largura
    let par = new Array();
    let line;
    let column;
    par = especula(board);
    line = par[0];
    column = par[1];
    //marca posicao e vê se ganhou
    markPosition(board, line, column);
}

function aiUm(params) {

}

function aiDois(params) {

}