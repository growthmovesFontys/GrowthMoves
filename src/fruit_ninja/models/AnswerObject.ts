import * as THREE from 'three';
import { GameObject } from '../../threeCore/base';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { Font } from 'three/examples/jsm/loaders/FontLoader';
import { Body } from 'cannon';

export class AnswerObject extends GameObject {

    private _answer: number;
    private _textsize: THREE.Vector3;
    private _body!: Body;

    public set body(body: Body) {
        this._body = body;
    }
    public get body(): Body {
        return this._body;
    }



    public constructor(answer: number, font: Font) {
        const geometry = new TextGeometry(answer.toString(), {
            font: font,
            size: 0.5,
            height: 0.2,
        })
        geometry.computeBoundingBox();


        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        super(geometry, material);
        this._textsize = geometry.boundingBox!.getSize(new THREE.Vector3());
        this._answer = answer;
        this.userData = { answer: this._answer }

    }


    public get answer(): number {
        return this._answer;
    }

    public get textSize(): THREE.Vector3 {
        return this._textsize;
    }


    public update(deltaTime: number): void {
        console.log("not implemented")
    }
}