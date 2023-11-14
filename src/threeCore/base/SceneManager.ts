import { Result } from "../../global_utils";
import * as THREE from "three";
import { GameObject } from "./GameObject";
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

  public addGameObject(gameObject: GameObject): Result<void> {
    try {
      this._objects.push(gameObject);
      this._currentScene.add(gameObject.Mesh);
      return Result.ok(null);
    } catch (error) {
      return Result.fail(
        error instanceof Error
          ? error
          : new Error("unkown error happend when adding mesh to scene")
      );
    }
  }

  update(deltaTime: number): void {
    this._objects.forEach((gameObject) => gameObject.update(deltaTime));
  }
}
