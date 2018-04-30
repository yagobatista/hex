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


