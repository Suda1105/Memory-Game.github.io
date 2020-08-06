var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red","blue","green","yellow"];
var started = false;
var level = 0;
$(document).keypress(function(){
    if(!started){
        $("h1").html("Level "+level);
        nextSequence();
        started = true;
    }
  
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //playSound(userChosenColour);
    animatePressed(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence()
{
    level++;
    userClickedPattern = [];
    $("h1").html("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);  
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel] )
    {
        
        if(gamePattern.length === userClickedPattern.length)
        {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        var obj = new Audio("sounds/wrong.mp3");
        obj.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");  
        }, 200);
        $("h1").html("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    started = false;
    level = 0;
    gamePattern = [];
}

function animatePressed(currentColour){
    var activeButton = $("."+currentColour);
    activeButton.addClass("pressed");
    setTimeout(function()  {
        activeButton.removeClass("pressed");
    }, 100);
    
}

function playSound(name){
    var obj = new Audio("sounds/"+name+".mp3");
    obj.play();
}




