function makeBoard(column) {
    for (let i = 0; i < column; i++) {
        document.getElementsByClassName('board')[0].innerHTML += '<div class="linha">';
        for (let i = 0; i < column; i++) {
            document.getElementsByClassName('board')[0].innerHTML += '<div class="lozango"></div>';
        }
        document.getElementsByClassName('board')[0].innerHTML += '</div>';
    }
}
function renderBoard(board) {
    // function to render de array of array witch is de board in de screen
    for (let i = 0; i < board[0].length; i++) {
        document.getElementsByClassName('board')[0].innerHTML += '<div class="linha">';
        for (let j = 0; j < board[i].length; j++) {
            document.getElementsByClassName('board')[0].innerHTML += '<div class="lozango"></div>';
        }
        document.getElementsByClassName('board')[0].innerHTML += '</div>';
    }
}