var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 1;
var started = 0;

$(document).keydown(function() {
  if (started === 0) {
    setTimeout(function() {
      nextSequence();
    }, 400);
  }
});

function playGamePattern(i) {
  setTimeout(function() {
    animatePress(gamePattern[i]);
    playSound(gamePattern[i]);
  }, 400 * i);
}

function nextSequence() {
  started++;
  $("h1").html("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  for (var i = 0; i < gamePattern.length; i++) {
    playGamePattern(i);
  }

  level++;

}


//plays sound and animates user click
$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  animatePress(userChosenColor);
  playSound(userChosenColor);

  // Calls checkAnswer after clicking through sequence
  var userIndex = userClickedPattern.length - 1;
  if (userClickedPattern.length === gamePattern.length) {
    checkAnswer(userIndex);
  }
});

//Plays sound
function playSound(name) {
  var buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.play();
}

//Animate button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100);
};
//checks answer
function checkAnswer(currentLevel) {
  for (var i = 0; i < gamePattern.length - 1; i++) {
    if (userClickedPattern[i] !== gamePattern[i]) {
      endGame();
      return;
    }
  }

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    userClickedPattern = [];

    setTimeout(function() {
      nextSequence();
    }, 1000);

  } else {
    endGame();
    return;
  }
};

function endGame() {
  level = 1;
  gamePattern = [];
  userClickedPattern = [];
  started = 0;

  $(document.body).addClass("game-over");
  setTimeout(function() {
    $(document.body).removeClass("game-over");
  }, 200);

  setTimeout(function(){
    $("h1").text("Game Over");
    setTimeout(function(){
      $("h1").text("Press A Key To Restart")
    }, 1000);
  },);
}
