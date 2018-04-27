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
	retorno = false
	for (let i = board.length-1; i >= 0; i--){
		if (buscaProfundidade(i,board.length-1, board, player, corte, rodada)){
			retorno = true;
		}
	}
	return retorno;
}

function geraCandidatos(linha, coluna, dimensao){
	//forma os candidatos
	alert("linha")
	alert(linha)
	alert("coluna")
	alert(coluna)
	candidatos = new Array()
	escolhidos = new Array()
	if (linha > 0){
		candidatos.push([linha-1, coluna])
	}
	if (linha > 0 && coluna < dimensao){
		candidatos.push([linha-1, coluna+1])
	}
	if (coluna > 0){
		candidatos.push([linha, coluna-1])
	}
	if (coluna < dimensao){
		candidatos.push([linha, coluna+1])
	}
	if (linha < dimensao && coluna > 0){
		candidatos.push([linha+1, coluna-1])
	}
	if (linha < dimensao){
		candidatos.push([linha+1, coluna])
	}
	return candidatos
}

function eliminaRedundancia (linha, coluna, filhos, corte){
	if (filhos) {
	//retira os nós já visitados
		for(let i=0; i < filhos.length; i++){
			recusa = false
			for(let j=0; j < filhos.length; j++){
				if (candidatos[i] == corte[j]){
					recusa = true
				}
			}
			if(!recusa){ 
				escolhidos.push(filhos[i])
			} else {
					corte.push(filhos[i])
			}
		}
	}
	return escolhidos
}

function buscaProfundidade(linha, coluna, board, player, corte, rodada){
	if (coluna == 0) {
		return true
	} else {	
				aux = new Array()
				corte = new Array(aux)
				escolhidos = new Array(aux)
				filhos.push([linha, coluna])
				filhos.push(geraCandidatos(linha, coluna, board.length-1))
				alert("filhos = "+ filhos)
				escolhidos = eliminaRedundancia(linha, coluna, filhos, corte)
				alert("escolhidos = "+escolhidos)
				for(let i=0; i < filhos.length-1; i++){
					return buscaProfundidade(filhos[i][0], filhos[i][1], board, player, corte)
				}
	}
	return false
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
