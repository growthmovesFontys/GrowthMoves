import { IRenderable } from '../interfaces/IRenderable';
import * as THREE from 'three';

export abstract class GameObject implements IRenderable {
  public mesh: THREE.Mesh;
  
  constructor(mesh: THREE.Mesh) {
    this.mesh = mesh;
  }
  
  abstract render(deltaTime: number): void;
}
