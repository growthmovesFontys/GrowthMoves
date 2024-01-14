import { PoseCameraProcessor } from './../mediaPipeLayer/poseCameraProcessor';
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
import { RaycastingLogic } from "./services/RaycastingLogic";

export class GameManager {
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
  private _poseCameraProcessor: PoseCameraProcessor;
  private _trailPoints!: THREE.Points;
  private _pointsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1,
    transparent: true,
    opacity: 0.5
  });
  private _pointsGeometry = new THREE.BufferGeometry();
  private _maxPoints = 30;
  private _positions = new Float32Array(this._maxPoints * 3);




  constructor(poseCameraProcessor: PoseCameraProcessor) {
    this.configCannonWorldObject();
    this._engine = new Engine(
      GameConfig.createCamera(),
      GameConfig.createRenderer()
    );
    this._raycastingLogic = new RaycastingLogic(this._engine.camera);
    this._poseCameraProcessor = poseCameraProcessor;

  }

  public startGameLoop(deltatime: number, scene: THREE.Scene) {

    if (!this._poseCameraProcessor.hasData) return;
    this.updateTrailPositions();
    this.showQuestion();
    this.throwNextAnswer();
    this.addPhysicsToAnswer();
    if (this._raycastingLogic.checkAnswer(this._trailPoints, this._currentAnswerobject, this._questionGenerator.getCorrectAnswer())) {
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

    this._poseCameraProcessor.start();
    this._engine.start();
    this.createTrailPoints();
  }

  private configCannonWorldObject() {
    this._world = new World();
    this._world.gravity.set(0, -4, 0);
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
    backgroundMesh.scale.set(3, 3, 3);

    return backgroundMesh;
  }

  private createTrailPoints(): void {
    this._pointsGeometry.setAttribute('position', new THREE.BufferAttribute(this._positions, 3));
    this._trailPoints = new THREE.Points(this._pointsGeometry, this._pointsMaterial);
    this._engine.SceneManager.CurrentScene.add(this._trailPoints);
  }

  public updateTrailPositions() {

    if (this._poseCameraProcessor.hasData()) {
      const landmarks = this._poseCameraProcessor.getPoselandMarks();
      const aspectRatio = window.innerWidth / window.innerHeight;


      if (landmarks && landmarks.length > 15) {
        const leftHand = landmarks[15];

        // Reversen van de x-as
        let targetX = -(leftHand.x - 0.5) * 2 * aspectRatio;
        let targetY = -((leftHand.y - 0.5) * 2);

        // Verplaats alle punten naar achteren in de array
        for (let i = this._maxPoints - 1; i > 0; i--) {
          this._positions[i * 3] = this._positions[(i - 1) * 3];
          this._positions[i * 3 + 1] = this._positions[(i - 1) * 3 + 1];
          this._positions[i * 3 + 2] = this._positions[(i - 1) * 3 + 2];

          // Vervaag de kleur van de oudere punten
          this._pointsMaterial.color.setHSL(1, 1, Math.max(0, (1 - i / this._maxPoints)));
        }

        // Update de positie van het nieuwe punt aan het begin van de array
        this._positions[0] = this.lerp(this._positions[0], targetX);
        this._positions[1] = this.lerp(this._positions[1], targetY);
        this._positions[2] = 0;

        this._pointsGeometry.attributes.position.needsUpdate = true;

      }
    }
  }

  private lerp(start: number, end: number) {
    return start + (end - start) * 0.2;
  }


}

