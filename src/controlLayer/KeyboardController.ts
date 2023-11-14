export class KeyboardController {
  public direction: { x: number; y: number } = { x: 0, y: 0 };

  constructor() {
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowLeft":
          this.direction.x = -1;
          break;
        case "ArrowRight":
          this.direction.x = 1;
          break;
        case "ArrowDown":
          this.direction.y = -1;
          break;
        case "ArrowUp":
          this.direction.y = 1;
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "ArrowLeft":
        case "ArrowRight":
          this.direction.x = 0;
          break;
        case "ArrowDown":
        case "ArrowUp":
          this.direction.y = 0;
          break;
      }
    });
  }
}
