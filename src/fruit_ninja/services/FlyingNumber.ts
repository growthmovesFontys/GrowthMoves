import * as THREE from "three";

export class FlyingNumber {
  mesh;
  velocityX;
  velocityY;
  timeInAir = 0;
  phase = "ascending";
  value: number;

  constructor(
    mesh: THREE.Mesh,
    velocityX: number,
    velocityY: number,
    value: number
  ) {
    this.mesh = mesh;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.value = value;
  }

  update(deltaTime: number, gravity: number): void {
    this.timeInAir += deltaTime;

    if (this.phase === "ascending" && this.timeInAir >= 2) {
      this.phase = "falling";
    }

    if (this.phase === "falling") {
      this.velocityY += gravity * deltaTime;
    }

    this.mesh.position.x += this.velocityX * deltaTime;
    this.mesh.position.y += this.velocityY * deltaTime;
  }
}
