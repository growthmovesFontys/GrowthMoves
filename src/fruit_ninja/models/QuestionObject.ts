import { Font } from 'three/examples/jsm/loaders/FontLoader';
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { GameObject } from '../../threeCore/base';


export class QuestionObject extends GameObject {

  constructor(private questionText: string, private font: Font) {
    const geometry = new TextGeometry(questionText.toString(), {
      font: font,
      size: 0.5,
      height: 0.2,
    })
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    super(geometry, material);

  }


  public update(deltaTime: number): void {

  }
}
