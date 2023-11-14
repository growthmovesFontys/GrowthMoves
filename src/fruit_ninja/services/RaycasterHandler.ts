import * as THREE from "three";
import { MathGenerator } from "./MathGenerator";

export class RaycasterHandler {
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private camera: THREE.PerspectiveCamera;
  private _mathGenerator: MathGenerator = new MathGenerator();
  private _questionChanged: boolean = false;
  private _questRight: boolean = true;
  private _interactionHappened: boolean = false;

  constructor(camera: THREE.PerspectiveCamera) {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.camera = camera;
    this._mathGenerator.generateQuestion();

    window.addEventListener("mousemove", this.onMouseMove.bind(this), false);
  }

  private onMouseMove(event: MouseEvent): void {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  public checkIntersections(objects: THREE.Object3D[]): void {
    if (this._interactionHappened) return;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(objects);

    for (const intersect of intersects) {
      const intersectedObject = intersect.object;
      const answer = parseInt(intersectedObject.name);
      if (this._mathGenerator.checkAnswer(answer)) {
        this._mathGenerator.generateQuestion();
        this._questRight = true;
        console.log("correct answer.");
      } else {
        console.log("Incorrect answer.");
        this._questRight = false;
      }
      this._interactionHappened = true;
      break;
    }
  }

  public get mathGenerator(): MathGenerator {
    return this._mathGenerator;
  }

  public get questionChanged(): boolean {
    return this._questionChanged;
  }
  public get questRight(): boolean {
    return this._questRight;
  }
  public resetInteraction(): void {
    this._interactionHappened = false;
  }
}
