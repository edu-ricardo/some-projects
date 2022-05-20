import { Popup } from "./popup.js"
import { Questions } from "./questions.js"

export class Screen {
  btnSubmit = document.getElementById('submit')
  answersInput = document.querySelectorAll('ul li input')
  answers = document.querySelectorAll('label')
  questionDisplay = document.querySelector('h2')
  pontuation = document.getElementById('points')

  private currentQuestion: Questions
  private points: number = 0

  buildScreen(question: Questions) {
    let arrayOfAnswers :Array<string> = question.incorrect_answers.concat(question.correct_answer)
    arrayOfAnswers.sort(p => Math.random() - 0.5)

    this.questionDisplay.innerHTML = question.question

    arrayOfAnswers.forEach((answer, index) => {
      this.answers[index].innerHTML = answer
    })
    this.currentQuestion = question
    this.clearInputs()
  }

  updatePoints(right: boolean, totalQuestions: number){
    if(right) this.points++
    this.pontuation.innerText = this.points + '/' + totalQuestions
  }

  clearInputs() {
    this.answersInput.forEach((answer) => {
      if (answer instanceof HTMLInputElement){
        answer.checked = false
      }      
    })
  }

  validateUserAnswer = (e: MouseEvent) => {
    this.answersInput.forEach((answer) => {
      if (answer instanceof HTMLInputElement){
        if (answer.checked)
          this.onValidateAnswer(answer.labels.item(0).innerHTML == this.currentQuestion.correct_answer)
      }      
    })
  }

  endScreen(onClose: (e: MouseEvent) => any) {
    let pop = new Popup('Pontuação Final', 'Você fez '+ this.points + ' pontos!!!!')
    pop.showPopup()
    this.points = 0
    pop.onClose = onClose
  }

  constructor (public onValidateAnswer: Function) {
    this.btnSubmit.addEventListener('click', this.validateUserAnswer)
  }

}