function geraCandidatos(linha, coluna, dimensao) {
	//forma os candidatos
	let candidatos = new Array();
	if (linha > 0) {
		candidatos.push([linha - 1, coluna]);
	}
	if (linha > 0 && coluna < dimensao) {
		candidatos.push([linha - 1, coluna + 1]);
	}
	if (coluna > 0) {
		candidatos.push([linha, coluna - 1]);
	}
	if (coluna < dimensao) {
		candidatos.push([linha, coluna + 1]);
	}
	if (linha < dimensao && coluna > 0) {
		candidatos.push([linha + 1, coluna - 1]);
	}
	if (linha < dimensao) {
		candidatos.push([linha + 1, coluna]);
	}
	return candidatos;
}

function eliminaRedundancia(linha, coluna, filhos, corte) {
	let um;
	let dois;
	let escolhidos = new Array();
	if (filhos) {
		//retira os nós já visitados
		for (let i = 0; i < filhos.length; i++) {
			let recusa = false
			for (let j = 0; j < corte.length; j++) {
				um = "" + filhos[i];
				dois = "" + corte[j];
				if (um == dois) {
					recusa = true;
				}
			}
			if (!recusa) {
				escolhidos.push(filhos[i]);
			}
		}
	}
	return escolhidos;
}

function checaFilho(escolhidos, player, board, corta) {
	//vê se o filho tem peça do jogador
	let caminho = new Array();
	for (let i = 0; i < escolhidos.length; i++) {
		if (player == board[escolhidos[i][0]][escolhidos[i][1]]) {
			caminho.push(escolhidos[i]);
		} else {
			corta.push(escolhidos[i]);
		}
	}
	if (caminho.length > 0) {
		return caminho;
	} else {
		return false;
	}
}


function buscaProfundidade(linha, coluna, board, player, corte, horizontal) {
	//vê se o jogador tem um caminho de ponta a ponta
	let caminho = new Array();
	if ((horizontal && coluna == 0) || (!horizontal && linha == 0)) {
		return true;
	} else {
		let filhos = geraCandidatos(linha, coluna, board.length - 1);
		let escolhidos = eliminaRedundancia(linha, coluna, filhos, corte);
		caminho = checaFilho(escolhidos, player, board, corte);
		corte.push([linha, coluna]);
		if (caminho.length > 0) {
			let k = 0;
			let retorno = buscaProfundidade(caminho[k][0], caminho[k][1], board, player, corte, horizontal);
			if (!retorno && k == 0 && caminho.length > 1) {
				k = 1;
				retorno = buscaProfundidade(caminho[k][0], caminho[k][1], board, player, corte, horizontal);
				return retorno;
			}
			return retorno;
		} else {
			return retorno;
		}
	}
}

function calculaPontos(board, player = 1) {
	let pontos = 0;
	let size = board.length;
	let k = 0;
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size - 1; j++) {
			if (player > 0 && board[i][j] == player && ((board[i][j + 1] == player) || (i > 0 && board[i - 1][j + 1] == player))) {
				pontos += 10;
				alert(pontos + " ganhos em i = " + i + " e j = " + j + "pelo player = " + board[i][j] + " vulgo " + player + "vizinho de = " + board[i][j + 1]);
			}
			if (player < 0 && board[i][j] < 0 == player && board[i + 1][j] == player && false) {
				pontos += 10;
			}
		}
		k++
	}
	alert(pontos);
	alert(buscaProfundidade(board.length - 1, board.length - 1, board, player));
	return pontos;
}

function especulaProfundidade(linha, coluna, board, player, corte) {
	//algorítmo para dificultar a vitória do adversário no jogo
	let caminho = new Array();
	if ((player > 0 && coluna == 0) || (player < 0 && linha == 0)) {
		return true;
	} else {
		let filhos = geraCandidatos(linha, coluna, board.length - 1);
		let escolhidos = eliminaRedundancia(linha, coluna, filhos, corte);
		caminho = checaFilho(escolhidos, player, board, corte);
		corte.push([linha, coluna]);
		if (caminho.length > 0) {
			let k = 0;
			retorno = buscaProfundidade(caminho[k][0], caminho[k][1], board, player, corte);
			if (!retorno && k == 0 && caminho.length > 1) {
				k = 1;
				retorno = buscaProfundidade(caminho[k][0], caminho[k][1], board, player, corte);
				return retorno;
			}
			return retorno;
		} else {
			return retorno;
		}
	}
}