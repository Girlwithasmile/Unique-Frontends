
var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;



// if we click on start/reset
document.getElementById("startreset").onclick = function () {


    //if we are playing
    if (playing == true) {

        location.reload(); // reload page

    } else {
        //if we are not playing

        playing = true;
        //set score to 0

        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        timeremaining = 10;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;

        //hide game over box
        hide("gameover");
        //show countdown box
        show("timeremaining");
        //change button to reset
        document.getElementById("startreset").innerHTML = "Reset Game";

        //start countdown

        startcountdown();

        //generate new Q&A

        generateQA();
    }

}

//clicking on a answerbox

for (i = 1; i < 5; i++) {

    document.getElementById("box" + i).onclick = function () {
        //check if we are playing

        if (playing == true) {
            if (this.innerHTML == correctAnswer) {
                //correctAnswer

                score++; //increase score by 1
                document.getElementById("scorevalue").innerHTML = score;
                //hide wrong box and show correct
                hide("wrong");
                show("correct");
                setTimeout(function () {
                    hide("correct");
                }, 1000);
                //Generate new Q&A

                generateQA();
            } else {
                //wrong answer
                show("wrong");
                hide("correct");
                setTimeout(function () {
                    hide("wrong");
                }, 1000);


            }
        }
    }


}






//functions

//start counter
function startcountdown() {
    action = setInterval(function () {
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if (timeremaining == 0) {
            // gameover
            stopcountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>Game over!</p><p>Your Score Is " + score + ".</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";

        }
    }, 1000);
}

//stop counter

function stopcountdown() {
    clearInterval(action);
}

//hide an element
function hide(Id) {
    document.getElementById(Id).style.display = "none";
}

//show an element
function show(Id) {
    document.getElementById(Id).style.display = "block";
}

//function to generate multiple qustion and answers


function generateQA() {
    var x = 1 + Math.round(20 * Math.random());
    var y = 1 + Math.round(30 * Math.random());
    var z = x + "x" + y;
    correctAnswer = x * y;
    //document.getElementById('question').innerHTML = z;
    var correctPosition = 1 + Math.round(3 * Math.random());
    // fill one box with correct answer
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer;

    //fill other box with wrong answer

    document.getElementById('question').innerHTML = z;

    var answers = [correctAnswer];
    for (i = 1; i < 5; i++) {
        if (i !== correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
            } while (answers.indexOf(wrongAnswer) > -1);

            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }


}