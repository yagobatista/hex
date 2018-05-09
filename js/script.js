
function playerMove(board, line, column) {
    if (board[line][column] === 0) {
        markPosition(board, line, column);
        if (gameOver(board)) {
            alert('Você ganhou!');
        } else {
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
//marca posicao e vê se ganhou
    markPosition(board, line, column, 'ia');
	 if (gameOver(board, 1)) {
        alert('A ia ganhou!')
    }
}

function aiMinimax(board, player) {
    // Minimax ai move
    let line;
    let column;
    let par = []
	par = calculaMinimax(board, player)
//	par = calculaAvaliacaoComCutOff(board)
//	alert("par "+JSON.stringify(par))
	if(par[0]==player){
	line = par[1][0]
	column = par[1][1]
//	alert("linha "+line)
//	alert("column "+column)
	} else {
	   do {
		line = parseInt(Math.random() * board.length);
		column = parseInt(Math.random() * board.length);
	    } while (board[line][column] !== 0);
	}
//marca posicao e vê se ganhou
    markPosition(board, line, column);
}

function aiCutOff(board, player) {
    // Minimax ai move
    let line;
    let column;
    let par = []
//	par = calculaMinimax(board)
	par = calculaAvaliacaoComCutOff(board)
//	alert("par "+JSON.stringify(par))
	if(par[0]==player){
	line = par[1][0]
	column = par[1][1]
//	alert("linha "+line)
//	alert("column "+column)
	} else {
	   do {
		line = parseInt(Math.random() * board.length);
		column = parseInt(Math.random() * board.length);
	    } while (board[line][column] !== 0);
	}
//marca posicao e vê se ganhou
    markPosition(board, line, column, 'ai');
	 if (gameOver(board, -1)) {
        alert('A ia ganhou!')
    }
}

function aiMoveLargura(board) {
    // movimento ai busca largura
    par = new Array()
    let line;
    let column;
	par = especula(board)
	line = par[0]
	column = par[1]
//marca posicao e vê se ganhou
    markPosition(board, line, column);
}

function gameOver(board, player = 1) {

	aux = [board.length,board.length]
	corte = new Array(aux)
	retorno = false
	for (let i = board.length-1; i >= 0; i--){
		if (((board[board.length-1][i] == player) && (buscaProfundidade(board.length-1, i, board, player, corte, false)) ) || ((board[i][board.length-1] == player) && (buscaProfundidade(i,board.length-1, board, player, corte, true)))) {
			retorno = true;
		} 
	}
	return retorno;
}


