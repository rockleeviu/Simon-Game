var buttonColours = ["red", "blue", "green", "yellow"]; //creating an array that holds the colours named buttonColours

var gamePattern = []; // creating an empty aray named gamePattern
var userClickedPattern = []; // creating an empty array named userClickedPattern

var started = false; // creating a variable to identify if the game has started or not
var level = 0; // creating a variable named level that starts at level 0

$(document).keydown(function() { //Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
  if(!started) {
    $("#level-title").text("Level " + level);  //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() { //creating a function that uses a handler function when one of the 4 buttons is clicked

   var userChosenColour = $(this).attr("id"); //inside the handler function, created a variable that holds the id of the selected button that got clicked
   userClickedPattern.push(userChosenColour); //adding the color chosen by user in the userClickedPattern array

   playSound(userChosenColour); //calling a method that gets to play a sound for the random chosen colour
   animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1); //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
 });

 function checkAnswer(currentLevel) { //1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {   //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
     if (userClickedPattern.length === gamePattern.length) { //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
       setTimeout(function () { //5. Call nextSequence() after a 1000 millisecond delay.
         nextSequence();
       }, 1000);
     }
   } else {
     playSound("wrong"); //1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
     $("body").addClass("game-over");
     $("#level-title").text("Game Over, Press Any Key to Restart"); //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.

     setTimeout(function(){
       $("body").removeClass("game-over");
     }, 200); //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.

     startOver(); //2. Call startOver() if the user gets the sequence wrong.
   }
 }

function nextSequence() { //creating a function named nextSequence
  userClickedPattern = []; //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  level++; //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  $("#level-title").text("Level " + level); //5. Inside nextSequence(), update the h1 with this change in the value of level.
  var randomNumber = Math.floor(Math.random() * 4); //creating a number that gets a value between 0-3
  var randomChosenColour = buttonColours[randomNumber]; // creating a variable that selects a random color
  gamePattern.push(randomChosenColour); // inserting the variable that holds a random color into the empty array

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //adding a fade design to the random color selected
  playSound(randomChosenColour); //Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button
}

  function animatePress (currentColour) {
    $("#" + currentColour).addClass("pressed"); //adding a pressed class from css to the current button
    setTimeout(function () {
      $("#" + currentColour).removeClass("pressed");
    },100);
  }

  function playSound (name) { // creating a function that gets to play the sound of the named color
    var audio = new Audio ("sounds/" + name + ".mp3");
    audio.play(); //creating a variable audio that plays the random chosen color generated for the selected colour
 }

  function startOver() {
    level = 0;
    gamePattern = [];
    started = false; //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  }
