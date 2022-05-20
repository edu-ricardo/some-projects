export class Questions {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: Array<string>

  constructor(rawData: any){
    this.category = rawData.category
    this.type = rawData.type
    this.difficulty = rawData.difficulty
    this.question = rawData.question
    this.correct_answer = rawData.correct_answer
    this.incorrect_answers = rawData.incorrect_answers
  }
}