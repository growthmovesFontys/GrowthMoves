import * as THREE from 'three';

export interface IMovementController {
    update(deltaTime: number, gameObject: THREE.Object3D): void;
  }