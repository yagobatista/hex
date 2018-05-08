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
	alert("proxima jogada Minimax")
                //aiMove(board);
		aiCutOff(board, -1)
		//alert("calcula")
//		calculaPontos(board, -1)
	    if(gameOver(board, -1)){
		fimJogo = true
		alert("A IA com MiniMax ganhou")
	} else {
	alert("proxima jogada BuscaLargura")
		aiMinimax(board, 1)
		//                aiMoveLargura(board);
//		calculaPontos(board)
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
