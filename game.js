$(document).ready(function() {
  // set variables
  const choices = ['rock', 'paper', 'scissors'];
  let totalGames;
  let currentGame = 1;
  let playerScore = 0;
  let computerScore = 0;
  let tieScore = 0;
  let gameFinished = false;


// Prompt the player for the number of games and validate the input
function promptTotalGames() {
  do {
    totalGames = parseInt(prompt("How many games do you want to play? (1-30)"));
  } while (isNaN(totalGames) || totalGames <= 0 || totalGames > 30);
}
 promptTotalGames();

// Function to generate computer's choice
  function computerPlay() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

  // Function to determine the winner
  function playRound(playerSelection, computerSelection) {
    
    if (playerSelection === computerSelection) {
      tieScore++;
      return "It's a tie!";
    } else if (
      (playerSelection === 'rock' && computerSelection === 'scissors') ||
      (playerSelection === 'paper' && computerSelection === 'rock') ||
      (playerSelection === 'scissors' && computerSelection === 'paper')
    ) {
      playerScore++;
      return `<span class="win-text">Congratulation, you win!</span> ${playerSelection} beats ${computerSelection}`;
    } else {
      computerScore++;
      return `<span class="lose-text">Sorry, you lose!</span> ${computerSelection} beats ${playerSelection}`;
    }
  }

  // Function to play the game
  function game(playerSelection) {
    if (gameFinished) {
      return;
    }

    const computerSelection = computerPlay();
    const result = playRound(playerSelection, computerSelection);
    $('.result').append(`<p>Game ${currentGame}:<br>Player's Choice: ${playerSelection}<br>Computer's Choice: ${computerSelection}<br>Result: ${result}</p>`);

    currentGame++;

    if (currentGame > totalGames) {
      endGame();
    }
  }

  // Function to end the game and display the final score and winner
  function endGame() {
    let winner;
    let winnerColor;

    if (playerScore > computerScore) {
      winner = 'Player';
      winnerColor = 'green';
    } else if (playerScore < computerScore) {
      winner = 'Computer';
      winnerColor = 'red';
    } else {
      winner = 'It\'s a tie';
      winnerColor = 'orange';
    }

    $('.result').append(`<p>Final Score:<br>Player: ${playerScore}<br>Computer: ${computerScore}<br>Ties: ${tieScore}</p>`);
    $('.result').append(`<p>The winner is: <span style="color: ${winnerColor};">${winner}</span></p>`);
    $('.choices').prop('disabled', true);
    $('.play-again').show();
    gameFinished = true;
  }

  
  // Event listener for choice button
  $('.choice').click(function() {
    const playerSelection = $(this).data('choice');
    game(playerSelection);
  });

  // Hover effect on the click button
  $('.choice').hover(function() {
    $(this).addClass("highlight");
  }, function () {
    $(this).removeClass("highlight");
  });

  // Event listener for play again button
  $('.play-again').click(function() {
    $('.result').empty();
    $('.play-again').hide();
    currentGame = 1;
    playerScore = 0;
    computerScore =0;
    tieScore = 0;
    promptTotalGames();
    $('.choices').prop('disabled', false);
    $('.choices').show();
    gameFinished = false;
  });
}); 
