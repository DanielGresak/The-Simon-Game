var buttonColors = ["red", "blue", "green", "yellow"];

//The array that stores the random sequence that is the correct
var gamePattern = [];

//The array that stores the users answer for each particular round
var userClickedPattern = [];

//Game level
var level = 0;


var gameStarted = false;

//This begins the game
$(document).keydown(function() {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
})
$("#level-title").click(function() {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }else{
    console.log("test");
  }
})

// This is the next sequence everytime the play begins or moves to the next level
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  var audio = new Audio("sounds/" + randomChosenColor + ".mp3")
  audio.play();
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  $("#level-title").text("Level " + level);
  level++
}


//Click function listens for a users click
$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  var audio = new Audio("sounds/" + userChosenColor + ".mp3")
  audio.play();
  $("#" + userChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  animatePress(userChosenColor);
  checkAnswer();
});

//animatePress is for the animations when a user clicks a button
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//checkAnswer checks the user's answer is correct and reacts accordingly
function checkAnswer(lastColor) {
  if (gamePattern.length === userClickedPattern.length) {
    if (userClickedPattern[userClickedPattern.length - 1] === gamePattern[userClickedPattern.length - 1]) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    } else {
      gameOver();
    }

  } else {
    if (userClickedPattern[userClickedPattern.length - 1] === gamePattern[userClickedPattern.length - 1]) {} else {
      gameOver();
    }
  }
}

//gameOver resets the game and plays the animations/sounds for when the game is over.
function gameOver() {
  userClickedPattern = [];
  gameStarted = false;
  gamePattern = [];
  level = 0;
  var wrongSound = new Audio("sounds/wrong.mp3");
  wrongSound.play();
  mobile();
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
};


var windowSize = $(window).width();
function mobile(){

  if(windowSize < 700){
    $("#level-title").text("Game over, Tap Here to Restart!")
  }else{
    $("#level-title").text("Game over, Press Any Key to Restart!")
  }
}
