console.log("rockPaperScissors.js loaded");

let rounds = 0, userScord = 0, computerScord = 0;
let btnRock = document.getElementById("rock");
let btnPaper = document.getElementById("paper");
let btnScissors = document.getElementById("scissors");

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