import { Result } from "../../global_utils";
import * as THREE from "three";
import { SceneManager } from "./SceneManager";

export class Engine {
  private _renderer: THREE.WebGLRenderer;
  private _lastTime = performance.now();
  private _camera: THREE.PerspectiveCamera;
  private _sceneManager: SceneManager;
  private _currentScene: THREE.Scene = new THREE.Scene();

  private _updateDelegates: ((
    deltaTime: number,
    scene: THREE.Scene
  ) => void)[] = [];

  constructor(
    camera: THREE.PerspectiveCamera,
    sceneManager: SceneManager,
    renderer: THREE.WebGLRenderer
  ) {
    this._camera = camera;
    this._sceneManager = sceneManager;
    this._renderer = renderer;
  }

  public addUpdateDelegate(
    delegate: (deltaTime: number, scene: THREE.Scene) => void
  ) {
    this._updateDelegates.push(delegate);
  }

  start(): void {
    let lastTime = 0;

    const animate = (now: number) => {
      now *= 0.001; // Convert now to seconds
      const deltaTime = now - lastTime;
      lastTime = now;

      if (this._currentScene) {
        this._updateDelegates.forEach((delegate) =>
          delegate(deltaTime, this._currentScene)
        );
        this._sceneManager.update(deltaTime);
        this._renderer.render(this._currentScene, this._camera);
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate); // Enkelvoudige aanroep voor requestAnimationFrame
  }
}
