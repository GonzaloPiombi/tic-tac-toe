const player = (name, mark) => {
    return { name, mark };
}

const displayController = (() => {
    const pvpButton = document.querySelectorAll('button')[0];
    const pvAIButton = document.querySelectorAll('button')[1];
    const startButton = document.querySelectorAll('button')[2];

    pvpButton.addEventListener('click', () => {
        document.querySelector('.game-mode').style = 'display: none';
        document.querySelector('.pvp-mode').style = 'display: flex';
    });

    startButton.addEventListener('click', () => {
        player1.name = document.querySelectorAll('input')[0].value;
        player2.name = document.querySelectorAll('input')[1].value;
        document.querySelector('.pvp-mode').style = 'display: none';
        document.querySelector('.grid-container').style = 'display: grid';
    });

    document.querySelectorAll('.square').forEach(div => {
        div.addEventListener('click', e => {
            squareClicked = e.currentTarget;
            game.makeMark(squareClicked);
            game.checkWinner(e.currentTarget.dataset.index);
        })
    });
})();

const game = (() => {
    let moves = [];
    let squaresPlayed = [];
    let playerMove;
    let gameOver = false;
    //'rows' and 'columns' arrays have 3 values each, each one representing one row (from top to bottom) and one column (from left to right).
    let rows = [0, 0, 0];
    let columns = [0, 0, 0];
    //Each variable represents a square of the diagonals. Winning combinations would be squares 0, 4, 8 or 2, 4, 6.
    const d1 = document.querySelectorAll('.square')[0];
    const d2 = document.querySelectorAll('.square')[4];
    const d3 = document.querySelectorAll('.square')[8];
    const d4 = document.querySelectorAll('.square')[2];
    const d5 = document.querySelectorAll('.square')[6];

    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart game';

    const _checkPlayerTurn = () => {
        if (moves.length === 0 || moves[moves.length - 1] === 'o') {
            return playerMove = player1.mark;
        } else {
            return playerMove = player2.mark;
        }
    }

    const makeMark = square => {
        _checkPlayerTurn();
        if (square.textContent !== '' || gameOver) {
            return;
        } else {
            square.textContent = playerMove;
            moves.push(playerMove);
        }
    }

    const checkWinner = squareIndex => {
        if (squaresPlayed.includes(squareIndex)) return;
        squaresPlayed.push(squareIndex);
        if (gameOver) return;
        squareIndex = Number(squareIndex);
        const grid = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8]
        ];
        //Iterate through the grid array until it finds the index of 'squareIndex'.
        //If the player was player1 (playerMove === 'x') it will add 1 to the corresponding row in the rows array.
        //It will subtract 1 if the player was player2 (playerMove === 'o')/ 
        //If the row array reaches 3 in anyone of its values it means player1 won. If the row array reaches -3 in anyone of its values it means player2 won.
        for(let i = 0; i < grid.length; i++) {
            if (grid[i].indexOf(squareIndex) !== -1) {
                if (playerMove === 'x') {
                    rows[i] += 1;
                    if (rows[i] === 3) _gameOver(player1.name);
                    break;
                }
                else {
                    rows[i] -= 1;
                    if (rows[i] === -3) _gameOver(player2.name);
                    break;
                }
            }
        }
        //Check for 'squareIndex' in the grid array so the same process aplied to rows can be aplied to columns.
        for(let i = 0; i < grid.length; i++) {
            if (grid[i].indexOf(squareIndex) !== -1) {
                if (playerMove === 'x') {
                    columns[grid[i].indexOf(squareIndex)] += 1;
                    if (columns[grid[i].indexOf(squareIndex)] === 3) _gameOver(player1.name);
                    break;
                }
                else {
                    columns[grid[i].indexOf(squareIndex)] -= 1;
                    if (columns[grid[i].indexOf(squareIndex)] === -3) _gameOver(player2.name);
                    break;
                }
            }
        }
        _checkDiagonals();
        _checkTie();
    }

    const _checkDiagonals = () => {
        if ((d1.textContent === d2.textContent && d1.textContent === d3.textContent) && (d1.textContent === 'x')) {
            _gameOver(player1.name);
        } else if ((d1.textContent === d2.textContent && d1.textContent === d3.textContent) && (d1.textContent === 'o')) {
            _gameOver(player2.name);
        }
        
        if ((d4.textContent === d2.textContent && d4.textContent === d5.textContent) && (d4.textContent === 'x')) {
            _gameOver(player1.name);
        } else if ((d4.textContent === d2.textContent && d4.textContent === d5.textContent) && (d4.textContent === 'o')) {
            _gameOver(player2.name);
        }
    }

    const _checkTie = () => {
        if (gameOver) return;
        if (moves.length === 9) _gameOver();
    }

    const _gameOver = (player) => {
        gameOver = true;
        const winner = document.createElement('h2');
        document.querySelector('header').appendChild(winner);
        if (player) {
            winner.textContent = `${player} wins!`;
        } else {
            winner.textContent = 'It\'s a tie!';
        }
        document.querySelector('.grid-container').appendChild(restartButton);
        restartButton.addEventListener('click', () => {
            moves = [];
            squaresPlayed = [];
            rows = [0, 0, 0];
            columns = [0, 0, 0];
            document.querySelectorAll('.square').forEach(div => div.textContent = '');
            gameOver = false;
            winner.remove();
        })
    }

    return { makeMark, checkWinner };
})();

const player1 = player('Player 1', 'x');
const player2 = player('Player 2', 'o');