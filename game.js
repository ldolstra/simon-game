var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;


$(document).on("keydown", function() {
  if (level === 0) {
    $("#level-title").text("Level " + level);
    nextSequence();

  }
});



//Adds a new random color to sequence
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  var lastColour = "#" + gamePattern[gamePattern.length - 1];

  $(lastColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(lastColour);

  level++;
  $("#level-title").text("Level " + level);


}

//Click event for when player clicks a button
$(".btn").on("click", function(event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);

  animatePressed("#" + userChosenColour);
  console.log(userClickedPattern);
  playSound("#" + userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});


//Animates the clicked button
function animatePressed(currentColour) {
  $(currentColour).addClass("pressed");
  setTimeout(function() {
    $(currentColour).removeClass("pressed");
  }, 100)
}



//function to play sound of the buttons
function playSound(name) {
  switch (name) {
    case "#blue":
      var blueSound = new Audio('sounds/blue.mp3');
      blueSound.play();
      break;

    case "#red":
      var redSound = new Audio('sounds/red.mp3');
      redSound.play();
      break;

    case "#yellow":
      var yellowSound = new Audio('sounds/yellow.mp3');
      yellowSound.play();
      break;

    case "#green":
      var greenSound = new Audio('sounds/green.mp3');
      greenSound.play();
      break;

    default:
      console.log("other");
  }
}


function checkAnswer(currentLevel) {
  console.log(currentLevel);
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 2000);
      userClickedPattern = [];
    }
  } else {
    //game over

    var wrongSound = new Audio('sounds/wrong.mp3');
    wrongSound.play();
    $("#level-title").text("GAME OVER");
    $(".scare").removeClass("hidden").addClass("skull-new");
    $(".container").addClass("hidden");
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
      gamePattern = [];
      userClickedPattern = [];
      level = 0;
      $(".scare").removeClass("skull-new").addClass("hidden");
      $(".container").removeClass("hidden");
      $("#level-title").text("Press any key to restart");

    }, 2000);

  }



}
