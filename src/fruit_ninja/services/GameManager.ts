import { FontManager } from "../loaders/FontManager";
import { NumberObjGenerator } from "./NumberObjGenerator";
import * as THREE from "three";
import { TextMeshGenerator } from "./TextMeshGenerator";

export class GameManager {
  private _numberObjGenerator: NumberObjGenerator;
  private _fontManager: FontManager;
  private _textMeshGenerator: TextMeshGenerator;
  private _isGameReady: boolean = false; // Vlag om te checken of het spel klaar is om te starten

  constructor(camera: THREE.PerspectiveCamera) {
    this._fontManager = new FontManager();
    this._textMeshGenerator = new TextMeshGenerator(this._fontManager);
    this._numberObjGenerator = new NumberObjGenerator(camera);

    this.init();
  }

  private async init(): Promise<void> {
    await this._fontManager.init();
    this._isGameReady = true;
  }

  update(deltaTime: number, scene: THREE.Scene) {
    if (!this._isGameReady) {
      console.log("Wacht op font laden...");
      return;
    }

    this._numberObjGenerator.update(deltaTime, scene);
  }
}
