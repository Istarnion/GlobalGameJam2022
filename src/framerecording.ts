import { Vec2 } from "./calc";
import UpgradeType from "./upgradetype";

export default class FrameRecording {
    x: number;
    y: number;
    rotation: number;
    animationState: string;
    upgrade: UpgradeType | null;
    shoot = false;

    constructor(x: number, y: number, rot: number, animState: string, upgrade: UpgradeType | null, shoot: boolean) {
        this.x = x;
        this.y = y;
        this.rotation = rot;
        this.animationState = animState;
        this.upgrade = upgrade;
        this.shoot = shoot;
    }
}