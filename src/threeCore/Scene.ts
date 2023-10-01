import { IRenderable } from './interfaces/IRenderable';
import { DynamicGameObject } from './abstract/DynamicGameObject';
import * as THREE from 'three';

export class Scene implements IRenderable {
  private threeScene: THREE.Scene;
  private gameObjects: DynamicGameObject[] = [];

  constructor() {
    this.threeScene = new THREE.Scene();
  }

  public addGameObject(gameObject: DynamicGameObject): void {
    this.gameObjects.push(gameObject);
    this.threeScene.add(gameObject.mesh);
  }

  public update(deltaTime: number): void {
    for (const obj of this.gameObjects) {
      obj.update(deltaTime);
    }
  }

  public render(deltaTime: number): void {
    for (const obj of this.gameObjects) {
      obj.render(deltaTime);
    }
  }

  public getThreeScene(): THREE.Scene {
    return this.threeScene;
  }
}
