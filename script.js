let currentQuestion = 0;
let correctAnswer = 0;
showQuestion();

function showQuestion() {
    if (questions[currentQuestion]) {
        let quiz = questions[currentQuestion];
        let percentageBar = Math.floor((currentQuestion / questions.length) * 100);

        document.querySelector('.progress--bar').style.width = `${percentageBar}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';
        document.querySelector('.question').innerHTML = quiz.question;
        let optionsHTML = '';
        for (let i in quiz.options) {
            optionsHTML += `<div data-op="${i}"class="option"><span>${parseInt(i) + 1}</span>${quiz.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHTML;
        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        })
    } else {
        finishQuiz();
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'))
    if (questions[currentQuestion].answer === clickedOption) {
        console.log('acertou')
        correctAnswer++;
    } else {
        console.log('errou')
    }
    currentQuestion++;
    showQuestion();
}

function finishQuiz() {
    let points = Math.floor((correctAnswer / questions.length) * 100);
    if (points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Precisa melhorar muito!'
        document.querySelector('.scorePct').style.color = 'red'
    } else if (points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Precisa melhorar!'
        document.querySelector('.scorePct').style.color = 'orange'
    } else if (points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!'
        document.querySelector('.scorePct').style.color = '#0D630D'
    }
    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`
    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswer}`

}
function retry() {
    currentQuestion = 0;
    correctAnswer = 0;
    showQuestion()
}