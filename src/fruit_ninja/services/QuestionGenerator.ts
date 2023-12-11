export class QuestionGenerator {
    private _correctAnswer: number;
    private _answerOptions: number[] = [];
    private _questionText: string;
    private _currentRandomAnswer!:number;
  
    constructor() {
      this._correctAnswer = 0;
      this._questionText = "";
    }
  
    public generateQuestion(): void {
      const number1 = Math.floor(Math.random() * 10) + 1;
      const number2 = Math.floor(Math.random() * 10) + 1;
      this._correctAnswer = number1 * number2;
  
      this._questionText = `${number1} * ${number2}`;
      this.generateAnswerOptions();
    }
  
    private generateAnswerOptions(): void {
      this._answerOptions = [this._correctAnswer];
      
      while (this._answerOptions.length < 3) {
        let randomAnswer = this._correctAnswer + Math.floor(Math.random() * 5) - 2;
        if (!this._answerOptions.includes(randomAnswer)) {
          this._answerOptions.push(randomAnswer);
        }
      }

      this._answerOptions.sort(() => Math.random() - 0.5);
    }
  
    public getCorrectAnswer(): number {
      return this._correctAnswer;
    }
  
    public getAnswerOptions(): number[] {
      return this._answerOptions;
    }
  
    public getQuestionText(): string {
      return this._questionText;
    }


    public getRandomAnswer(): number {
      let answer: number;
      do {
        answer = this._answerOptions[Math.floor(Math.random() * this._answerOptions.length)];
      } while (answer === this._currentRandomAnswer);
      this._currentRandomAnswer = answer;
    
      return answer;
    }
  }

  