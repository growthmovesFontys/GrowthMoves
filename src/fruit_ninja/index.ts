import { PoseCameraProcessor } from './../mediaPipeLayer/poseCameraProcessor';
import { GameManager } from "./GameManager";
import { GameConfig } from './utitls/GameConfig';


const videoElement = document.getElementsByClassName('input_video')[0] as HTMLVideoElement;
const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;


videoElement.addEventListener('loadedmetadata', () => {
    const width = videoElement.videoWidth;
    const height = videoElement.videoHeight;
    GameConfig.updateSize(width, height);
});

const poseCameraProcessor = new PoseCameraProcessor(videoElement);
const gameManager = new GameManager(poseCameraProcessor);


window.startGame = () => {
    gameManager.startgame();
};
