let buttonColours =["red","blue","green","yellow"]
let userClickedPattern=[];
let gamePattern=[];
let level=0;

let started=false;
//Generate random color
function nextSequence(){
    let randomNumber= Math.floor((Math.random()*4));
    
    let randomChosenColour =buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#level-title").text("Level "+level)
    level++;
    $("#"+randomChosenColour).fadeIn(50).fadeOut(50).fadeIn(50);
    playSound(randomChosenColour);

}

//check which btn got clicked
$(".btn").on("click", function(){
    userClickedPattern.push(this.id);
    playSound(this.id);
    animatePress(this.id);
    checkAnswer(userClickedPattern.length-1);
});


//check weather game is started or not
window.addEventListener("keypress",function(event){
    
    if((event.which===97 || event.which===65) && !started){
        nextSequence();
        started=true;
    }
})

//to play sound whenever user press on btn
function playSound(randomChosenColour)
{
    var audio= new Audio("sounds/"+randomChosenColour+".mp3");
    audio.play();

}


//Giving animation whenever use press btn
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed");    
    }, 100);
}


//Check weather user pressed correct btn or not 
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(gamePattern.length==userClickedPattern.length){
            userClickedPattern=[];
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }

    }
    else{
        level=0;
        gamePattern=[];
        userClickedPattern=[];
        $("#level-title").text("Game Over! pres A to restart")
        var audio= new Audio("sounds/wrong.mp3");
        started=false;
        audio.play();

    }
}