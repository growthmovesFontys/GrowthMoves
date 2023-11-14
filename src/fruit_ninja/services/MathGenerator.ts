export class MathGenerator {
  private _currentQuestion!: string;
  private _answers: number[] = [];
  private _correctAnswer!: number;

  generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    this._correctAnswer = num1 * num2;

    this._currentQuestion = `${num1} x ${num2}`;
    this._answers = [
      this._correctAnswer,
      this._correctAnswer - 1,
      this._correctAnswer + 1,
    ].sort(() => Math.random() - 0.5);
    console.log(this._currentQuestion);
    console.log(this._answers);

    return { question: this._currentQuestion, answers: this._answers };
  }

  checkAnswer(answer: number) {
    return answer == this._correctAnswer;
  }

  public get answers(): number[] {
    return this._answers;
  }

  public get currentQuestion(): string {
    return this._currentQuestion;
  }

  public removeAnswer(wrongAnswer: number): void {
    this._answers = this._answers.filter((answer) => answer !== wrongAnswer);
  }
}
