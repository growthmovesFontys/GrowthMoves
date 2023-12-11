import { Result } from "../../global_utils";
import * as THREE from "three";
import { SceneManager } from "./SceneManager";
import { GameConfig } from "../../fruit_ninja/utitls/GameConfig";

export class Engine {
  private _renderer: THREE.WebGLRenderer;
  private _camera: THREE.PerspectiveCamera;
  private _sceneManager: SceneManager = new SceneManager(GameConfig.createScene());

  private _updateDelegates: ((
    deltaTime: number,
    scene: THREE.Scene
  ) => void)[] = [];

  constructor(
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer
  ) {
    this._camera = camera;
    this._renderer = renderer;
  }

  public get SceneManager(): SceneManager {
    return this._sceneManager
  }

  public get camera(): THREE.PerspectiveCamera {
    return this._camera;
  }

  public addUpdateDelegate(
    delegate: (deltaTime: number, scene: THREE.Scene) => void
  ) {
    this._updateDelegates.push(delegate);
  }

  start(): void {
    let lastTime = 0;

    const animate = (now: number) => {
      now *= 0.001;
      const deltaTime = now - lastTime;
      lastTime = now;

      if (this._sceneManager.CurrentScene) {
        this._updateDelegates.forEach((delegate) =>
          delegate(deltaTime, this._sceneManager.CurrentScene)
        );
        this._sceneManager.CurrentScene.traverse(function (node) {

          if (node instanceof THREE.Mesh) {

            if (node.userData.name) console.log(node.userData.name);

          }

        });
        this._sceneManager.update(deltaTime);
        this._renderer.render(this._sceneManager.CurrentScene, this._camera);
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }
}
