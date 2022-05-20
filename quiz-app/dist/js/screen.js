import { Popup } from "./popup.js";
export class Screen {
    constructor(onValidateAnswer) {
        this.onValidateAnswer = onValidateAnswer;
        this.btnSubmit = document.getElementById('submit');
        this.answersInput = document.querySelectorAll('ul li input');
        this.answers = document.querySelectorAll('label');
        this.questionDisplay = document.querySelector('h2');
        this.pontuation = document.getElementById('points');
        this.points = 0;
        this.validateUserAnswer = (e) => {
            this.answersInput.forEach((answer) => {
                if (answer instanceof HTMLInputElement) {
                    if (answer.checked)
                        this.onValidateAnswer(answer.labels.item(0).innerHTML == this.currentQuestion.correct_answer);
                }
            });
        };
        this.btnSubmit.addEventListener('click', this.validateUserAnswer);
    }
    buildScreen(question) {
        let arrayOfAnswers = question.incorrect_answers.concat(question.correct_answer);
        arrayOfAnswers.sort(p => Math.random() - 0.5);
        this.questionDisplay.innerHTML = question.question;
        arrayOfAnswers.forEach((answer, index) => {
            this.answers[index].innerHTML = answer;
        });
        this.currentQuestion = question;
        this.clearInputs();
    }
    updatePoints(right, totalQuestions) {
        if (right)
            this.points++;
        this.pontuation.innerText = this.points + '/' + totalQuestions;
    }
    clearInputs() {
        this.answersInput.forEach((answer) => {
            if (answer instanceof HTMLInputElement) {
                answer.checked = false;
            }
        });
    }
    endScreen(onClose) {
        let pop = new Popup('Pontuação Final', 'Você fez ' + this.points + ' pontos!!!!');
        pop.showPopup();
        this.points = 0;
        pop.onClose = onClose;
    }
}
