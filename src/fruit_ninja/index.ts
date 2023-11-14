import * as THREE_Core from "../threeCore";
import { InputHandler } from "../threeCore/interactions";
import { Cube } from "./models/Cube";
import { GameManager } from "./services/GameManager";

import * as THREE from "three";

const initialScene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
let rendererContainer = document.getElementsByClassName("game")[0];
rendererContainer.appendChild(renderer.domElement);
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);
camera.position.set(0, 150, 300);
camera.lookAt(0, 0, 0);
const gameManager = new GameManager(camera);
const inputHandler = new InputHandler();
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // zacht wit licht
initialScene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 5, 10); // Aanpassen naar behoefte
initialScene.add(directionalLight);



const sceneManager = new THREE_Core.base.SceneManager(initialScene);

const engine = new THREE_Core.base.Engine(camera, sceneManager, renderer);
engine.addUpdateDelegate((deltaTime, scene) => {
  gameManager.update(deltaTime, scene);
});

engine.start();
