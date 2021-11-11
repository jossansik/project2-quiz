let answers = [];

function startQuiz() {
    document.getElementById('start-page').style.display = 'none';
    document.getElementById('game-page').style.display = 'block';
    document.getElementById("question-number").innerText = 1;
    document.getElementById("question").innerText = getQuestions()[0].question;
    let options = getAnswerOptions(0);
    for (let index = 0; index < options.length; index++) {
        document.getElementById("answer-id-" + index).innerText = options[index].answer;
    }
}

function answerQuestion(answerId) {
    let currentQuestionId = document.getElementById("question-number").innerText - 1;
    answers.push({
        questionId: currentQuestionId,
        answerId: answerId
    });

    if (getQuestions()[currentQuestionId].answerId == answerId) {
        document.getElementById("answer-id-" + answerId).style.backgroundColor = 'green'
    } else {
        document.getElementById("answer-id-" + answerId).style.backgroundColor = 'red'
    }

    for (let index = 0; index < document.getElementById('answer-options').getElementsByTagName('button').length; index++) {
        document.getElementById('answer-options').getElementsByTagName('button')[index].disabled = true;
    }

    document.getElementById('next-question-button').disabled = false;

    if (getQuestions().length === currentQuestionId + 1) {
        document.getElementById('result-button').disabled = false;
    }
}

function nextQuestion() {
    let currentQuestionId = document.getElementById("question-number").innerText;

    let nextQuestionId = currentQuestionId++;

    document.getElementById("question-number").innerText = nextQuestionId + 1;
    document.getElementById("question").innerText = getQuestions()[nextQuestionId].question;
    let options = getAnswerOptions(nextQuestionId);
    for (let index = 0; index < options.length; index++) {
        document.getElementById("answer-id-" + index).innerText = options[index].answer;
        document.getElementById("answer-id-" + index).style.backgroundColor = 'white';
    }

    for (let index = 0; index < document.getElementById('answer-options').getElementsByTagName('button').length; index++) {
        document.getElementById('answer-options').getElementsByTagName('button')[index].disabled = false;
    }

    if (getQuestions().length === nextQuestionId + 1) {
        document.getElementById('next-question-button').style.display = 'none';
        document.getElementById('result-button').style.display = 'inline-block';
    }

    document.getElementById('next-question-button').disabled = true;
}

function showResult() {
    let correctResultCount = 0;
    let questions = getQuestions();
    for (let questionIndex = 0; questionIndex < questions.length; questionIndex++) {
        answers.forEach(answer => {
            if (questionIndex === answer.questionId && questions[questionIndex].answerId == answer.answerId) {
                correctResultCount++;
            }
        });
    }

    // let incorectResultCount = questions.length - correctResultCount;

    document.getElementById('result-page').innerText = correctResultCount + " / " + questions.length + " Correct answers";
    document.getElementById('game-page').style.display = 'none';
    document.getElementById('result-page').style.display = 'block';
}

function getQuestions() {
    return [{
            answerId: 0,
            question: 'Question 1?'
        },
        {
            answerId: 1,
            question: 'question 2?'
        }
    ];
}

function getAnswerOptions(questionId) {
    switch (questionId) {
        case 0:
            return [{
                answer: "Steven"
            }, {
                answer: "Roger"
            }];
        case 1:
            return [{
                answer: "Majzan"
            }, {
                answer: "Stulpa"
            }];
        default:
            return [];
    };
}