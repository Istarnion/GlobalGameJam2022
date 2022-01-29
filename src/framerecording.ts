import { Vec2 } from "./calc";

export default class FrameRecording {
    position: Vec2 = { x: 0, y: 0 }
    rotation = 0;
    shoot = false;

    constructor(pos: Vec2, rot: number, shoot: boolean) {
        this.position = pos;
        this.rotation = rot;
        this.shoot = shoot;
    }
}