import * as THREE from 'three';

export class GameConfig {
  static createCamera(): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    return camera;
  }

  static createScene(): THREE.Scene {
    return new THREE.Scene();
  }

  static createRenderer(): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    return renderer;
  }
}


