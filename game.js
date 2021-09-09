var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = []; // array of the random colors
var userClickedPattern = []; // array of the choices of the user
var level = 0;

//When key on the keyboard pressed, its call nextSequence
$("body").keydown(function() {
  if (level === 0) {
    nextSequence();
  }
});

//When button clicked, save the color that was clicked, add it to the array of user choise
//and play sound+animation of the button.
//if Game started, call to nextSequence
//call checkAnswer with the index of the last choise in the Array
  $(".btn").click(function() {
    if (level > 0){
      var userChosenColour = this.id;
      userClickedPattern.push(userChosenColour);
      playSound(userChosenColour);
      animatePress(userChosenColour);
      checkAnswer(userClickedPattern.length - 1);
    }
  });


//This function get the last index of the user choices
function checkAnswer(currentLevel) {
  //if the last choice of the user equal to the last random pick of color
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
  // if the length of them is equal, call to nextSequence
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");

    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    level=0;
    gamePattern=[];
  }

}

// Pick random color, then push it to the gamePattern Array,
// making Flash on this random color and play sound
// increase the level and change the h1 according to the level
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// just function that play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// just function that make animation
function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");

  }, 100);
}
