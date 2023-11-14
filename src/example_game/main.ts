import * as THREE_Core from "../threeCore";
import { InputHandler } from "../threeCore/interactions";
import { Cube } from "./models/Cube";
import { Plane } from "./models/Plane";
import * as THREE from "three";

const initialScene = new THREE.Scene();
initialScene.background = new THREE.Color(0x9999ff);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);
camera.position.set(0, 50, 100);
camera.lookAt(0, 0, 0);

const inputHandler = new InputHandler();

const sceneManager = new THREE_Core.base.SceneManager(initialScene);
const myCube = new Cube(inputHandler);
const plane = new Plane();
sceneManager.addGameObject(plane);
sceneManager.addGameObject(myCube);
const engine = new THREE_Core.base.Engine(camera, sceneManager, renderer);

engine.start();
