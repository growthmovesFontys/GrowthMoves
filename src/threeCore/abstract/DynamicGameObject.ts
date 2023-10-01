import { GameObject } from './GameObject';
import { IMovementController } from '../../controlLayer/Interfaces/IMovementController';

export abstract class DynamicGameObject extends GameObject {
  private movementController?: IMovementController;
  
  constructor(mesh: THREE.Mesh, movementController?: IMovementController) {
    super(mesh);
    this.movementController = movementController;
  }

  public setMovementController(controller: IMovementController) {
    this.movementController = controller;
  }

  public update(deltaTime: number): void {
    if (this.movementController) {
      this.movementController.update(deltaTime, this.mesh);
    }
  }
}
