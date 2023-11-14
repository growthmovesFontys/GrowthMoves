export class InputHandler {
  private keyStates = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  };

  constructor() {
    window.addEventListener("keydown", (event) => {
      if (event.key in this.keyStates) {
        this.keyStates[event.key as keyof typeof this.keyStates] = true;
      }
    });

    window.addEventListener("keyup", (event) => {
      if (event.key in this.keyStates) {
        this.keyStates[event.key as keyof typeof this.keyStates] = false;
      }
    });
  }

  getKeyStates() {
    return this.keyStates;
  }
}
