export class Questions {
    constructor(rawData) {
        this.category = rawData.category;
        this.type = rawData.type;
        this.difficulty = rawData.difficulty;
        this.question = rawData.question;
        this.correct_answer = rawData.correct_answer;
        this.incorrect_answers = rawData.incorrect_answers;
    }
}
