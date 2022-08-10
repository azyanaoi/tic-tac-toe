/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
const prompt = require('prompt-sync')({sigint: true});
const assert = require('assert');

function startGame() {
    

// The board object used to save the current status of a gameplay
let board = {
    1: ' ',
    2: ' ',
    3: ' ',
    4: ' ',
    5: ' ',
    6: ' ',
    7: ' ',
    8: ' ',
    9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    board[position] = mark;
}

// TODO: print the game board as described at the top of this code skeleton
function printBoard() {

    switchBoard = {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9'
    }

    for (let i in board) {
        if (board[i] != ' ') {
            switchBoard[i] = board[i];
        }
    }

    let gameboard = '\n' + 
    ' ' + switchBoard[1] + ' | ' + switchBoard[2] + ' | ' + switchBoard[3] + '\n' +

    '-----------' + '\n' +

    ' ' + switchBoard[4] + ' | ' + switchBoard[5] + ' | ' + switchBoard[6] + '\n' +

    '-----------' + '\n' +

    ' ' + switchBoard[7] + ' | ' + switchBoard[8] + ' | ' + switchBoard[9] + '\n';

    console.log(gameboard);
}

// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
// position is an input String
function isInteger(val) {
    let x;
    if (isNaN(val)) {
        return false;
    }
    x = parseFloat(val);
    return (x | 0) === x;
}

function validateMove(position) {
    return (isInteger(position) && board[position] === ' ')
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    let i;
    let j;
    let count;

    for (i = 0; i < winCombinations.length; i++) {
        count = 0;
        for (j = 0; j < winCombinations.length; j++) {
            if (board[winCombinations[i][j]] === player) {
                count++;
            }
            if (count ===3) {
                return true;
            } 
        }

    }
    return false;
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    for (let i = 1; i <= Object.keys(board).length; i++) {
        if (board[i] === ' ') {
            return false;
        }
    }
    return true;
}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc

function playTurn(player) {
   
    let move = prompt(player + "'s turn, input > ");

    while (!validateMove(move)) {
        console.log("Invalid input. Try again with other number > ");
        move = prompt(player + "'s turn, input > ");

    }

    markBoard(move, player);
    if (checkWin(player) || checkFull()) {
        winnerIdentified = true;
    }
}

// entry point of the whole program
console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

let winnerIdentified = false
let currentTurnPlayer = 'X'

while (!winnerIdentified){
    playTurn(currentTurnPlayer);
    // feel free to add logic here if needed, e.g. announcing winner or tie
    printBoard();

    if(winnerIdentified) {
        
        if (checkWin(currentTurnPlayer) === true) {
            console.log("Congrats " + currentTurnPlayer + "! You win!");

        } else if (checkFull()) {
            console.log("Aww. It's a tie. ");
        }
        
    } else {
        if (currentTurnPlayer == 'X') {
            currentTurnPlayer = 'O';

        } else {
            currentTurnPlayer = 'X';
        }
    }
}


// Bonus Point: Implement the feature for the user to restart the game after a tie or game over
const playAgain = prompt("Next round?? ^.^  y / n = ");

    if( playAgain == 'y'){
        startGame();
    } else if (playAgain == 'n'){
        console.log("Thank you for playing. See you again! ")
    }
}

startGame();

