import { Vec2 } from "./calc";

export default class FrameRecording {
    x: number;
    y: number;
    rotation: number;
    animationState: string;
    shoot = false;

    constructor(x: number, y: number, rot: number, animState: string, shoot: boolean) {
        this.x = x;
        this.y = y;
        this.rotation = rot;
        this.animationState = animState;
        this.shoot = shoot;
    }
}