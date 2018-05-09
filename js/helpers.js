
function geraCandidatos(linha, coluna, dimensao){
//alert("entrou candidatos linha"+linha+"coluna "+coluna+"dimensao "+dimensao)
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
//alert("todos os candidatos sai da seguinte maneira "+JSON.stringify(candidatos))
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


function buscaProfundidade(linha, coluna, board, player, corte=[], horizontal){
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

function calculaAvaliacaoComCutOff(board, player = 1){
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
	let retorno = [0,[0,0],0]	
	var mini = 1000
	var maxi = [0]
//separa peças em três vetores
	   for (let i = 0; i < size; i++) {
                    for (let j = 0; j < size; j++) {
			if(board[i][j] == 0){
				brancas.push([i,j])
				brancas2.push([i,j])
			} else if (board[i][j] == player){
				adversario.push([i,j])
			} else {
				jogador.push([i,j])
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
while(jogada = brancas2.pop()){
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
if(retorno[0]>maxi[0]){
//	alert("trocou maxi")
	maxi[0] = retorno[0]
	maxi[1] = jogada
//	alert(JSON.stringify(maxi))
}
if(retorno[2]>maxi[0]){
	maxi[0] = retorno[2]
	maxi[1] = jogada
}

}

// calculo da avaliacao do adversario
//calculo do MAX

	a = []
while(jogada = a.pop()){	
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
	while(seleciona = retorno.pop()){
	alert("seleciona "+JSON.stringify(seleciona))
	if(seleciona[0]>maxi[0]) { maxi = [seleciona]}
		alert("maxi "+JSON.stringify(maxi))
	}	
}
//alert("maxi "+JSON.stringify(maxi))
if(maxi[0] > 0) { maxi[0] = -1; } else { maxi[0] = 0 }
//alert("maxi incrementado "+JSON.stringify(maxi))
return maxi



//ATÉ AQUI




}


function calculaMinimax(board, player = 1, profundidade = 0){
	let brancas = []
	let jogada
	let jogador = []
	let adversario = []
	var boardLocal
	var retorno  = [-10*player,[0,0], 100*profundidade]
	var provisorio  = [0,[0,0], profundidade]
	//separa peças em três vetores
//alert(++contador)
	   for (let i = 0; i < size; i++) {
                    for (let j = 0; j < size; j++) {
			if(board[i][j] == 0){
				brancas.push([i,j])
			} else if (board[i][j] == player){
				adversario.push([i,j])
			} else {
				jogador.push([i,j])
		   	}
	     	    }
	   }
//alert("entrou com o vetor do tamanho"+brancas.length)
//	alert("brancas "+JSON.stringify(brancas))
//	alert("adversario "+JSON.stringify(adversario))
//	if(jogador.length > 0) { alert("jogador "+JSON.stringify(jogador)) }

	//calculo do MINIMAX
	contadorMinimax = 0
	while((jogada = brancas.pop()) && (retorno[0] != player)){ //para tirar o alfa beta basta tirar a última condição do and
//alert("contador"+contador)

		boardLocal = board.slice()
//	alert(board)
//	alert(JSON.stringify([player,[jogada[0],jogada[1]]]))
	boardLocal[jogada[0]][jogada[1]] = player
	if( gameOver(boardLocal, player) ){ provisorio = [player,[jogada[0],jogada[1]]], profundidade } else { provisorio = calculaMinimax(boardLocal, -1*(player), ++profundidade) }	
	boardLocal[jogada[0]][jogada[1]] = 0
	if( ((player > 0 && provisorio[0] > retorno[0]) || (player < 0 && provisorio[0] < retorno[0])) && (provisorio[2] < retorno[2]) ){ retorno = provisorio }
//	alert(boardLocal+"esta dando gameOver"+gameOver(boardLocal,player)+"e retornando "+JSON.stringify(retorno))
	
	}
return retorno
}


function funcaoAvaliacao(seqJogador) {
//alert("Dentro da funcaoAvaliacao"+JSON.stringify(seqJogador))
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

	while(seqJogador.length > 0){
//	alert("entrou no max com sequencia"+JSON.stringify(seqJogador)+" com length "+seqJogador.length)
		alto = 1000
		baixo = 0
		esquerda = 1000
		direita = 0
		maxLargura = 0
		maxAltura = 0
		while (instanciaLocal = seqJogador.pop()) {
//			alert("instancia Local "+JSON.stringify(instanciaLocal)+" length "+instanciaLocal.length)
			for(let i = 0; i < instanciaLocal.length; i++){
//			alert("instanciaLocal "+JSON.stringify(instanciaLocal[i][0])+" - "+JSON.stringify(instanciaLocal[i][1])+"sem JSON "+instanciaLocal[i]+"com JSON "+JSON.stringify(instanciaLocal[i]) )
					if(instanciaLocal[i][0]<alto){ alto = instanciaLocal[i][0]; maisAlto = instanciaLocal[i] }
//			alert("elemento "+JSON.stringify(instanciaLocal[i][0])+" alto - "+alto+" baixo - "+baixo)
					if(instanciaLocal[i][0]>baixo){ baixo = instanciaLocal[i][0]; maisBaixo = instanciaLocal[i] }
					if(instanciaLocal[i][1]>direita){ direita = instanciaLocal[i][1]; maisDireita = instanciaLocal[i] }
//			alert("elemento "+JSON.stringify(instanciaLocal[i][0])+" direita - "+direita+" esquerda - "+esquerda)
					if(instanciaLocal[i][1]<esquerda){ esquerda = instanciaLocal[i][1]; maisEsquerda = instanciaLocal[i] }
//				alert(" do candidato, alto - "+alto+", baixo = "+baixo+", direita,- "+direita+" esquerda - "+esquerda)
//				alert("Mais alto  "+maisAlto+" mais baixo "+maisBaixo+", mais direita "+maisDireita+" mais esquerda "+maisEsquerda)	
				if(direita - esquerda > maxLargura) { maxLargura = direita - esquerda; parMaisLargo = [maisDireita, maisEsquerda] } 
				if(baixo - alto > maxAltura) { maxAltura = baixo - alto; parMaisAlto = [maisAlto, maisBaixo] } 
//				alert("Nota largura "+maxLargura+" de largura em "+parMaisLargo+", e altura com "+maxAltura+" em "+parMaisAlto)
			}
		}
	}
//	alert(JSON.stringify([maxLargura, parMaisLargo, maxAltura, parMaisAlto]))
	return [maxLargura, parMaisLargo, maxAltura, parMaisAlto]
}

function montaSequencia(todasPecas, board){
	var cabeca = 0	
	var filhos = []
	var sequencia = []
//alert("entra com "+JSON.stringify(todasPecas)+" length "+todasPecas.length)
		while(todasPecas.length > 0){
			origem = todasPecas.pop()
//alert("A posicao comparada sera "+JSON.stringify(origem))
			candidatos = geraCandidatos(origem[0], origem[1], board.length-1)
			for(let i = 0; i < todasPecas.length; i++){
				for(let j = 0; j < candidatos.length; j++) {
//if((candidatos[j]).length>0) { alert("length "+candidatos[j].length}
//alert("vai comparar "+JSON.stringify(todasPecas[i])+" com "+JSON.stringify(candidatos[j]))
					if(JSON.stringify(todasPecas[i])==JSON.stringify(candidatos[j])){
//alert("entrou no if")
						if(cabeca == 0 || filhos.length==0){
							filhos = [origem]
							cabeca++
						filhos.push(todasPecas[i]); // alert("if novos filhos "+JSON.stringify(filhos));	
//alert("if novos filhos "+JSON.stringify(filhos))
						} else { filhos.push(todasPecas[i]); }// alert("else novos filhos "+JSON.stringify(filhos))}	

					}
				}
			}
			sequencia.push(filhos)
			filhos = []
		}
//		alert("sequencia sai com "+JSON.stringify(sequencia))
		return sequencia
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

