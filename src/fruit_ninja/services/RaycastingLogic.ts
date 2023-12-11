import * as THREE from 'three';

export class RaycastingLogic {
    private raycaster: THREE.Raycaster;
    private mouse: THREE.Vector2;
    private camera: THREE.PerspectiveCamera;

    constructor(camera: THREE.PerspectiveCamera) {
        this.camera = camera;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        document.addEventListener("mousemove", this.onDocumentMouseMove.bind(this), false);
    }

    private onDocumentMouseMove(event: MouseEvent): void {
        event.preventDefault();
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }


    public checkAnswer(answerObject: THREE.Object3D, correctAnswer: number): boolean {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObject(answerObject, true);

        for (let intersect of intersects) {
            let target: THREE.Object3D | null = intersect.object;

            while (target && target !== this.camera) {
                if (target.userData.answer === correctAnswer) {
                    console.log("Correct answer found!");
                    return true;
                }
                target = target.parent;
            }
        }
        return false;
    }
}
