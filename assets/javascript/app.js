// add more questions and update answers (are animations necessary?)
// this code was copied from a class activity.. check week/number 
var questionAnswers = [
    {
        question: "who is MJ?",
        answers: ["1. He is a footbal player", "2. He is a rock star", "3. He is the GOAT", "4. He is a pilot"],
        rightAnswer: "3. He is the GOAT",
        animate: "https://media3.giphy.com/media/pYvP6Bf0Uhtm0/200w.webp?cid=790b76115ce7298e785a396d7364905b&rid=200w.webp"
    },
    {
        question: "who won the world series in 2016?",
        answers: ["1. Blackhawks", "2. Cubs", "3. Bears", "4. White Soxs"],
        rightAnswer: "2. Cubs",
        animate: "https://giphy.com/gifs/mlb-dance-cubs-vol-7HsmAvlq6lDlm"
    }

]

// initialize variables so everything has a starting point/value of zero
var correctAnswers = 0;
var inCorrectAnswers = 0;
var unAnswers = 0;
var index = 0;

var timer = 10;
var intervalid;

function showTrivia() {

    for (index = 0; index < questionAnswers.length; index++) {
        $("#showPossibleAnswers").append(questionAnswers[index].question + "<br>");
        for (var i = 0; i < questionAnswers[index].answers.length; i++) {
            var p = $("<p>")
            p.attr("data-rightAnswer", questionAnswers[index].rightAnswer)
            p.addClass("answer")
            p.attr("data-possibleAnswer", questionAnswers[index].answers[i])
            p.html(questionAnswers[index].answers[i] + "<br><br>")
            $("#showPossibleAnswers").append(p)
        }
    }

    $(".answer").hover(function () {
        $(this).css("background-color", "yellow");
    }, function () {
        $(this).css("background-color", "white");
    });


    $(".answer").on("click", function () {
        console.log(this)

        var getRightAnswer = $(this).attr("data-rightAnswer");
        var getPossibleAnswer = $(this).attr("data-possibleAnswer");

        if (getPossibleAnswer === getRightAnswer) {
            correctAnswers++
        }
        else {
            inCorrectAnswers++
        }
    })

}

showTrivia()


intervalid = setInterval(countDown, 1000);

// create countdown function to display time remaining or lock time and display results once time has has elapsed (display results function that is called here is defined below -- daisy chain style)
function countDown() {
    $("#timer").text("Timer: " + timer)
    timer--;
    if (timer === 0) {
        clearInterval(intervalid);
        displayResults();
    }

}

// when I added the reset button, it duplicated all of the possible answers on the 
// show trivia screen and messed up the result counts.. do i need to define within
// the displayResults function?

// var resetButton=document.createElement("button");resetButton.innerHTML="Play Again!"
// resetButton.addEventListener("click", playAgain());

// define function that, once the time has elapsed, will 1) hide the timer, 2) hide the possible answers (so user can no longer select answers after time is up), and 3) show the user's overall results number of right/wrong responses and unanswered questions --> with # unanswered as a formula of total questions minus number correct and incorrect (so total right+wrong+unanswered equals the total number of questions)
function displayResults() {

    $("#timer").hide();
    $("#showPossibleAnswers").hide();
    $("#results").show();

    $("#results").append("correct answer:" + correctAnswers + "<br>")
    $("#results").append("Incorrect answer:" + inCorrectAnswers + "<br>")

    unAnswers = questionAnswers.length - correctAnswers - inCorrectAnswers
    $("#results").append("Unanswer:" + unAnswers + "<br>")
    $("#results").append("<button onclick='playAgain()'>play again</button>")
    //$("button).on("click", playAgain())
}

function playAgain() {

    $("#results").empty().hide();
    $("#timer").empty().show();
    $("#showPossibleAnswers").empty().show();
  
    timer = 10
    correctAnswers = 0;
    inCorrectAnswers = 0;
    unAnswers = 0;
    index = 0;

    intervalid = setInterval(countDown, 1000);

    showTrivia();
}