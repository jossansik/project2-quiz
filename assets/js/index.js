// Load google chart javascript.
google.charts.load('current', {
    'packages': ['corechart']
});
// Defining user answer list as an empty array.
let answers = [];

// Function that is called when user press 'START QUIZ'.
function startQuiz() {
    document.getElementById('start-page').style.display = 'none';
    document.getElementById('game-page').style.display = 'block';
    document.getElementById("question-number").innerText = 1;

    // Set text for the first question.
    document.getElementById("question").innerText = questions[0].question;

    // Set anwsers for the first question.
    let options = getAnswerOptions(0);
    for (let index = 0; index < options.length; index++) {
        document.getElementById("answer-id-" + index).innerText = options[index].answer;
    }
}

// Function that is called everyime a user select a answer.
function answerQuestion(answerId) {
    let currentQuestionId = document.getElementById("question-number").innerText - 1;

    // Add answer to the question.
    answers.push({
        questionId: currentQuestionId,
        answerId: answerId
    });

    // Set white text for the selected answer button.
    document.getElementById("answer-id-" + answerId).parentElement.style.color = '#FFF';

    let correctAnswerId = questions[currentQuestionId].answerId;

    if (correctAnswerId === answerId) { // Correct answer
        document.getElementById("answer-id-" + answerId).parentElement.style.backgroundColor = 'darkgreen';
        let checkMark = document.createElement("i");
        checkMark.className = 'fas fa-check';
        checkMark.style.color = '#FFF';
        // Add white check mark if selected answer is correct.
        document.getElementById("answer-id-" + answerId).parentElement.lastElementChild.appendChild(checkMark);
    } else { // Incorrect answer
        document.getElementById("answer-id-" + answerId).parentElement.style.backgroundColor = '#AB2330';
        // Add check mark for the correct answer
        let checkMark = document.createElement("i");
        checkMark.className = 'fas fa-check';
        checkMark.style.color = 'darkgreen';
        document.getElementById("answer-id-" + correctAnswerId).parentElement.lastElementChild.appendChild(checkMark);
        // Add incorrect check mark for the selected answer.
        let incorrectMark = document.createElement("i");
        incorrectMark.className = 'fas fa-times';
        incorrectMark.style.color = '#FFF';
        document.getElementById("answer-id-" + answerId).parentElement.lastElementChild.appendChild(incorrectMark);
    }

    document.getElementById("next-question-button").style.backgroundColor = 'darkgreen';

    // Disabling all anwswer buttons when the question is answered.
    for (let index = 0; index < document.getElementById('answer-options').getElementsByTagName('button').length; index++) {
        document.getElementById('answer-options').getElementsByTagName('button')[index].disabled = true;
    }

    // Unlocking NEXT QUESTION button to allow user to get to the next question.
    document.getElementById('next-question-button').disabled = false;

    // Unlocking SHOW RESULT button to allow user to get the final result if it is the last question.
    if (questions.length === currentQuestionId + 1) {
        document.getElementById("result-button").style.backgroundColor = 'darkgreen';
        document.getElementById('result-button').disabled = false;
    }
}

// Function that is called when the user continues to the next question.
function nextQuestion() {
    let currentQuestionId = document.getElementById("question-number").innerText;

    let nextQuestionId = currentQuestionId++;

    document.getElementById("next-question-button").style.backgroundColor = 'darkolivegreen';

    // Set next number for next question.
    document.getElementById("question-number").innerText = nextQuestionId + 1;

    // Set new text for next question.
    document.getElementById("question").innerText = questions[nextQuestionId].question;

    // Set new answers for the question.
    let options = getAnswerOptions(nextQuestionId);
    for (let index = 0; index < options.length; index++) {
        document.getElementById("answer-id-" + index).innerText = options[index].answer;
        document.getElementById("answer-id-" + index).parentElement.style.color = '#000';
        document.getElementById("answer-id-" + index).parentElement.style.backgroundColor = '#FFF';
    }

    // Reset selected answers for previous question.
    for (let index = 0; index < document.getElementById('answer-options').getElementsByTagName('button').length; index++) {
        document.getElementById('answer-options').getElementsByTagName('button')[index].disabled = false;
    }

    // Hide NEXT QUESTION and SHOW RESULT button when it is the last question.
    if (questions.length === nextQuestionId + 1) {
        document.getElementById('next-question-button').style.display = 'none';
        document.getElementById('result-button').style.display = 'inline-block';
    }

    // The next button should be disabled until user has answered the question.
    document.getElementById('next-question-button').disabled = true;
}

// Function that is triggered when user has finished the game to calculate the result.
function showResult() {
    let correctResultCount = 0;
    // For each question, get the correct answer count based on user selection.
    for (let questionIndex = 0; questionIndex < questions.length; questionIndex++) {
        answers.forEach(answer => {
            if (questionIndex === answer.questionId && questions[questionIndex].answerId == answer.answerId) {
                correctResultCount++;
            }
        });
    }

    let div = document.createElement('div');
    div.innerText = correctResultCount + " / " + questions.length + " Correct answers";

    document.getElementById('result-page').insertBefore(div, document.getElementById('chart-result'));
    document.getElementById('game-page').style.display = 'none';
    document.getElementById('result-page').style.display = 'block';

    // Loading chart into page.
    google.charts.setOnLoadCallback(drawChart(correctResultCount, questions.length));
}

// Takes user back to the start page by reloading the entire page.
function reloadPage() {
    location.reload();
}

// Defining the PieChart for the result page.
function drawChart(correctAnswerCount, totalQuestions) {
    // Setup google chart properties.
    var data = google.visualization.arrayToDataTable([
        ['Quiz', 'Answered questions'],
        ['Correct answers', correctAnswerCount],
        ['Incorect answers', totalQuestions - correctAnswerCount],
    ]);

    // Defining options for the google chart.
    var options = {
        colors: ['darkgreen', '#AB2330'],
        backgroundColor: '#4169e1',
        pieHole: 0.5,
        pieSliceTextStyle: {
            color: 'white',
        },
        legend: 'none'
    };

    // Using PieChart as chart which is drawn to the chart-result div.
    var chart = new google.visualization.PieChart(document.getElementById('chart-result'));
    chart.draw(data, options);
}

// Using an array with questions.
let questions = [{
        answerId: 1,
        question: 'Sweden’s present King is Carl XVI Gustaf. He ascended the throne on September 15, 1973. But what number in the order is he?'
    },
    {
        answerId: 0,
        question: 'The regalia of Sweden are the symbolic objects which the king or queen received from the archbishop at the coronation. They are displayed at major royal ceremonies such as baptisms, weddings and funerals. Among the most famous regalia are those of King Erik XIV. What kinds of objects are they?'
    },
    {
        answerId: 1,
        question: 'The current royal family is of the House of Bernadotte who have held the throne since 1818 and was founded by Charles XIV John of Sweden (born Jean Baptiste Bernadotte). Which year was he elected at the Riksdag in Örebro as heir presumtive to the Swedish throne?'
    },
    {
        answerId: 3,
        question: 'Carl XVI Gustaf, born in 1946, ascended the throne at age 27 on the death of his grandfather, King Gustaf VI Adolf.  Carl Gustaf became second in line to the throne upon the death of his father in 1947. How did his father die?'
    },
    {
        answerId: 0,
        question: 'The heir apparent is Crown Princess Victoria. In 2010, she married Daniel Westling. How did they meet?'
    },
    {
        answerId: 0,
        question: 'Carl XVI:s maternal grandfather was born a British prince in 1884 and later became the last German duke of Saxe-Coburg and Gotha. During Nazi Germany he was a dedicated supporter of Hitler and helped pave the way for the Nazi regime as a member of the Nazi party as well as the Sturmabteilung (SA, or Brownshirts). What was his name?'
    },
    {
        answerId: 0,
        question: 'Princess Sibylla of Saxe-Coburg and Gotha was the mother of King Carl XVI Gustaf. She never became Crown princess or Queen herself since her husband, Price Gustaf Adolf, died before his father and his grandfather. Nor did she live to see her son become king of Sweden in 1973 as she died of cancer just one year prior. How many children did she have?'
    },
    {
        answerId: 3,
        question: 'The Royal Palace in central Stockholm, located next to the Riksdag, is the official residence and major royal palace of the Swedish monarch. The palace was designed by Nicodemus Tessin the Younger and erected on the same place as the medieval Tre Kronor Castle which was destroyed in a fire. What year was the fire?'
    },
    {
        answerId: 3,
        question: 'The Act of Succession of 1810 is a part of the Swedish Constitution. It provides the rules governing the line of succession and designates the legitimate heirs to the Swedish Throne. A rewrite of the Act, entering into force in 1980, fundamentally changed the rules of succession. What did the changes mean?'
    },
    {
        answerId: 1,
        question: 'The revision of the Act of Succession installed Princess Victoria as crown princess over her younger brother, Prince Carl Philip, who had been born as crown prince a few months before. In 2015, the Prince married Sophia Hellquist and the couple has three sons. Before Sophia married the Prince she was famous for something else, but what?'
    },
    {
        answerId: 1,
        question: 'In 1972, then Crown Prince Carl Gustaf met Silvia Sommerlath during the Summer Olympics, where she was an Olympic hostess. They were married in 1976, the first marriage of a reigning Swedish monarch since what year?'
    },
    {
        answerId: 3,
        question: "'The youngest child of King Carl XVI Gustaf and Queen Silvia, princess Madeleine (born 1982) is married to British-American financier Christopher O'Neill. They have three children. Where are they currently living?'"
    },
    {
        answerId: 2,
        question: 'According to the book ”Carl XVI Gustaf: The Reluctant Monarch”, the Swedish King’s dream job was not ruling the country but instead an entirely different trade, what?'
    },
    {
        answerId: 1,
        question: 'In the upper class, it is common with nicknames, so also for the royals. What was Carl XVI Gustaf called by his friends in his younger years?'
    }
];

function getAnswerOptions(questionId) {
    // Giving the user the available answers depending on the question.
    switch (questionId) {
        case 0:
            return [{
                answer: '103'
            }, {
                answer: '74'
            }, {
                answer: '99'
            }, {
                answer: '82'
            }];
        case 1:
            return [{
                answer: 'Crown, scepter, orb & key'
            }, {
                answer: 'Sword, banner, shield & helmet'
            }, {
                answer: 'Gauntlet, medal, ribbon & wreath'
            }, {
                answer: 'Plaque, gold ring, jewel & rosary'
            }];
        case 2:
            return [{
                answer: '1817'
            }, {
                answer: '1810'
            }, {
                answer: '1799'
            }, {
                answer: '1822'
            }];
        case 3:
            return [{
                answer: 'Pneumonia'
            }, {
                answer: 'Horse riding accident'
            }, {
                answer: 'Complications from a gallstone operation'
            }, {
                answer: 'Airplane crash'
            }];
        case 4:
            return [{
                answer: 'He was her personal trainer'
            }, {
                answer: 'They associated with the same social circles'
            }, {
                answer: 'He was her tour guide on a vacation'
            }, {
                answer: 'They went to university together'
            }];
        case 5:
            return [{
                answer: 'Charles Edward'
            }, {
                answer: 'Alfred'
            }, {
                answer: 'Charles Friedrich'
            }, {
                answer: 'Ernst'
            }];
        case 6:
            return [{
                answer: '5, four daughters & one son'
            }, {
                answer: '3 sons'
            }, {
                answer: 'Only 1, Carl Gustaf was an only child'
            }, {
                answer: '2, one son & one daughter'
            }];
        case 7:
            return [{
                answer: '1528'
            }, {
                answer: '1628'
            }, {
                answer: '1707'
            }, {
                answer: '1697'
            }];
        case 8:
            return [{
                answer: 'A prince or princess in the line of succession no longer needs to belong to and profess the "pure evangelical faith”'
            }, {
                answer: 'Others than the descendants of Carl XVI Gustaf may inherit the Throne'
            }, {
                answer: 'Children born outside of wedlock may inherit the Throne'
            }, {
                answer: 'The principle of male succession only was changed so that eldest child regardless of sex becomes heir to the Throne'
            }];
        case 9:
            return [{
                answer: 'Her singing-career'
            }, {
                answer: 'Glamour modeling & appearing in reality-tv '
            }, {
                answer: 'She was a TV news presenter'
            }, {
                answer: 'Swedish skiing champion'
            }];
        case 10:
            return [{
                answer: '1699'
            }, {
                answer: '1797'
            }, {
                answer: '1860'
            }, {
                answer: '1932'
            }];
        case 11:
            return [{
                answer: 'Stockholm'
            }, {
                answer: 'New York'
            }, {
                answer: 'London'
            }, {
                answer: 'Florida'
            }];
        case 12:
            return [{
                answer: 'Author'
            }, {
                answer: 'Doctor'
            }, {
                answer: 'Excavator operator'
            }, {
                answer: 'Race car driver'
            }];
        case 13:
            return [{
                answer: 'Lippi'
            }, {
                answer: 'Tjabo'
            }, {
                answer: 'Gubbis'
            }, {
                answer: 'Challe'
            }];
        default:
            return [];
    };
}