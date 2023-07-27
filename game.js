var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$("body").keydown(function (key) {
  if (key.key == 'a' && started == false) {
    nextSequence();
    started = true;
  }
});

$("h1").click(function(){
    if(!started){
      nextSequence();
      started = true;
    }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChoosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);
  $("#" + randomChoosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColor);
  $("#level-title").text("level " + level);
  userClickedPattern = [];
}

function playSound(name) {
  var audio = new Audio('./sounds/' + name + '.mp3')
  audio.play();
}

function animatePress(choosenColor) {
  $("#" + choosenColor).addClass("pressed");
  setTimeout(function () {
    $("#" + choosenColor).removeClass("pressed");
  }, 100);

}

function checkAnswer(current) {
  if (userClickedPattern[current] !== gamePattern[current]) {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over! Click here to Start");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    backToLevel1();
  }

  else {

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000)

    }
  }

}

function backToLevel1() {
  gamePattern = [];
  level = 0;
  started = false;

}