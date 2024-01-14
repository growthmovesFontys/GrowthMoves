import * as THREE from 'three';


export class RaycastingLogic {
    private raycaster: THREE.Raycaster;

    private camera: THREE.PerspectiveCamera;

    constructor(camera: THREE.PerspectiveCamera) {
        this.camera = camera;
        this.raycaster = new THREE.Raycaster();

    }

    public checkAnswer(trailPoints: THREE.Points, answerObject: THREE.Object3D, correctAnswer: number): boolean {
        const pointPosition = new THREE.Vector3();
        pointPosition.fromBufferAttribute(trailPoints.geometry.attributes.position, 0); // Eerste punt
        const pointScreenPosition = pointPosition.clone().project(this.camera);

        if (this.checkIntersectionWithObjectAndChildren(pointScreenPosition, answerObject, 0.2)) {
            console.log("rte");
            if (answerObject.userData.answer === correctAnswer) {
                console.log("Correct answer found!");
                return true;
            }
        }

        return false;
    }


    private checkIntersectionWithObjectAndChildren(pointScreenPosition: THREE.Vector3, object: THREE.Object3D, tolerance: number): boolean {
        if (this.isPointNearObject(pointScreenPosition, object, tolerance)) {
            return true;
        }

        for (let child of object.children) {
            if (this.isPointNearObject(pointScreenPosition, child, tolerance)) {
                return true;
            }
        }

        return false;
    }

    private isPointNearObject(pointScreenPosition: THREE.Vector3, object: THREE.Object3D, tolerance: number): boolean {
        const objectPosition = new THREE.Vector3();
        object.getWorldPosition(objectPosition);
        const objectScreenPosition = objectPosition.clone().project(this.camera);

        const distance = pointScreenPosition.distanceTo(objectScreenPosition);
        return distance < tolerance;
    }
}






