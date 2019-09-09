var correctAnswers;
var wrongAnswers;
var unanswered;
var isClockRunning;
var timer;
var questionNumber;
var questionAnswers = [];

function stageQuestionsAnswers(inputQuestion, inputChoice1, inputChoice2, inputChoice3, inputChoice4, inputAnswer) {
    var stagingArea = {
        question: "",
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        answer: "",

        setQuestion: function (input) {
            this.question = input;
        },

        setChoice1: function (input) {
            this.choice1 = input;
        },

        setChoice2: function (input) {
            this.choice2 = input;
        },

        setChoice3: function (input) {
            this.choice3 = input;
        },

        setChoice4: function (input) {
            this.choice4 = input;
        },

        setAnswer: function (input) {
            this.answer = input;
        }
    }

    stagingArea.setQuestion(inputQuestion);
    stagingArea.setChoice1(inputChoice1);
    stagingArea.setChoice2(inputChoice2);
    stagingArea.setChoice3(inputChoice3);
    stagingArea.setChoice4(inputChoice4);
    stagingArea.setAnswer(inputAnswer);
    questionAnswers.push(stagingArea);
}

function setupQuestionsAnswers() {
    var question;
    var choice1;
    var choice2;
    var choice3;
    var choice4;
    var answer;

    question = 'In the first episode of "Thundercats" the cats travel from their destroyed home planet to 3rd Earth.' + "What was the name of the Thundercat's home planet?";
    choice1 = "Thundorea";
    choice2 = "Thunderia";
    choice3 = "Thundera";
    choice4 = "Thunderopolis";
    answer = choice3;
    stageQuestionsAnswers(question, choice1, choice2, choice3, choice4, answer);

    question = 'Everyone knows that Gummiberry juice made the bears in "Gummi Bears" bounce around, but what happened when a human drank the juice?';
    choice1 = "It made them incredibly fast";
    choice2 = "It gave them incredible strength";
    choice3 = "They became extremely agile and could jump huge distances";
    choice4 = "They became drowsy and would fall asleep";
    answer = choice2;
    stageQuestionsAnswers(question, choice1, choice2, choice3, choice4, answer);

    question = "Bebop and Rocksteady were characters in which cartoon?";
    choice1 = "Defenders of the Earth";
    choice2 = "Visionaries";
    choice3 = "Centurions";
    choice4 = "Teenage Mutant Ninja Turtles";
    answer = choice4;
    stageQuestionsAnswers(question, choice1, choice2, choice3, choice4, answer);

    question = "Both He-Man and Skeletor had feline companions which they used as a mode of transportation. He-Man's faithful feline companion was Battle Cat... what was the name of Skeletor's counterpart?";
    choice1 = "Panthor";
    choice2 = "Trap-Jaw";
    choice3 = "Tri-Klops";
    choice4 = "Spikor";
    answer = choice1;
    stageQuestionsAnswers(question, choice1, choice2, choice3, choice4, answer);

    question = "What did the Snorks use as a form of currency?";
    choice1 = "Pearls";
    choice2 = "Starfish";
    choice3 = "Coral";
    choice4 = "Clams";
    answer = choice4;
    stageQuestionsAnswers(question, choice1, choice2, choice3, choice4, answer);

    question = 'How many robot lions did it take to "form" Voltron?';
    choice1 = "Four";
    choice2 = "Five";
    choice3 = "Six";
    choice4 = "Seven";
    answer = choice2;
    stageQuestionsAnswers(question, choice1, choice2, choice3, choice4, answer);

    question = "Which one of the following characters was NOT a member of COBRA in the G.I. Joe cartoon?";
    choice1 = "Destro";
    choice2 = "Copperhead";
    choice3 = "Snake Eyes";
    choice4 = "Storm Shadow";
    answer = choice3;
    stageQuestionsAnswers(question, choice1, choice2, choice3, choice4, answer);

    question = "What was the name of JEM's band?";
    choice1 = "The Holograms";
    choice2 = "The Pussy-Cats";
    choice3 = "Hot Sundae";
    choice4 = "The Misfits";
    answer = choice1;
    stageQuestionsAnswers(question, choice1, choice2, choice3, choice4, answer);

    question = "Which one of these characters was NOT one of the ghost villians in the Pac-Man animated series?";
    choice1 = "Blinky";
    choice2 = "Inky";
    choice3 = "Clyde";
    choice4 = "Stinky";
    answer = choice4;
    stageQuestionsAnswers(question, choice1, choice2, choice3, choice4, answer);

    question = 'Who was NOT a member of the "vehicle" Volton Force?';
    choice1 = "Chip";
    choice2 = "Sven";
    choice3 = "Cliff";
    choice4 = "Jeff";
    answer = choice2;
    stageQuestionsAnswers(question, choice1, choice2, choice3, choice4, answer);
}


function initGame() {
    correctAnswers = 0;
    wrongAnswers = 0;
    unanswered = 0;
    isClockRunning = false;
    questionNumber = -1;
}

function startTimer() {
    if (!isClockRunning) {
        intervalId = setInterval(countDown, 1000);
        isClockRunning = true;
    }
}

function stopTimer() {
    clearInterval(intervalId);
    isClockRunning = false;
}

function countDown() {
    timer--;

    $("#timeRemaining").text(timer);

    if (timer == 0) {
        stopTimer();
        unansweredQuestion();
    }
}

function resetClock() {
    timer = 30;
    $("#timeRemaining").text(timer);
}

function clearQuestionAnswers() {
    $("#question").empty();
    $(".answers").empty();
}

function resetStatus() {
    $("#answerReveal").empty();
    $("#outOfTime").empty();
}

function unansweredQuestion() {
    unanswered++;
    clearQuestionAnswers();

    $("#outOfTime").text("Out of Time!");
    setTimeout(getNextQuestion, 10000);
}

function getNextQuestion() {
    resetClock();
    resetStatus();

    questionNumber++;
    console.log(questionNumber);

    if (questionNumber < questionAnswers.length) {
        $("#question").text(questionAnswers[questionNumber].question);
        $("#answer1").text(questionAnswers[questionNumber].choice1);
        $("#answer2").text(questionAnswers[questionNumber].choice2);
        $("#answer3").text(questionAnswers[questionNumber].choice3);
        $("#answer4").text(questionAnswers[questionNumber].choice4);

        startTimer();
    }
    else {
        //end game
    }
}

function checkAnswer() {
    stopTimer();

    var myId = "#" + this.id;
    var userAnswer = $(myId).html();

    console.log(userAnswer);

    clearQuestionAnswers();

    if (userAnswer == questionAnswers[questionNumber].answer) {
        correctAnswers++;
        $("#answerReveal").text("Correct!");
    }
    else {
        wrongAnswers++;
        $("#answerReveal").text("Nope!");
    }

    setTimeout(getNextQuestion, 10000);
}

window.onload = function () {
    setupQuestionsAnswers();

    initGame();
    getNextQuestion();

    $(".answers").on("click", checkAnswer);
};
