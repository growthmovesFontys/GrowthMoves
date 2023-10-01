import { Scene } from './Scene';
import * as THREE from 'three';

export class Engine {
  private renderer: THREE.WebGLRenderer;
  private scene: Scene;
  private camera: THREE.PerspectiveCamera;

  constructor(scene: Scene, camera: THREE.PerspectiveCamera) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  public start() {
    let lastTime = performance.now();
    const animate = () => {
      requestAnimationFrame(animate);
      let currentTime = performance.now();
      let deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      this.scene.update(deltaTime);
      this.scene.render(deltaTime);
      this.renderer.render(this.scene.getThreeScene(), this.camera);
    };
    animate();
  }
}
