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

function eliminaRedundancia (linha, coluna, dimensao, corte, board){
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
	alert("candidatos 1")
	alert(candidatos)
	if (linha > 0 && coluna < dimensao){
		candidatos.push([linha-1, coluna+1])
	}
	alert("candidatos 1")
	alert(candidatos)
	if (coluna > 0){
		candidatos.push([linha, coluna-1])
	}
	alert("candidatos 1")
	alert(candidatos)
	if (coluna < dimensao){
		candidatos.push([linha, coluna+1])
	}
	alert("candidatos 1")
	alert(candidatos)
	if (linha < dimensao && coluna > 0){
		candidatos.push([linha+1, coluna-1])
	}
	alert("candidatos 1")
	alert(candidatos)
	if (linha < dimensao){
		candidatos.push([linha+1, coluna])
	}
	alert("candidatos 1")
	alert(candidatos)
	if (candidatos) {
	//retira os nós já visitados
		for(let i=0; i < candidatos.length; i++){
			alert("i = ")
			alert(i)
			recusa = false
			for(let j=0; j < corte.length; j++){
			alert("j = ")
			alert(j)
			alert("candidatos i = ")
			alert(candidatos[i])
			alert("corte j = ")
			alert(corte[j])

				if (candidatos[i] == corte[j]){
					recusa = true
				}
			alert("recusa = ")
			alert(recusa)

			if(!recusa){ 
				escolhidos.push(candidatos[i])
				corte.push(escolhidos)
			}
			alert("escolhidos = ")
			alert(escolhidos)

			}
		}
	}
	alert("corte final")
	alert(candidatos)
	alert("escolhidos final")
	alert(escolhidos)
	return escolhidos
}

function buscaProfundidade(linha, coluna, board, player, corte){
	alert("o lugar pesquisado é linha - "+linha+" coluna - "+ coluna)
	filhos = new Array()
	if (coluna == 0) {
		return true
	} else {
				filhos = eliminaRedundancia(linha, coluna, board.length-1, corte)
				alert(filhos)
				corte.push([linha, coluna])
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
