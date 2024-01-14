import { NormalizedLandmarkList } from '@mediapipe/pose';
import { Vec2 } from "three";

export class Trailcalculator {


    private alphaLerp: number = 0.1;


    private lerp(start: number, end: number) {
        return start + (end - start) * this.alphaLerp;
    }

    public updateTrailPosition(landmarks: NormalizedLandmarkList) {

    }






}