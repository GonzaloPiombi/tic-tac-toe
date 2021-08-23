const player = (name, mark) => {
    return { name, mark };
}

const gameBoard = (() => {
    document.querySelectorAll('.square').forEach(div => {
        div.addEventListener('click', e => {
            console.log(e);
            squareClicked = e.currentTarget;
            game._makeMark(squareClicked);
            game._checkWinner(e.currentTarget.dataset.index);
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

    const _makeMark = square => {
        _checkPlayerTurn();
        if (square.textContent !== '' || gameOver) {
            return;
        } else {
            square.textContent = playerMove;
            moves.push(playerMove);
        }
    }

    const _checkWinner = squareIndex => {
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
                    if (rows[i] === 3) {
                        alert('Player 1 wins');
                        _gameOver();
                    }
                    break;
                }
                else {
                    rows[i] -= 1;
                    if (rows[i] === -3) {
                        alert('Player 2 wins');
                        _gameOver();
                    }
                    break;
                }
            }
        }
        //Check for 'squareIndex' in the grid array so the same process aplied to rows can be aplied to columns.
        for(let i = 0; i < grid.length; i++) {
            if (grid[i].indexOf(squareIndex) !== -1) {
                if (playerMove === 'x') {
                    columns[grid[i].indexOf(squareIndex)] += 1;
                    if (columns[grid[i].indexOf(squareIndex)] === 3) {
                        alert('Player 1 wins');
                        _gameOver();
                    }
                    break;
                }
                else {
                    columns[grid[i].indexOf(squareIndex)] -= 1;
                    if (columns[grid[i].indexOf(squareIndex)] === -3) {
                        alert('Player 2 wins');
                        _gameOver();
                    }
                    break;
                }
            }
        }
        _checkDiagonals();
        _checkTie();
    }

    const _checkDiagonals = () => {
        if ((d1.textContent === d2.textContent && d1.textContent === d3.textContent) && (d1.textContent === 'x')) {
            alert('Player 1 wins');
            _gameOver();
        } else if ((d1.textContent === d2.textContent && d1.textContent === d3.textContent) && (d1.textContent === 'o')) {
            alert('Player 2 wins');
            _gameOver();
        }
        
        if ((d4.textContent === d2.textContent && d4.textContent === d5.textContent) && (d4.textContent === 'x')) {
            alert('Player 1 wins');
            _gameOver();
        } else if ((d4.textContent === d2.textContent && d4.textContent === d5.textContent) && (d4.textContent === 'o')) {
            alert('Player 2 wins');
            _gameOver();
        }
    }

    const _checkTie = () => {
        if (gameOver) return;
        if (moves.length === 9) {
            alert('Tie!');
            _gameOver();
        }
        // let counter = 0;
        // for (let i = 0; i < document.querySelectorAll('.square').length; i++) {
        //     if (document.querySelectorAll('.square')[i].textContent !== '') {
        //         counter++;
        //     }
        // }
        // if (counter === 9) {
        //     alert('Tie!');
        //     _gameOver();
        // }
    }

    const _gameOver = () => {
        gameOver = true;
        document.querySelector('.grid-container').appendChild(restartButton);
        restartButton.addEventListener('click', () => {
            moves = [];
            squaresPlayed = [];
            rows = [0, 0, 0];
            columns = [0, 0, 0];
            document.querySelectorAll('.square').forEach(div => div.textContent = '');
            gameOver = false;
        })
    }

    return { _makeMark, _checkWinner };
})();

const player1 = player('Player 1', 'x');
const player2 = player('Player 2', 'o');