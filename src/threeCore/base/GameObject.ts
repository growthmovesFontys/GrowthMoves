import { Result } from "../../global_utils";
import * as THREE from "three";
import { IUpdatable } from "../core";

export abstract class GameObject implements IUpdatable {
  public abstract update(deltaTime: number): void;
  protected mesh: THREE.Mesh;

  public get Mesh(): THREE.Mesh {
    return this.mesh;
  }

  public constructor(mesh: THREE.Mesh) {
    this.mesh = mesh;
  }
}
