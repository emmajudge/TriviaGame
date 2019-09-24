// add more questions and update answers (are animations necessary?)
// this code was copied from a class activity.. check week/number 
var questionAnswers = [
    {
        question: "1. Furfur",
        answers: ["A type of mustache very popular in the Victorian era", "A Siberian squirrel with five stripes down it's back", "Flakes of dandruff", "An edible fruit found in South America"],
        rightAnswer: "Flakes of dandruff",
    },
    {
        question: "2. Meldrop",
        answers: ["Dew found just after sunrise", "A drop of mucus at the nose", "Hallucinogenic mushrooms used in Bolivian tribal rituals", "An acrobatic wrestling move"],
        rightAnswer: "A drop of mucus at the nose",
    },
    {
        question: "3. Octothorpe",
        answers: ["The # symbol", "A group of octuplets with unusually high intelligence", "A misanthropic octopus", "An eight-legged crab"],
        rightAnswer: "The # symbol",
    },
    {
        question: "4. Augend",
        answers: ["To gentrify an area thereby augmenting a neighborhood's demographics", "Brand of German beer", "The anthropological study of eugenics", "the first quantity in an addition of two things"],
        rightAnswer: "the first quantity in an addition of two things",
    },
    {
        question: "5. Agelast",
        answers: ["a person who never laughs", "a sword made of glass", "an heirloom gelatin mold", "a locking mechanism impenetrable to break-in"],
        rightAnswer: "a person who never laughs",
    },
    {
        question: "6. Peristeronic",
        answers: ["fossils from the paleolithic age", "aversion to exposing one's toes", "of or relating to pigeons", "mental health disorder characterized by the fear of pears"],
        rightAnswer: "of or relating to pigeons",
    },

]

// initialize variables so everything has a starting point/value of zero
var correctAnswers = 0;
var inCorrectAnswers = 0;
var unAnswers = 0;
var index = 0;

var timer = 60;
var intervalid;

function showTrivia() {

    for (index = 0; index < questionAnswers.length; index++) {
        $("#showPossibleAnswers").append("<h2>"+questionAnswers[index].question + "<br>");
        for (var i = 0; i < questionAnswers[index].answers.length; i++) {
            $("#showPossibleAnswers").append("<input type='radio' name='question-"+index+"' value='"+questionAnswers[index].answers[i]+"'>"+questionAnswers[index].answers[i])
        }
    }
}

showTrivia()


intervalid = setInterval(countDown, 1000);

// create countdown function to display time remaining or lock time and display results once time has has elapsed (display results function that is called here is defined below -- daisy chain style)
function countDown() {
    $("#timer").text("Timer: " + timer)
    timer--;
    if (timer === 0) {
        clearInterval(intervalid);
        calculateScore();
        displayResults();
    }

}

function calculateScore(){
    $.each($("input[name='question-0']:checked"), function(){
        if($(this).val()===questionAnswers[0].rightAnswer){
           correctAnswers++; 
        }else{
            inCorrectAnswers++
        }
    });
    $.each($("input[name='question-1']:checked"), function(){
        if($(this).val()===questionAnswers[1].rightAnswer){
           correctAnswers++; 
        }else{
            inCorrectAnswers++
        }
    });
}

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