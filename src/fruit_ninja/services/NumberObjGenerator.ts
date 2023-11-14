import * as THREE from "three";
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { generateRandomPosition } from "../utitls/gameUtitls";
import { FlyingNumber } from "./FlyingNumber";
import { RaycasterHandler } from "./RaycasterHandler";

export class NumberObjGenerator {
  private _font: Font | null = null;
  private _objects: FlyingNumber[] = [];
  private _gravity = -10.5;
  private _fontLoaded = false;
  private _launchSpeed = 80;
  private _launchAngle = 80;
  private _camera: THREE.PerspectiveCamera;
  private raycasterHandler: RaycasterHandler;
  private _questionMesh: THREE.Mesh | null = null;
  private _currentAnswer!: number;
  private _currentQuestion!: string;
  public constructor(camera: THREE.PerspectiveCamera) {
    this.loadFontAsync()
      .then(() => {
        this._fontLoaded = true;
        console.log("Font loaded, starting update loop and other logic");
      })
      .catch((err) => {
        console.error("Error loading font", err);
      });

    this._camera = camera;
    this.raycasterHandler = new RaycasterHandler(camera);
  }

  public get isFontLoaded() {
    return this._fontLoaded;
  }

  private showQuestion(scene: THREE.Scene, question: string) {
    if (this._currentQuestion == question || this._font == null) return;

    if (this._questionMesh) {
      scene.remove(this._questionMesh); // Verwijder de oude vraag
    }

    const textGeometry = new TextGeometry(question, {
      font: this._font,
      size: 3,
      height: 0.5,
      curveSegments: 12,
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 });

    this._questionMesh = new THREE.Mesh(textGeometry, textMaterial);

    this._questionMesh.position.set(0, 20, 0); // Voorbeeld positie
    this._questionMesh.scale.set(15, 15, 15);
    scene.add(this._questionMesh);
    this.raycasterHandler.resetInteraction();
    this._currentQuestion = question;
  }

  private showError(scene: THREE.Scene, message: string) {
    if (this._font == null || this.raycasterHandler.questRight) return;
    const errorGeometry = new TextGeometry(message, {
      font: this._font,
      size: 2,
      height: 0.5,
      curveSegments: 12,
    });
    const errorMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    const errorMesh = new THREE.Mesh(errorGeometry, errorMaterial);

    // Positie net onder de vraag
    errorMesh.position.set(0, 10, 0);
    errorMesh.scale.set(15, 15, 15);
    scene.add(errorMesh);

    // Verwijder de foutmelding na 3 seconden
    setTimeout(() => scene.remove(errorMesh), 200);
    this.raycasterHandler.resetInteraction();
  }

  private async loadFontAsync() {
    const loader = new FontLoader();
    return new Promise<void>((resolve, reject) => {
      loader.load(
        "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
        (font) => {
          this._font = font;
          resolve();
        },
        undefined,
        reject // Bij fout, de Promise rejecten
      );
    });
  }

  public update(deltaTime: number, scene: THREE.Scene) {
    if (!this._fontLoaded) {
      console.log("Font not yet loaded");
      return;
    }

    this._objects.forEach((obj, index) => {
      obj.update(deltaTime, this._gravity);

      // Remove the object if it reaches a certain point
      if (obj.mesh.position.y < -window.innerHeight / 2) {
        scene.remove(obj.mesh);
        this._objects.splice(index, 1);
        this.generateNumber(scene);
      }
    });

    // Generate new numbers if needed
    if (this._objects.length === 0) {
      this.generateNumber(scene);
    }
    const numberMeshes = this._objects.map((obj) => obj.mesh);
    this.raycasterHandler.checkIntersections(numberMeshes);
    this.showQuestion(
      scene,
      this.raycasterHandler.mathGenerator.currentQuestion
    );
    if (!this.raycasterHandler.questRight) {
      this.showError(scene, "fout");
    }
  }

  private createTextMesh(numberValue: number): THREE.Mesh {
    const textGeometry = new TextGeometry(numberValue.toString(), {
      font: this._font!,
      size: 3,
      height: 0.5,
      curveSegments: 12,
    });

    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xa52a2a });
    return new THREE.Mesh(textGeometry, textMaterial);
  }

  private calculateLaunchVelocity(): { velocityX: number; velocityY: number } {
    const velocityX =
      this._launchSpeed * Math.cos((this._launchAngle * Math.PI) / 180);
    const velocityY =
      this._launchSpeed * Math.sin((this._launchAngle * Math.PI) / 180);
    return { velocityX, velocityY };
  }

  private generateNumber(scene: THREE.Scene) {
    let answers = this.raycasterHandler.mathGenerator.answers;
    let numberValue = answers[Math.floor(Math.random() * answers.length)];
    if (numberValue == this._currentAnswer) {
      if (this.raycasterHandler.mathGenerator.checkAnswer(numberValue)) return;
      this.raycasterHandler.mathGenerator.removeAnswer(this._currentAnswer);
      answers = this.raycasterHandler.mathGenerator.answers;
      numberValue = answers[Math.floor(Math.random() * answers.length)];
    }
    const textMesh = this.createTextMesh(numberValue);

    const { width, height } = this.calculateVisibleDimensions();
    const randomX = generateRandomPosition(-width / 2, width / 2);
    const randomZ = generateRandomPosition(-height / 2, height / 2);

    textMesh.position.set(randomX, -window.innerHeight / 2, randomZ);
    textMesh.scale.set(15, 15, 15);
    textMesh.name = numberValue.toString();
    this._currentAnswer = numberValue;
    scene.add(textMesh);

    const { velocityX, velocityY } = this.calculateLaunchVelocity();

    const flyingNumber = new FlyingNumber(
      textMesh,
      velocityX,
      velocityY,
      numberValue
    );
    this._objects.push(flyingNumber);
    this.raycasterHandler.resetInteraction();
  }

  private calculateVisibleDimensions() {
    const vFov = (this._camera.aspect * Math.PI) / 180;
    const height = 2 * Math.tan(vFov / 2) * this._camera.position.z;
    const width = height * this._camera.aspect;
    return { width, height };
  }
}
