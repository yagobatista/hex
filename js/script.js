function playerMove(board, line, column) {
    if (board[line][column] === 0) {
        markPosition(board, line, column);
        setTimeout(() => {
            aiMove(board);
        }, 1000);         
    }
}
function aiMove(board) {

}