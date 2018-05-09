function calculaAvaliacaoComCutOff(board, player = 1) {
	let brancas = []
	let brancas2 = []
	let jogada
	let seleciona = []
	let jogador = []
	let adversario = []
	let seqJogador = []
	let seqAdversario = []
	let seqCalculo = []
	let baseCalculo = []
	let retorno = [0, [0, 0], 0]
	var mini = 1000
	var maxi = [0]
	//separa peças em três vetores
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			if (board[i][j] == 0) {
				brancas.push([i, j])
				brancas2.push([i, j])
			} else if (board[i][j] == player) {
				adversario.push([i, j])
			} else {
				jogador.push([i, j])
			}
		}
	}
	//alert("brancas "+JSON.stringify(brancas))
	//alert("adversario "+JSON.stringify(adversario))
	//if(jogador.length > 0) { alert("jogador "+JSON.stringify(jogador)) }

	//chama os métodos que criam as sequências de cada jogador
	//seqJogador = montaSequencia(jogador,board)
	//alert("sequencia jogador"+ JSON.stringify(seqJogador)+" length "+seqJogador.length)
	//seqAdversario = montaSequencia(adversario,board)
	//alert("sequencia adversário"+ JSON.stringify(seqAdversario)+" length "+seqAdversario.length)

	//calculo do MAX
	while (jogada = brancas2.pop()) {
		//	a = [[0,2],[0,3],[0,4]]
		//while(jogada = a.pop()){	
		baseCalculo = jogador.slice();
		//	alert("jogada "+JSON.stringify(jogada))
		//if('[5,4]' == JSON.stringify(jogada)){ alert("base "+JSON.stringify(baseCalculo)+"jogada sendo analisada "+JSON.stringify(jogada)) }
		baseCalculo.unshift(jogada)
		//	alert("base "+JSON.stringify(baseCalculo))
		//if('[5,4]' == JSON.stringify(jogada)){alert("base mais jogada "+JSON.stringify(baseCalculo)+"jogada sendo analisada "+JSON.stringify(jogada))}
		seqCalculo = montaSequencia(baseCalculo, board)
		//	alert("sequencia avaliada "+JSON.stringify(seqCalculo))
		//if('[5,4]' == JSON.stringify(jogada)){alert("sequencia montada "+JSON.stringify(seqCalculo))}
		retorno = funcaoAvaliacao(seqCalculo)
		//alert("retornofuncao para ---"+JSON.stringify(retorno)+" com retorno 0 = "+retorno[0]+" e maxi 0 = "+JSON.stringify(maxi))
		//if('[0,2]' == JSON.stringify(jogada)){alert("retornofuncao para 0,2"+JSON.stringify(retorno))}
		if (retorno[0] > maxi[0]) {
			//	alert("trocou maxi")
			maxi[0] = retorno[0]
			maxi[1] = jogada
			//	alert(JSON.stringify(maxi))
		}
		if (retorno[2] > maxi[0]) {
			maxi[0] = retorno[2]
			maxi[1] = jogada
		}

	}

	// calculo da avaliacao do adversario
	//calculo do MAX

	a = []
	while (jogada = a.pop()) {
		//while(jogada = brancas.pop()){
		baseCalculo = adversario.slice();
		//if('[5,4]' == JSON.stringify(jogada)){ alert("base "+JSON.stringify(baseCalculo)+"jogada sendo analisada "+JSON.stringify(jogada)) }
		baseCalculo.unshift(jogada)
		//if('[5,4]' == JSON.stringify(jogada)){alert("base mais jogada "+JSON.stringify(baseCalculo)+"jogada sendo analisada "+JSON.stringify(jogada))}
		seqCalculo = montaSequencia(baseCalculo, board)
		//if('[5,4]' == JSON.stringify(jogada)){alert("sequencia montada "+JSON.stringify(seqCalculo))}
		retorno = funcaoAvaliacao(seqCalculo)
		//	alert("retorno = "+JSON.stringify(retorno))
		//if('[5,4]' == JSON.stringify(jogada)){alert("retornofuncao"+JSON.stringify(retorno))}
		while (seleciona = retorno.pop()) {
			alert("seleciona " + JSON.stringify(seleciona))
			if (seleciona[0] > maxi[0]) {
				maxi = [seleciona]
			}
			alert("maxi " + JSON.stringify(maxi))
		}
	}
	//alert("maxi "+JSON.stringify(maxi))
	if (maxi[0] > 0) {
		maxi[0] = -1;
	} else {
		maxi[0] = 0
	}
	//alert("maxi incrementado "+JSON.stringify(maxi))
	return maxi



	//ATÉ AQUI




}

function calculaMinimax(board, player = 1, profundidade = 0) {
	let brancas = []
	let jogada
	let jogador = []
	let adversario = []
	var boardLocal
	var retorno = [-10 * player, [0, 0], 100 * profundidade]
	var provisorio = [0, [0, 0], profundidade]

    //separa peças em três vetores
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			if (board[i][j] == 0) {
				brancas.push([i, j])
			} else if (board[i][j] == player) {
				adversario.push([i, j])
			} else {
				jogador.push([i, j])
			}
		}
	}
    
    //calculo do MINIMAX
	contadorMinimax = 0
	while ((jogada = brancas.pop()) && (retorno[0] != player)) {
        boardLocal = board.slice()
		boardLocal[jogada[0]][jogada[1]] = player

        if (gameOver(boardLocal, player)) {
			provisorio = [player, [jogada[0], jogada[1]]], profundidade
		} else {
			provisorio = calculaMinimax(boardLocal, -1 * (player), ++profundidade)
		}
		boardLocal[jogada[0]][jogada[1]] = 0
		if (((player > 0 && provisorio[0] > retorno[0]) || (player < 0 && provisorio[0] < retorno[0])) && (provisorio[2] < retorno[2])) {
			retorno = provisorio
		}
	}
	return retorno
}


function funcaoAvaliacao(seqJogador) {
	let destino
	var maxLargura
	var maxAltura
	var esquerda
	var direita
	var alto
	var baixo
	var maisEsquerda
	var maisDireita
	var maisAlto
	var maisBaixo
	var parMaisLargo
	var parMaisAlto
	var instanciaLocal

	while (seqJogador.length > 0) {
		alto = 1000
		baixo = 0
		esquerda = 1000
		direita = 0
		maxLargura = 0
		maxAltura = 0
		while (instanciaLocal = seqJogador.pop()) {
			for (let i = 0; i < instanciaLocal.length; i++) {
				if (instanciaLocal[i][0] < alto) {
					alto = instanciaLocal[i][0];
					maisAlto = instanciaLocal[i]
				}
				if (instanciaLocal[i][0] > baixo) {
					baixo = instanciaLocal[i][0];
					maisBaixo = instanciaLocal[i]
				}
				if (instanciaLocal[i][1] > direita) {
					direita = instanciaLocal[i][1];
					maisDireita = instanciaLocal[i]
				}
				if (instanciaLocal[i][1] < esquerda) {
					esquerda = instanciaLocal[i][1];
					maisEsquerda = instanciaLocal[i]
				}
				if (direita - esquerda > maxLargura) {
					maxLargura = direita - esquerda;
					parMaisLargo = [maisDireita, maisEsquerda]
				}
				if (baixo - alto > maxAltura) {
					maxAltura = baixo - alto;
					parMaisAlto = [maisAlto, maisBaixo]
				}
			}
		}
	}
	return [maxLargura, parMaisLargo, maxAltura, parMaisAlto]
}

function montaSequencia(todasPecas, board) {
	var cabeca = 0
	var filhos = []
	var sequencia = []
	while (todasPecas.length > 0) {
		origem = todasPecas.pop()
		candidatos = geraCandidatos(origem[0], origem[1], board.length - 1)
		for (let i = 0; i < todasPecas.length; i++) {
			for (let j = 0; j < candidatos.length; j++) {
				if (JSON.stringify(todasPecas[i]) == JSON.stringify(candidatos[j])) {
					if (cabeca == 0 || filhos.length == 0) {
						filhos = [origem]
						cabeca++
						filhos.push(todasPecas[i]); 
					} else {
						filhos.push(todasPecas[i]);
					}	

				}
			}
		}
		sequencia.push(filhos)
		filhos = []
	}
	return sequencia
}


function especula(board, player = 1) {
	aux = [board.length, board.length]
	corte = new Array(aux)
	var fila = new Array(aux)
	let linha = board.length
	let coluna = board.length
	let condicao = false
	for (condicao = board.length - 1; condicao > 0; condicao--) {
		fila = buscaLargura(condicao, board.length - 1, board, player, fila, corte)
		jogada = false
		contador = 0
		do {
			par = fila.pop()
			linha = par[0]
			if (linha == undefined) {
				linha = fila[0]
			}
			coluna = par[1]
			if (coluna == undefined) {
				coluna = par
			}
			contador++
			if (0 == board[linha][coluna]) {
				jogada = true
			}
			fila = fila.pop()
		} while ((jogada == false) && (contador < (board.length * board.length / 2) && (fila.length >= 0)))
		if (linha >= 0 && coluna >= 0) {
			condicao = true
			return [linha, coluna];
		}
	}
}