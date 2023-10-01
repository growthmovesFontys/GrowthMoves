import { Engine } from '../threeCore/Engine';
import { Scene } from '../threeCore/Scene';
import { Cube } from './models/Cube';
import * as THREE from 'three';

const myScene = new Scene();
const myCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const myEngine = new Engine(myScene, myCamera);

const myCube = new Cube();
myScene.addGameObject(myCube);

myEngine.start();
