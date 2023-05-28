   
     
     let totalGames = 1;
     let gameType; // gametype can be 1 , 2, or 3 amount of rounds to be played
     let bankRoll = 100, rounds = 0, userScord = 0, computerScord = 0; // userScord and computerScord are the number of rounds won within a game
     let userGameScore = 0, computerGameScore = 0; // ...GameScore number of games won
     let userTotalRoundScore = 0, computerTotalRoundScore = 0; //Total round score is number of rounds won between all games
     let btnRock = document.getElementById("rock");
     let btnPaper = document.getElementById("paper");
     let btnScissors = document.getElementById("scissors");


  
  // create the button event listeners then disable them, waiting for the user to
  // enter a bet amounts
  
  btnRock.addEventListener("click", function(){ 
    playRound("rock")});
  btnPaper.addEventListener("click", function(){
    playRound("paper")});
  btnScissors.addEventListener("click",function(){
    playRound("scissors")});

  btnRock.disabled = true;
  btnPaper.disabled = true;
  btnScissors.disabled = true;
  
  /**
   * a function which starts a game, which consists of 1, 2, or 3 rounds of rock paper scissors
   * @param {number} roundCount - optional parameter that will check to see if all the rounds of the game have been completed
   */
  function playGame(roundCount = 0){
    
    let selectedOption = $('input[name=options]:checked').val();

    if (selectedOption === 'option1'){
      gameType = 1;
    }else if (selectedOption === 'option2'){
      gameType = 2;
    }else if(selectedOption === 'option3'){
      gameType = 3;
    }
    // if rounds of game are complete, that means the user has won the game
    if (roundCount === gameType){
      gameOver("win");
    }
  }
    
  /**
   * a function which plays out a round of rock paper scissors according to the users choice
   * @param {string} userChoice - a different string gets passed in depending on what button (btnRock etc) calls this function
   */

  function playRound( userChoice) {
      rounds++;
      console.log("userChoice = " + userChoice);
      let random = randomNum(1,3);
      if(random === 1){
          computerChoice = "rock";
      }
      if(random === 2){
          computerChoice = "paper";
      }
      if(random === 3){
          computerChoice = "scissors";
      }
  
      let resultElement = document.getElementById("result");
      let result;
  
      if (userChoice === computerChoice) {
          result = "It's a tie!";
        } else if (
          (userChoice === "rock" && computerChoice === "scissors") ||
          (userChoice === "paper" && computerChoice === "rock") ||
          (userChoice === "scissors" && computerChoice === "paper")
        ) {
          result = "You win!";
          userScord ++;
          userTotalRoundScore++;
        } else {
          result = "You lose!";
          computerScord++;
          computerTotalRoundScore++;
        }
  
      resultElement.textContent ="Round " + rounds + " of Game " + totalGames + ":   " + result;
      //$("#yourChoiceDisplay").html(userChoice);
      //$("#computerChoiceDisplay").html(computerChoice);
      if(userChoice==="rock") $('#picUserChoice').attr('src', 'pics/rock.png');
      if(userChoice==="paper") $('#picUserChoice').attr('src', 'pics/paper.png');
      if(userChoice==="scissors") $('#picUserChoice').attr('src', 'pics/scissors.png');
  
      if(computerChoice==="rock") $('#picComChoice').attr('src', 'pics/rock.png');
      if(computerChoice==="paper") $('#picComChoice').attr('src', 'pics/paper.png');
      if(computerChoice==="scissors") $('#picComChoice').attr('src', 'pics/scissors.png');
  
      $("#result1").html(userScord);
      $("#result2").html(computerScord);
      $("#resultsURounds").html(userTotalRoundScore);
      $("#resultsUGames").html(userGameScore);
      $("#resultsCRounds").html(computerTotalRoundScore);
      $("#resultsCGames").html(computerGameScore);
      
      //if the computer has won, gameOver function is called with lose
      // if user has won playGame function is called to check if rounds of game are complete

      if (computerScord > 0){
        gameOver("lose");
      } else {
        playGame(userScord);
      }
  }
  
  /**
   * generates a random number
   * @param {number} min 
   * @param {number} max 
   * @returns a number at random between min and max
   */

  function randomNum(min,max) {
      return Math.floor(Math.random()*(max-min+1))+min;
  } 
   
  /**
   * function is called when a win or loss condition has been reached and makes changes to the page
   * @param {string} winOrLoss
   */

  function gameOver(winOrLoss){
    totalGames++;
    rounds = 0;
    let betAmount = parseFloat($('#betAmount').val());
    if (winOrLoss === "win"){
      userGameScore++;
      $("#resultsUGames").html(userGameScore);
      let selectedOption = $('input[name=options]:checked').val();

      if (selectedOption === 'option1'){
        bankRoll += (betAmount * 2);
      }else if (selectedOption === 'option2'){
        bankRoll += (betAmount * 7);
      }else if(selectedOption === 'option3'){
        mysteryPrize();
      }
      $('#betAmount').val("");
    } else if (winOrLoss === "lose"){
      computerGameScore++;
      $("#resultsCGames").html(computerGameScore);
      bankRoll -= (betAmount);
      $('#betAmount').val("");
    }
    bankRoll = parseFloat(bankRoll.toFixed(2)); // cut off extra decimals if present
    userScord = 0;
    computerScord = 0;
    $('#bankRoll').text(`Bankroll = $${bankRoll}`);
    $('#playerBox').css('opacity', '50%');
    $('#rock').prop('disabled', true);
    $('#paper').prop('disabled', true);
    $('#scissors').prop('disabled', true);
    $('#startGame').prop('disabled', false);
    $('#betAmount').prop('disabled', false);
    $('input[type="radio"]').prop('disabled', false);
    $('#roundForm').css('background-color', '#298AC4')
    $('#roundForm').css('border', '2px solid red')
    $('#betAmount').css('border', '2px solid red')
    $('#startGame').css('border', '2px solid red')

  }


/**
 * function called if user has won 3 games in a row
 */
function mysteryPrize(){
$('.rps').hide();
$('.mystery').show();
}
   

   
   
   
// generate a avatar image
$('#generateButton').click(function() {
 let randomNumber = Math.floor(Math.random() * 100);  // Generate random number
 let avatarUrl = 'https://avatars.dicebear.com/api/avataaars/' + randomNumber + '.svg';
 $('.avatarImage').attr('src', avatarUrl);
 $('#instrAvatar').show();
});


// start game button, checks all fields are filled then changes the page accordingly
$('#startGame').on('click', function() {
  if (bankRoll <= 0){
    alert("Out of money - you'll have to reset");
    return;
  }
  else if (isNaN(parseFloat($('#betAmount').val())) 
  || parseFloat($('#betAmount').val()) <= 0
  ){
    alert("Please enter a valid bet amount.")
    return;

  } else if (parseFloat($('#betAmount').val()) > bankRoll){
    alert("You can't bet money you don't have!");
    return;
  }
  else {
  $('#playerBox').css('opacity', '100%');
  $('#rock').prop('disabled', false);
  $('#paper').prop('disabled', false);
  $('#scissors').prop('disabled', false);
  $('#startGame').prop('disabled', true);
  $('#betAmount').prop('disabled', true);
  $('input[type="radio"]').prop('disabled', true);
  $('#roundForm').css('background-color', '#5A5A5A')
  $('#roundForm').css('border', 'none')
  $('#betAmount').css('border', 'none')
  $('#startGame').css('border', 'none')
  }
});

// instructions button
$('#newInstruct').on('click', function() {
  $('.rps').hide();
  $('.playInstructions').show();
});

// return to gameplay button
$('#return').on('click', function() {
  $('.playInstructions').hide();
  $('.rps').show();
});

// reset button and resetMysterybutton
$('#reset').on('click', function() {
  location.reload();
});
$('#resetMystery').on('click', function() {
  location.reload();
});
   
   
   
// Event listener to start game and prompt for rounds to be played
$('.start').on("click", function() {  $('.result').empty();
$('.start').hide();
$('.instructions').hide();
$('h1').text("Let's Play Rock Paper Scissors Risk!");
$(".rps").show();
$('#roundForm').css('border', '2px solid red')
$('#betAmount').css('border', '2px solid red')
$('#startGame').css('border', '2px solid red')
if ($("#gameAvatar").attr("src") === "blank"){ // see if the player has chosen an opponent
  let anonPara = $('<p>Anonymous Opponent</p>');
  $("#gameAvatar").replaceWith(anonPara);
}else {
$("#gameAvatar").show();
}
});
