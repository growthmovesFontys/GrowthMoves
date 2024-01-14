import { Pose, Results, InputMap, NormalizedLandmarkList, Landmark } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';

export class PoseCameraProcessor {
  private pose!: Pose;
  private camera!: Camera;
  private _landmarks!: NormalizedLandmarkList
  private dataReceived: boolean = false;

  constructor(private videoElement: HTMLVideoElement) {
    this.initPose();
    this.initCamera();
  }

  private initPose() {
    this.pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
    });
    this.pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
    this.pose.onResults(results => this.setPoselandMarks(results));
  }


  private initCamera() {
    this.camera = new Camera(this.videoElement, {
      onFrame: async () => {
        const inputs: InputMap = { image: this.videoElement };
        await this.pose.send(inputs);
      },
      width: 1280,
      height: 720
    });
  }

  public start() {
    this.camera.start();
  }

  private setPoselandMarks(result: Results): void {
    this._landmarks = result.poseLandmarks;
    this.dataReceived = true;
  }

  public hasData(): boolean {
    return this.dataReceived;
  }

  public getPoselandMarks(): NormalizedLandmarkList {
    return this._landmarks;
  }
}



