function makeBoard(board) {
    //render of t
    let boardString = '';
    for (let i = 0; i < board.length; i++) {
        boardString += `<div class="hex-row n${i}">`;
        for (let j = 0; j < board[i].length; j++) {
            boardString += ' <div class="hex"> <div class="top"></div> <div class="middle"></div> <div class="bottom"></div> </div>';
        }
        boardString += '</div>';
    }
    document.getElementsByClassName('board')[0].innerHTML = boardString;
	var fimJogo = false
	let contador = 0
	while(!fimJogo){
                aiMove(board);
	    if(gameOver(board, -1)){
		fimJogo = true
		alert("A IA aleatória ganhou")
	} else {
                aiMoveLargura(board);
	}
	if(gameOver(board, 1)){
	fimJogo = true
	alert("A IA com busca na largura ganhou")	}
	contador++
	alert("proxima rodada")
	}
}



function markPosition(board, line, column, player = null) {
    player = player && `${ player }-` || '';
	//alert(player)
    const positionValue = player === "ai-" ? -1 : 1;
    const hexagonos = document.getElementsByClassName('hex');
    board[line][column] = positionValue;
    hexagonos[(line * board.length) + column].className = `hex ${ player }selected`;
}

function geraCandidatos(linha, coluna, dimensao){
	//forma os candidatos
	candidatos = new Array()
	if (coluna > 0){
		candidatos.unshift([linha, coluna-1])
	}
	if (linha < dimensao && coluna > 0){
		candidatos.unshift([linha+1, coluna-1])
	}
	if (linha > 0){
		candidatos.unshift([linha-1, coluna])
	}
	if (linha < dimensao){
		candidatos.unshift([linha+1, coluna])
	}
	if (linha > 0 && coluna < dimensao){
		candidatos.unshift([linha-1, coluna+1])
	}

	if (coluna < dimensao){
		candidatos.unshift([linha, coluna+1])
	}

	return candidatos
}

function eliminaRedundancia (linha, coluna, filhos, corte){
	var um
	var dois
	escolhidos = new Array()
	if (filhos) {
	//retira os nós já visitados
		for(let i=0; i < filhos.length; i++){
			let recusa = false
			for(let j=0; j < corte.length; j++){
				um = ""+filhos[i]
				dois = ""+corte[j]
				if (um == dois){
					recusa = true
				}
			}
			if(!recusa){ 
				escolhidos.push(filhos[i])
			} 
		}
	}
	return escolhidos
}

function checaFilho(escolhidos, player, board, corte, especula=false){
//vê se o filho tem peça do jogador
	caminho = new Array()
	for(let i=0; i<escolhidos.length; i++) {
		if((player == board[escolhidos[i][0]][escolhidos[i][1]]) || ((especula) && (0 == board[escolhidos[i][0]][escolhidos[i][1]]))){
			caminho.push(escolhidos[i])
		} else {
			corte.push(escolhidos[i])
		}
	}
	if(caminho.length > 0){
		return caminho
	} else {
		return false
	}
}


function buscaProfundidade(linha, coluna, board, player, corte, horizontal){
//vê se o jogador tem um caminho de ponta a ponta
	var caminho = new Array()
	if ((horizontal && coluna == 0) || (!horizontal && linha == 0)) {
		return true
	} else {
				filhos = geraCandidatos(linha, coluna, board.length-1)
				escolhidos = eliminaRedundancia(linha, coluna, filhos, corte)
				caminho = checaFilho(escolhidos, player, board, corte)
				corte.push([linha, coluna])
				if(caminho.length > 0){
					var k=0
					retorno = buscaProfundidade(caminho[k][0], caminho[k][1], board, player, corte, horizontal)
					if(!retorno && k == 0 && caminho.length > 1){ 
						k = 1
						retorno = buscaProfundidade(caminho[k][0], caminho[k][1], board, player, corte, horizontal)
					return retorno
					}
					return retorno
				} else { 
					return retorno
				}
	}
}

function buscaLargura(linha, coluna, board, player, fila, corte){
if(fila.length > 0 ) { fila.pop() }
	var resultado = new Array()
		if ((coluna == 0) || (linha == 0)) {
			resultado = [linha, coluna]
			return resultado
		} else {
		corte.push([linha,coluna])
		candidatos = geraCandidatos(linha, coluna, board.length-1)
		escolhidos = eliminaRedundancia(linha, coluna, candidatos, corte)
		filhos = checaFilho(escolhidos, player, board, corte, true)
		fila.push(filhos)
		resultado.push(buscaLargura(fila[0][0][0], fila[0][0][1], board, player, fila, corte))
		resultado.push([linha, coluna])
		return resultado
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

function especula(board, player = 1){
	aux = [board.length,board.length]
	corte = new Array(aux)
	var fila = new Array(aux)
	let linha = board.length
	let coluna = board.length
	let condicao = false
	for(condicao = board.length-1; condicao > 0; condicao--){
	fila = buscaLargura(condicao, board.length-1, board, player, fila, corte) 
		jogada = false
		contador = 0
		do {
			par = fila.pop()
			linha = par[0]
			if(linha == undefined) { linha = fila[0] }
			coluna = par[1]
			if(coluna == undefined) { coluna = par }
			contador++
			if(0 == board[linha][coluna]){ jogada = true }
			fila = fila.pop()
		} while ((jogada == false) && (contador < (board.length*board.length/2) && (fila.length >= 0)))
	if(linha >=0 && coluna >=0 ){
		condicao = true
		return [linha, coluna];
	} 
	}
}


