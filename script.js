const player = (name, mark) => {
    return { name, mark };
}

const gameBoard = (() => {
    const _createDiv = () => newDiv = document.createElement('div');
    const createGrid = () => {
        for(let i = 0; i < 9; i++) {
            _createDiv();
            newDiv.classList.add('square');
            document.querySelector('.grid-container').appendChild(newDiv);
        }
    }
    return { createGrid };
})();

const game = (() => {
    let moves = [];
    let playerTurn;

    const addClickEvent = () => {
        document.querySelectorAll('.square').forEach(div => {
            div.addEventListener('click', (e) => {
                squareClicked = e.currentTarget;
                _makeMark(squareClicked);
            });
        });
    }

    const _checkPlayerTurn = () => {
        if (moves.length === 0 || moves[moves.length - 1] === 'o') {
            return playerTurn = player1.mark;
        } else {
            return playerTurn = player2.mark;
        }
    }

    const _makeMark = square => {
        _checkPlayerTurn();
        if (square.textContent !== '') {
            return;
        } else {
            square.textContent = playerTurn;
            moves.push(playerTurn);
        }
    }

    return { addClickEvent };
})();

const player1 = player('Player 1', 'x');
const player2 = player('Player 2', 'o');
gameBoard.createGrid();
game.addClickEvent();