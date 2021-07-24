"use strict";

const numberOfQuestion = document.getElementById('number-of-question'),
      numberOfAllQuestions = document.getElementById('number-of-all-questions');

const question = document.getElementById('question');

const options = document.querySelectorAll('.option');

const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

const btnNext = document.getElementById('btn-next');

const answersTracker = document.getElementById('answers-tracker');

const modal = document.querySelector('.quiz-over-modal'),
      correctAnswer = document.getElementById('correct-answer'),
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),
      btnTryAgain = document.getElementById('btn-try-again');

let indexOfQuestion,
    indexOfPage = 0;

let score = 0;

const questions = [
    {
        question: 'Как в JavaScript вычислить процент от числа?',
        options: [
            'Так в JavaScript нельзя делать',
            'Оператор: %',
            'Умножить на кол-во процентов и разделить на 100',
            'Вызвать метод findPrecent()',
        ],
        rightAnswer: 2
    },
    {
        question: 'Результат выражения "13" + 7',
        options: [
            '20',
            '137',
            'undefined',
            'error',
        ],
        rightAnswer: 1
    },
    {
        question: 'На JavaScript нельзя писать:',
        options: [
            'Игры',
            'Скрипты для сайтов',
            'Десктопные приложения',
            'Плохо',
        ],
        rightAnswer: 3
    }
];

numberOfAllQuestions.innerHTML = questions.length;

window.addEventListener('load', () => {
    generateRandomQuestion();
    createAnswersTracker();
});

options.forEach(option => {
    option.addEventListener('click', e => {
        checkAnswer(e.target);
    });
});

btnNext.addEventListener('click', validate);

btnTryAgain.addEventListener('click', () => {
    window.location.reload();
});

function load() {
    question.innerHTML = questions[indexOfQuestion].question;

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1;
    indexOfPage++;
}

const completedAnswers = [];

function generateRandomQuestion() {
    let randomNumber = Math.floor(Math.random() * questions.length),
        hitDuplicate = false;
    
    if(indexOfPage == questions.length) {
        quizOver();
    } else {
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(answer => {
                if(answer == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate) {
                generateRandomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }

    completedAnswers.push(indexOfQuestion);
}

function checkAnswer(el) {
    if(el.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.classList.add('correct');
        updateAnswersTracker('correct');
        score++;
    } else {
        el.classList.add('wrong');
        updateAnswersTracker('wrong');
    }
    
    disabledOptions();
}

function disabledOptions() {
    options.forEach(option => {
        option.classList.add('disabled');

        if(option.dataset.id == questions[indexOfQuestion].rightAnswer) {
            option.classList.add('correct');
        }
    });
}

function enableOptions() {
    options.forEach(option => {
        option.classList.remove('correct', 'wrong', 'disabled');
    });
}

function validate() {
    if(!options[0].classList.contains('disabled')) {
        alert('Вам нужно выбрать один из вариантов ответа');
    } else {
        generateRandomQuestion();
        enableOptions();
    }
}

function createAnswersTracker() {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    });
}

function updateAnswersTracker(status) {
    answersTracker.children[indexOfPage - 1].classList.add(status);
}

function quizOver() {
    modal.classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
}