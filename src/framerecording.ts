import { Vec2 } from "./calc";

export default class FrameRecording {
    x: number;
    y: number;
    rotation: number;
    shoot = false;

    constructor(x: number, y: number, rot: number, shoot: boolean) {
        this.x = x;
        this.y = y;
        this.rotation = rot;
        this.shoot = shoot;
    }
}