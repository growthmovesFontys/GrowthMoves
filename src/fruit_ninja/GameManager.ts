import { SceneManager } from "./../threeCore/base/SceneManager";
import { Engine } from "../threeCore/base";
import { FontManager } from "./loaders/FontManager";
import { ImageLoader } from "./loaders/ImageManager";
import { GameConfig } from "./utitls/GameConfig";
import { QuestionObject } from "./models/QuestionObject";
import { QuestionGenerator } from "./services/QuestionGenerator";
import * as THREE from "three";
import { ThrowingLogic } from "./services/ThrowingLogic";
import { AnswerObject } from "./models/AnswerObject";
import { World } from "cannon";
import { BackgroundObject } from "./models/BackgroundObject";
import { RaycastingLogic } from "./services/RaycastingLogic";

class GameManager {
  private _engine: Engine;
  private _fontManager: FontManager = new FontManager();
  private _imageLoader: ImageLoader = new ImageLoader();
  private _questionObject!: QuestionObject;
  private _questionGenerator: QuestionGenerator = new QuestionGenerator();
  private _throwingLogic: ThrowingLogic = new ThrowingLogic();
  private _world!: World;
  private _nextQuestion: boolean = true;
  private _currentAnswerobject!: AnswerObject;
  private _raycastingLogic: RaycastingLogic;


  constructor() {
    this.configCannonWorldObject();
    this._engine = new Engine(
      GameConfig.createCamera(),
      GameConfig.createRenderer()
    );

    this._raycastingLogic = new RaycastingLogic(this._engine.camera);
  }

  public startGameLoop(deltatime: number, scene: THREE.Scene) {

    this.showQuestion();
    this.throwNextAnswer();
    this.addPhysicsToAnswer();
    if (this._raycastingLogic.checkAnswer(this._currentAnswerobject, this._questionGenerator.getCorrectAnswer())) {
      this._nextQuestion = true;
    }

  }

  private throwNextAnswer() {
    if (this.isBelowScreen(this._currentAnswerobject, this._engine.camera)) {
      this.destroyGameObject(this._currentAnswerobject);
      const answer = this._questionGenerator.getRandomAnswer();
      if (answer !== undefined) {
        this.throwAnswer(answer);
      }
    }
  }

  private addPhysicsToAnswer(): void {
    this._world.step(1 / 60);
    if (this._currentAnswerobject) {
      this._currentAnswerobject.position.copy(this._currentAnswerobject.body.position as any);
      this._currentAnswerobject.position.copy(this._currentAnswerobject.body.position as any);
      this._currentAnswerobject.quaternion.copy(this._currentAnswerobject.body.quaternion as any);
    }

  }

  private throwAnswer(answer: number) {
    if (this._fontManager.isFontLoaded && this._fontManager.font) {
      this._currentAnswerobject = new AnswerObject(
        answer,
        this._fontManager.font
      );
      this._currentAnswerobject.position.set(
        this._throwingLogic.calculateStartPosition(this._engine.camera).startPosition.x,
        this._throwingLogic.calculateStartPosition(this._engine.camera).startPosition.y,
        this._throwingLogic.calculateStartPosition(this._engine.camera).startPosition.z
      );
      let BackgroundObject = this.createAnswerBackgroundMesh(
        this._currentAnswerobject.textSize
      );
      this._currentAnswerobject.add(BackgroundObject);
      this._currentAnswerobject.body = this._throwingLogic.calculateStartPosition(this._engine.camera).body;
      this._world.addBody(this._currentAnswerobject.body)
      this._engine.SceneManager.CurrentScene.add(this._currentAnswerobject);
    }
  }

  private isBelowScreen(object: AnswerObject, camera: THREE.PerspectiveCamera): boolean {
    if (!object) return true;

    const vFOV = THREE.MathUtils.degToRad(camera.fov);
    const heightAtCameraZ = 2 * Math.tan(vFOV / 2) * camera.position.z;
    const bottomY = camera.position.y - heightAtCameraZ / 2 - 5;

    return object.position.y < bottomY;
  }


  public startgame() {
    this._fontManager
      .init()
      .then(() =>
        this._engine.addUpdateDelegate(this.startGameLoop.bind(this))
      );

    this._engine.start();
  }

  private configCannonWorldObject() {
    this._world = new World();
    this._world.gravity.set(0, -7, 0);
  }

  private showQuestion() {
    if (this._fontManager.font) {
      if (this._nextQuestion) {
        if (this._questionObject && this._currentAnswerobject) {
          this.destroyGameObject(this._questionObject);
          this.destroyGameObject(this._currentAnswerobject);
        }
        this._questionGenerator.generateQuestion();
        const questionText = this._questionGenerator.getQuestionText();
        this._questionObject = new QuestionObject(
          questionText,
          this._fontManager.font
        );
        const y = this._throwingLogic.calculateVerticalPosition(this._engine.camera);
        this._questionObject.position.set(0, y, 0)

        this._engine.SceneManager.CurrentScene.add(this._questionObject);
        this._nextQuestion = false;
      }
    }
  }

  private destroyGameObject(mesh: THREE.Mesh) {
    if (!mesh) return;
    this._engine.SceneManager.CurrentScene.remove(mesh);
    mesh.geometry.dispose();

  }

  private createAnswerBackgroundMesh(textSize: THREE.Vector3) {
    const padding = 0.1;
    const backgroundGeometry = new THREE.PlaneGeometry(
      textSize.x + padding,
      textSize.y + padding
    );
    const backgroundMaterial = new THREE.MeshBasicMaterial({
      map: this._imageLoader.getRandomTexture(),
      transparent: true,
    });
    const backgroundMesh = new THREE.Mesh(
      backgroundGeometry,
      backgroundMaterial
    );
    backgroundMesh.position.set(0, 0.5, -0.1);
    backgroundMesh.scale.set(5, 5, 5);

    return backgroundMesh;
  }
}

export const gameManger: GameManager = new GameManager();
