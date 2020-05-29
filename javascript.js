// variables
var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;
//click on the start/reset button
document.getElementById("startreset").onclick = function() {
  if (playing == true) {
    location.reload();
  } else {
    //change the boolin to true to be able to reset the game
    playing = true;
    //if we are not playing
    //set the score to zero
    score = 0;
    document.getElementById("scoreValue").innerHTML = score;
    //hide the game over box
    hide("gameOver");
    //show the countdown box
    show("timeremaining");
    //change the start button to reset
    document.getElementById("startreset").innerHTML = "Reset Game";
    timeremaining = 60;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;
    // start Countdown
    startCountdown();
    // Genarete QA
    genarateQA();
  }
};

//if click on a answer box
for (i = 1; i < 5; i++) {
  document.getElementById("box" + i).onclick = function() {
    //Are we playing
    if (playing == true) {
      //yes
      if (this.innerHTML == correctAnswer) {
        score++;
        document.getElementById("scoreValue").innerHTML = score;
        hide("wrong");
        show("correct");
        setTimeout(function() {
          hide("correct");
        }, 1000);
        //genarate new Q&A
        genarateQA();
      } else {
        hide("correct");
        show("wrong");
        setTimeout(function() {
          hide("wrong");
        }, 1000);
      }
    }
  };
}
//Are you playing??
//No --> no action
//yes -->
//It is the correct answer??
// No --> show the try again box for 1 sec
// yes -->
//show the correct box for 1 sec
//generate new question
//add score by 1

//functions
//start countdown
function startCountdown() {
  action = setInterval(function() {
    timeremaining -= 1;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;
    if (timeremaining == 0) {
      stopCountdown();
      show("gameOver");
      document.getElementById("gameOver").innerHTML =
        "<p>game over!</p><P>your score is " + score + "</p>";
      hide("timeremaining");
      hide("correct");
      hide("wrong");
      document.getElementById("startreset").innerHTML = "Start Game";
      playing = false;
    }
  }, 1000);
}
//stop countdown
function stopCountdown() {
  clearInterval(action);
}
//set display property to none
function hide(Id) {
  document.getElementById(Id).style.display = "none";
}
//set display property to block
function show(Id) {
  document.getElementById(Id).style.display = "block";
}

//getarete question and multiple answer
function genarateQA(params) {
  var x = Math.round(Math.random() * 9) + 1;
  var y = Math.round(Math.random() * 9) + 1;
  correctAnswer = x * y;
  document.getElementById("question").innerHTML = x + "x" + y;
  var correctPositon = Math.round(Math.random() * 3) + 1;
  document.getElementById("box" + correctPositon).innerHTML = correctAnswer;
  var answers = [correctAnswer];
  for (i = 1; i < 5; i++) {
    if (i !== correctPositon) {
      var wrongAnswer;
      do {
        wrongAnswer =
          (Math.round(Math.random() * 9) + 1) *
          (Math.round(Math.random() * 9) + 1);
      } while (answers.indexOf(wrongAnswer) > -1);
      document.getElementById("box" + i).innerHTML = wrongAnswer;
    }
  }
}
