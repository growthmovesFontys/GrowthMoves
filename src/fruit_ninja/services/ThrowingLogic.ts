import * as CANNON from 'cannon';
import { Vector3 } from 'three';
import * as THREE from 'three';

export class ThrowingLogic {
  calculateStartPosition(camera: THREE.PerspectiveCamera): { startPosition: Vector3, body: CANNON.Body } {
    const vFOV = THREE.MathUtils.degToRad(camera.fov);
    const heightAtCameraZ = 2 * Math.tan(vFOV / 2) * camera.position.z;
    const aspect = camera.aspect;
    const widthAtCameraZ = heightAtCameraZ * aspect;


    const fromLeft = Math.random() < 0.5;

    const startPositionX = (fromLeft ? -1 : 1) * (widthAtCameraZ / 4 + Math.random() * 2);
    const startPositionY = -5;

    const body = new CANNON.Body({
      mass: 1,
      shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.2, 0.1))
    });


    const velocityX = fromLeft ? 3 + Math.random() * 2 : -3 - Math.random() * 2;
    const velocityY = 8 + Math.random() * 4;

    body.position.set(startPositionX, startPositionY, 0);
    body.velocity.set(velocityX / 1.5, velocityY / 1.5, 0);

    return {
      startPosition: new Vector3(startPositionX, startPositionY, 0),
      body: body
    };
  }


  public calculateVerticalPosition(camera: THREE.PerspectiveCamera) {

    const vFOV = camera.fov * Math.PI / 180;
    const heightAtCameraZ = 2 * Math.tan(vFOV / 2) * camera.position.z;
    const quarterHeight = heightAtCameraZ * 3 / 4;

    return quarterHeight - heightAtCameraZ / 2;
  }

}
