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


var correctAnswers = 0;
var inCorrectAnswers = 0;
var unAnswers = 0;
var index = 0;

var timer=10;
var intervalid;

function showTrivia() {

    for (index = 0; index < questionAnswers.length; index++) {
        $("#showPossibleAnswers").append(questionAnswers[index].question + "<br>");
        for (var i = 0; i < questionAnswers[index].answers.length; i++) {
            var p = $("<p>")
            p.attr("data-rightAnswer",questionAnswers[index].rightAnswer)
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


    $(".answer").on("click", function(){

        var getRightAnswer = $(this).attr("data-rightAnswer");
        var getPossibleAnswer = $(this).attr("data-possibleAnswer");
        
        if( getPossibleAnswer === getRightAnswer)
          {
              correctAnswers++
          }  
          else{
              inCorrectAnswers++
          }
    })

}
    showTrivia()


    intervalid= setInterval(countDown,1000);

function countDown()
{
    $("#timer").html("Timer: "+timer)
    timer--;
    if(timer===0)
    {
       clearInterval(intervalid);
       displayResults(); 
    } 
    
}

    function displayResults(){

          $("#timer").hide();
          $("#showPossibleAnswers").hide()
          $("#results").show();

          $("#results").append("correct answer:" + correctAnswers +"<br>")
          $("#results").append("Incorrect answer:" + inCorrectAnswers +"<br>")

          unAnswers=questionAnswers.length -correctAnswers -inCorrectAnswers
          $("#results").append("Unanswer:" + unAnswers +"<br>")

    }