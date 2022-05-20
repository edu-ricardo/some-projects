import { Questions } from "./questions.js";
import { Screen } from "./screen.js";

const URI_QUESTIONS = 'https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple';

(async function () {
  const res = await fetch(URI_QUESTIONS)
  const data = await res.json()
  let questions : Array<Questions> = []
  let currentQuestion: number = 0

  for (const item of data.results) {
    questions.push(new Questions(item)) 
  }

  let screen = new Screen((answer: boolean) => {
    console.log('Resposta', answer);
    currentQuestion++
    if (questions.length > currentQuestion){
      screen.buildScreen(questions[currentQuestion])
      screen.updatePoints(answer,currentQuestion)
    } else {
      screen.updatePoints(answer,currentQuestion)
      screen.endScreen(async (e) => {
        const res = await fetch(URI_QUESTIONS)
        const data = await res.json()

        questions = []
        currentQuestion= 0
      
        for (const item of data.results) {
          questions.push(new Questions(item)) 
        }
        screen.buildScreen(questions[currentQuestion])
        screen.updatePoints(false,currentQuestion)
      })
    }
  })

  screen.buildScreen(questions[currentQuestion])
  screen.updatePoints(false,currentQuestion)
})()

