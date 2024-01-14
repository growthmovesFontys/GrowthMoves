import * as THREE from 'three';

export class GameConfig {
  static camera: THREE.PerspectiveCamera;
  static renderer: THREE.WebGLRenderer;
  static width: number;
  static height: number;


  static createCamera(): THREE.PerspectiveCamera {

    GameConfig.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    GameConfig.camera.position.z = 4;

    return GameConfig.camera;
  }

  static createScene(): THREE.Scene {
    return new THREE.Scene();
  }

  static createRenderer(): THREE.WebGLRenderer {
    GameConfig.renderer = new THREE.WebGLRenderer({ alpha: true });
    // Standaard grootte, wordt later aangepast
    GameConfig.renderer.setSize(300, 150);
    document.body.appendChild(GameConfig.renderer.domElement);

    return GameConfig.renderer;
  }

  static updateSize(width: number, height: number): void {
    GameConfig.renderer.setSize(width, height);
    GameConfig.camera.aspect = width / height;
    GameConfig.camera.updateProjectionMatrix();
    GameConfig.width = width;
    GameConfig.height = height;

  }
}
