var gameStarted = false;
var gameOver = false;

var originalHeadingText = $("h1").text();
var originalLevelText = $("p.level").text();
var gameButtons = document.querySelectorAll(".gamebutton");
var generatedSequence = [];
var playerSequence = [];

var i = 0;

$("#playSimon").click( (btn) => {
    if ( gameOver !== true && i < 1 && gameStarted === false ) {
        btn.target.textContent = "reset";
        $(".game-buttons-container").animate({opacity: 1}, 200);
        $("p.level").text("Level: 1");
        setTimeout( () => {
            $(".gamebutton").removeClass("disabled");
            simonGame();
        },500)
        gameStarted = true;
    } else if ( gameOver !== true && gameStarted === true  ) {
        btn.target.textContent = "play";
        resetGame();                      
    } else {
        btn.target.textContent = "play";
        resetGame();
    }
})

$(".gamebutton").click( function () {
    $(this).animate({opacity: 0.5}, 150);
    $(this).animate({opacity: 1}, 150);
})

function resetGame () {
    playerSequence = [];
    generatedSequence = [];
    i = 0;
    gameStarted = false;
    gameOver = false;
    $("h1").text(originalHeadingText);
    $("p.level").text(originalLevelText);
    $(".game-buttons-container").animate({opacity: 0.7});
}

function simonGame () {
    randomIndex = generateRandomNumber();
    thisTurnButton = $(gameButtons)[randomIndex];
    $(thisTurnButton).fadeOut(150).fadeIn(150);
    generatedSequence.push(thisTurnButton.title);
    $("p.level").text("Level: " + generatedSequence.length );
}

$(".gamebutton").click( function (btn) {
    if ( btn.target.title !== generatedSequence[i] ) {
        gameOver = true;
        $(".gamebutton").addClass("disabled");
        playerSequence.push(btn.target.title);
        $("h1").text("Game over!");
        $(".game-buttons-container").animate({opacity: 0.5});
        console.log("NOPE");
        console.log(generatedSequence);
        console.log(playerSequence);
    } else {
        if ( i === generatedSequence.length-1 ) {
            i = 0;
            setTimeout( simonGame, 500);            
            playerSequence = [];
            console.log("Correto");
            console.log(generatedSequence);
            console.log(playerSequence);
        } else {       
            playerSequence.push(btn.target.title);            
            console.log("Correto");
            console.log(generatedSequence);
            console.log(playerSequence);
            i++;     
        }
    }
})

function generateRandomNumber () {
    return Math.floor((Math.random()) * 4);
}

$(".dark-mode-switch").click( () => {
    $("body").toggleClass("dark-mode");
})