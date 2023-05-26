   
     
     let totalGames;
     let rounds = 0, userScord = 0, computerScord = 0;
     let btnRock = document.getElementById("rock");
     let btnPaper = document.getElementById("paper");
     let btnScissors = document.getElementById("scissors");


     // Prompt the player for the number of games and validate the input
function promptTotalGames() {
    do {
      totalGames = parseInt(prompt("How many games do you want to play? (1-30)"));
    } while (isNaN(totalGames) || totalGames <= 0 || totalGames > 30);
  }
  

  
  btnRock.addEventListener("click", function(){ 
    playGame("rock")});
  btnPaper.addEventListener("click", function(){
    playGame("paper")});
  btnScissors.addEventListener("click",function(){
    playGame("scissors")});
  
  function playGame( userChoice) {
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
        } else {
          result = "You lose!";
          computerScord++
        }
  
      resultElement.textContent = rounds + ":   " + result;
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
  }
  
  function randomNum(min,max) {
      return Math.floor(Math.random()*(max-min+1))+min;
  } 
   
   

   
   
   
// generate a avatar image
$('#generateButton').click(function() {
 let randomNumber = Math.floor(Math.random() * 100);  // Generate random number
 let avatarUrl = 'https://avatars.dicebear.com/api/avataaars/' + randomNumber + '.svg';
 $('.avatarImage').attr('src', avatarUrl);
 $('#instrAvatar').show();
});

//hover for the start, instructions, reset button
$('.configure').hover(function() {
  $(this).addClass("highlight");
}, function () {
  $(this).removeClass("highlight");
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

// reset button
$('#reset').on('click', function() {
  location.reload();
});
   
   
   
// Event listener to start game and prompt for rounds to be played
$('.start').on("click", function() {  $('.result').empty();
$('.start').hide();
$('.instructions').hide();
$('h1').text("Let's Play Rock Paper Scissors!");
$(".rps").show();
if ($("#gameAvatar").attr("src") === "blank"){ // see if the player has chosen an opponent
  let anonPara = $('<p>Anonymous Opponent</p>');
  $("#gameAvatar").replaceWith(anonPara);
}else {
$("#gameAvatar").show();
}
currentGame = 1;
playerScore = 0;
computerScore =0;
tieScore = 0;
promptTotalGames();
gameFinished = false;

});