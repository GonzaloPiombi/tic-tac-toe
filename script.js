const player = (name, mark) => {
    return { name, mark };
}

const gameBoard = (() => {
    const _createDiv = () => newDiv = document.createElement('div');
    const createGrid = () => {
        for(let i = 0; i < 9; i++) {
            _createDiv();
            newDiv.classList.add('square');
            newDiv.setAttribute('data-index', i);
            document.querySelector('.grid-container').appendChild(newDiv);
        }
    }
    return { createGrid };
})();

const game = (() => {
    let moves = [];
    let playerMove;
    const rows = [0, 0, 0];
    const columns = [0, 0, 0];

    const addClickEvent = () => {
        document.querySelectorAll('.square').forEach(div => {
            div.addEventListener('click', function clicked(e) {
                squareClicked = e.currentTarget;
                squareClicked.removeEventListener(e.type, clicked);
                _makeMark(squareClicked);
                _checkWinner(e.currentTarget.dataset.index);
            });
        });
    }
  
    const _checkPlayerTurn = () => {
        if (moves.length === 0 || moves[moves.length - 1] === 'o') {
            return playerMove = player1.mark;
        } else {
            return playerMove = player2.mark;
        }
    }

    const _makeMark = square => {
        _checkPlayerTurn();
        if (square.textContent !== '') {
            return;
        } else {
            square.textContent = playerMove;
            moves.push(playerMove);
        }
    }

    const _checkWinner = squareIndex => {
        squareIndex = Number(squareIndex);
        const grid = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8]
        ];

        for(let i = 0; i < grid.length; i++) {
            if (grid[i].indexOf(squareIndex) !== -1) {
                if (playerMove === 'x') {
                    rows[i] += 1;
                    if (rows[i] === 3) return alert('Player 1 wins');
                }
                else {
                    rows[i] -= 1;
                    if (rows[i] === -3) return alert('Player 2 Wins');
                }
            }
        }

        for(let i = 0; i < grid.length; i++) {
            if (grid[i].indexOf(squareIndex) !== -1) {
                if (playerMove === 'x') {
                    columns[grid[i].indexOf(squareIndex)] += 1;
                    if (columns[grid[i].indexOf(squareIndex)] === 3) return alert('Player 1 wins');
                }
                else {
                    columns[grid[i].indexOf(squareIndex)] -= 1;
                    if (columns[grid[i].indexOf(squareIndex)] === -3) return alert('Player 2 wins');
                }
            }
        }
    }

    return { addClickEvent };
})();

const player1 = player('Player 1', 'x');
const player2 = player('Player 2', 'o');
gameBoard.createGrid();
game.addClickEvent();