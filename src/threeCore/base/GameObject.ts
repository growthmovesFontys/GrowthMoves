import * as THREE from 'three';
import { IUpdatable } from '../core';

export abstract class GameObject extends THREE.Mesh implements IUpdatable {
  public abstract update(deltaTime: number): void;

  constructor(geometry?: THREE.BufferGeometry, material?: THREE.Material | THREE.Material[]) {
    super(geometry, material);
  }
}

