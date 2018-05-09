function geraCandidatos(linha, coluna, dimensao) {
	//forma os candidatos
	candidatos = new Array()
	if (coluna > 0) {
		candidatos.unshift([linha, coluna - 1])
	}
	if (linha < dimensao && coluna > 0) {
		candidatos.unshift([linha + 1, coluna - 1])
	}
	if (linha > 0) {
		candidatos.unshift([linha - 1, coluna])
	}
	if (linha < dimensao) {
		candidatos.unshift([linha + 1, coluna])
	}
	if (linha > 0 && coluna < dimensao) {
		candidatos.unshift([linha - 1, coluna + 1])
	}

	if (coluna < dimensao) {
		candidatos.unshift([linha, coluna + 1])
	}
	return candidatos
}

function eliminaRedundancia(linha, coluna, filhos, corte) {
	var um
	var dois
	escolhidos = new Array()
	if (filhos) {
		//retira os nós já visitados
		for (let i = 0; i < filhos.length; i++) {
			let recusa = false
			for (let j = 0; j < corte.length; j++) {
				um = "" + filhos[i]
				dois = "" + corte[j]
				if (um == dois) {
					recusa = true
				}
			}
			if (!recusa) {
				escolhidos.push(filhos[i])
			}
		}
	}
	return escolhidos
}

function checaFilho(escolhidos, player, board, corte, especula = false) {
	//vê se o filho tem peça do jogador
	caminho = new Array()
	for (let i = 0; i < escolhidos.length; i++) {
		if ((player == board[escolhidos[i][0]][escolhidos[i][1]]) || ((especula) && (0 == board[escolhidos[i][0]][escolhidos[i][1]]))) {
			caminho.push(escolhidos[i])
		} else {
			corte.push(escolhidos[i])
		}
	}
	if (caminho.length > 0) {
		return caminho
	} else {
		return false
	}
}


function buscaProfundidade(linha, coluna, board, player, corte = [], horizontal) {
	//vê se o jogador tem um caminho de ponta a ponta
	var caminho = new Array()
	if ((horizontal && coluna == 0) || (!horizontal && linha == 0)) {
		return true
	} else {
		filhos = geraCandidatos(linha, coluna, board.length - 1)
		escolhidos = eliminaRedundancia(linha, coluna, filhos, corte)
		caminho = checaFilho(escolhidos, player, board, corte)
		corte.push([linha, coluna])
		if (caminho.length > 0) {
			var k = 0
			retorno = buscaProfundidade(caminho[k][0], caminho[k][1], board, player, corte, horizontal)
			if (!retorno && k == 0 && caminho.length > 1) {
				k = 1
				retorno = buscaProfundidade(caminho[k][0], caminho[k][1], board, player, corte, horizontal)
				return retorno
			}
			return retorno
		} 
	}
}

function buscaLargura(linha, coluna, board, player, fila, corte) {
	if (fila.length > 0) {
		fila.pop()
	}
	var resultado = new Array()
	if ((coluna == 0) || (linha == 0)) {
		resultado = [linha, coluna]
		return resultado
	} else {
		corte.push([linha, coluna])
		candidatos = geraCandidatos(linha, coluna, board.length - 1)
		escolhidos = eliminaRedundancia(linha, coluna, candidatos, corte)
		filhos = checaFilho(escolhidos, player, board, corte, true)
		fila.push(filhos)
		resultado.push(buscaLargura(fila[0][0][0], fila[0][0][1], board, player, fila, corte))
		resultado.push([linha, coluna])
		return resultado
	}

}