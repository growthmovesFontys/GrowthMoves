import * as THREE from "three";
import { IUpdatable } from "../core";

export class SceneManager implements IUpdatable {
  private _currentScene: THREE.Scene;
  private _objects: IUpdatable[] = [];

  constructor(initialScene: THREE.Scene) {
    this._currentScene = initialScene;
  }

  public get CurrentScene(): THREE.Scene {
    return this._currentScene;
  }
  public set CurrentScene(scene: THREE.Scene) {
    this._currentScene = scene;
  }

  update(deltaTime: number): void {
    this._objects.forEach((gameObject) => gameObject.update(deltaTime));
  }
}
