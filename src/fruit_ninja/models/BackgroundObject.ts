import { GameObject } from '../../threeCore/base';
import * as THREE from 'three';

export class BackgroundObject extends GameObject {
  constructor(texture: THREE.Texture) {
    const geometry = new THREE.PlaneGeometry(1, 1);  // Pas de grootte naar wens aan
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    super(geometry, material);

    // Positionering en schaling kunnen hier worden ingesteld
    this.position.z = -0.1;
  }

  public update(deltaTime: number): void {

  }
}
