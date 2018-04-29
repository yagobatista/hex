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
    //action of the event of click
    let hexagonos = document.getElementsByClassName('hex');
    for (let index = 0; index < hexagonos.length; index++) {
        hexagonos[index].onclick = () => {
            const column = index % board.length;
            const line = (index - column) / board[0].length;
            playerMove(board, line, column);
        };

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

function checaFilho(escolhidos, player, board, corta){
//vê se o filho tem peça do jogador
	caminho = new Array()
	for(let i=0; i<escolhidos.length; i++) {
		if(player == board[escolhidos[i][0]][escolhidos[i][1]]){
			caminho.push(escolhidos[i])
		} else {
			corta.push(escolhidos[i])
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

function iaMarco(board, player){
	nota = 0
	notas = new Array()
	score = 0
	jogada_escolhida = new Array()
	rota = new Array()
	rota_prioritaria = new Array() 
	simulacao = board.slice(0)
	aux = [board.length,board.length]
	corte = new Array(aux)

	for (let i = 0; i < simulacao.length; i++){
		if(simulacao[0][i] != 1){
			simulacao[0][i] = -1
		}
	}
	for (let i = simulacao.length-1; i >= 0; i--){
		if ((player < 0 && simulacao[simulacao.length-1][i] == player) && (especulaProfundidade(simulacao.length-1, i, simulacao, player, corte, notas, rota)) || ((player > 0 && simulacao[i][simulacao.length-1] == player) && (especulaProfundidade(i,board.length-1, simulacao, player, corte, notas, rota)))) {
//seleciona score mais favorável das notas
			return score
		} 
	}
	return retorno;
}

function especulaProfundidade(linha, coluna, board, player, corte){
//algorítmo para dificultar a vitória do adversário no jogo
	var caminho = new Array()
	if ((player > 0 && coluna == 0) || (player < 0 && linha == 0)) {
		return true
	} else {
		filhos = geraCandidatos(linha, coluna, board.length-1)
		escolhidos = eliminaRedundancia(linha, coluna, filhos, corte)
		caminho = checaFilho(escolhidos, player, board, corte)
		corte.push([linha, coluna])
		if(caminho.length > 0){
			var k=0
			retorno = buscaProfundidade(caminho[k][0], caminho[k][1], board, player, corte)
			if(!retorno && k == 0 && caminho.length > 1){ 
				k = 1
				retorno = buscaProfundidade(caminho[k][0], caminho[k][1], board, player, corte)
			return retorno
			}
			return retorno
		} else { 
			return retorno
		}
	}
}

