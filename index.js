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
            question: "'13. According to the book ”Carl XVI Gustaf: The Reluctant Monarch”, the Swedish King’s dream job was not ruling the country but instead an entirely different trade, what?'"
        },
    ];
}

function getAnswerOptions(questionId) {
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

        default:
            return [];
    };
}