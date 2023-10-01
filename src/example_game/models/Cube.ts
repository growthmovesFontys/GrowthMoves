import { DynamicGameObject } from '../../threeCore/abstract/DynamicGameObject';
import * as THREE from 'three';

export class Cube extends DynamicGameObject {
  constructor() {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    super(new THREE.Mesh(geometry, material));
  }

  public update(deltaTime: number): void {
    // Update logic here
  }

  public render(deltaTime: number): void {
    // Render logic here
  }
}
