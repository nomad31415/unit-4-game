'use strict';

// Global variabls -> not many.

let crystals = [0, 0, 0, 0];
let crystalClicked = 0;
let reducedArray = 0;

let wins = 0;
let losses = 0;
let targetNum = 0;
let userNum = [0];


// When page loads start a new game
$(document).ready(function() {
    startNewGame();
});

// Generate new random numbers for targetNum and Crystals, append targetNum to DOM and start the game
const startNewGame = function() {
    genRandomNum();
    resetDOM();
    gameLevel();
};

// Generate random number between 19-120 for the targetNum and between 1-12 for all for crystals
const genRandomNum = function() {
    targetNum = Math.floor(Math.random() * 101) + 19;
    for (let i = 0; i < 4; i++) {
        crystals[i] = Math.floor(Math.random() * 12) + 1;
    }
};

// Append wins, losses, targetNum and the current userNum to the DOM
const resetDOM = function() {
    $('.wins').text(wins);
    $('.losses').text(losses);
    userNum[0] = 0;
    $('.users-num').text(userNum[0]);
    $('.target-num').text(targetNum);
};

// The Game over display to DOM on lossing game termination
const gameOver = function() {
    $(".wins").empty();
    $(".losses").text("Game Over");
};

// You win display to DOM on winning game termination
const finalWin = function() {
    $(".losses").empty();
    $(".wins").text("You Won!");
};

// Listenig for event when a crystal image is clicked
const gameLevel = function() {
    $('.crystal').click(function() {
        // Grab the value attribute of the specific crystal imaged clicked and parse it to an integer, 
        // set it to varible crystalClicked
        crystalClicked = parseInt($(this).attr("value"));
        // Push that specific crystal's random number to the userNum array. 
        // Note: crystalClick minus 1 is to account for zero index of crystals array. 
        userNum.push(crystals[crystalClicked-1]);
        // Reduce userNum array to reducedArray variable
        reducedArray = userNum.reduce(function(accu, elem) {
            return accu + elem;
        }, 0);
        // Clear userNum array and reset zero index to reducedArray number. Update userNum in the DOM.
        userNum = [];
        userNum[0] = reducedArray;
        $('.users-num').text(userNum[0]);
        // Check for a win or loss. Max wins and losses before game terminates is 9 times, respectively.
        if (userNum[0] === targetNum) {
            wins++;
            if (wins > 9) {
                $('.crystal').off('click');
                finalWin();
                return;
            };
            $('.crystal').off('click');
            startNewGame();
        } else if (userNum[0] > targetNum) {
            losses++;
            if (losses > 9) {
                $('.crystal').off('click');
                gameOver();
                return;
            };
            $('.crystal').off('click');
            startNewGame();
        }
    });
};

