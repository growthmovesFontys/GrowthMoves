// import { GameObject } from "../../threeCore/base";
// import * as THREE from "three";
// import { InputHandler } from "../../threeCore/interactions";

// export class Cube extends GameObject {
//   private _inputHandler: InputHandler;
//   constructor(inputHandler: InputHandler) {
//     const geometry = new THREE.BoxGeometry();
//     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     super(new THREE.Mesh(geometry, material));
//     this._inputHandler = inputHandler;
//   }

//   public update(deltaTime: number): void {
//     const keyStates = this._inputHandler.getKeyStates();
//     let speed = 0.2;

//     if (keyStates.ArrowUp) {
//       this.mesh.position.y += speed * deltaTime;
//     }
//     if (keyStates.ArrowDown) {
//       this.mesh.position.y -= speed * deltaTime;
//     }
//     if (keyStates.ArrowLeft) {
//       this.mesh.position.x -= speed * deltaTime;
//     }
//     if (keyStates.ArrowRight) {
//       this.mesh.position.x += speed * deltaTime;
//     }
//   }
// }
