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
		if (buscaProfundidade(i,board.length-1, board, player, corte)){
			retorno = true;
		}
	}
	return retorno;
}

function buscaProfundidade(linha, coluna, board, player, corte){
	if(linha < 5){ alert("recursiva") }
	alert("linha - "+linha+" coluna - "+ coluna)
	if (coluna == 0) {
		return true
	} else {
			segue = false			
			alert("corte já incluído - "+corte)
			for(i=0; i<corte.length; i++){
				alert("i - "+i)
				let aux = [corte[i]]
				alert(""+aux[0]+" e "+[linha, coluna])
				  if ([linha, coluna] == aux[0]){
					alert ("deu igual pois linha/coluna - "+[linha, coluna]+" e corte - "+aux[0])
					segue = true
				}
 			}
			if (!segue) { corte.push([linha, coluna]) }
			if (board[linha][coluna] == player && board[linha][coluna-1] == player){
				alert("!!!!! recursiva coluna - "+coluna)
				return buscaProfundidade(linha, coluna-1, board, player, corte)
			} else if (linha > 0 && board[linha][coluna] == player && board[linha-1][coluna] == player) {
				alert("!!!!! recursiva linha para baixo -"+linha)
				return buscaProfundidade(linha-1, coluna, board, player, corte)
			} else if (segue && linha < board.length-1 && board[linha][coluna] == player && board[linha+1][coluna] == player) {
				alert("!!!!! recursiva linha pra cima -"+linha)
				return buscaProfundidade(linha+1, coluna, board, player, corte)
			} 
	}
}

function calculaPontos(board, player = 1){
	let pontos = 0
	let size = board.length
	let k = 0
	   for (let i = 0; i < size; i++) {
                    for (let j = 0; j < size-1; j++) {
                        if (player > 0 && board[i][j] == player && ((board[i][j+1] == player) || ( i > 0 && board[i-1][j+1] == player))){
			pontos += 10 
			alert(pontos+" ganhos em i = "+i+" e j = "+j+"pelo player = "+board[i][j]+" vulgo "+player+"vizinho de = "+board[i][j+1])
			}
                        if (player < 0 && board[i][j] < 0 == player && board[i+1][j] == player && false){
			pontos += 10 
			}
                    }
		k++
           }
	alert(pontos)
	alert(buscaProfundidade(board.length-1, board.length-1, board, player))
	return pontos
}
