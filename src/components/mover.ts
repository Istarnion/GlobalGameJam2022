import { Component, ComponentType } from "../component";
import Entity from "../entity";
import { Mask } from "../masks";
import { time } from "../timer";
import Collider from "./collider";

export default class Mover extends Component {
    inputx = 0;
    inputy = 0;
    speed = 64;
    xError = 0;
    yError = 0;
    collider: Collider | undefined;

    onCollisionX: Function | undefined;
    onCollisionY: Function | undefined;

    constructor(speed: number, entity: Entity) {
        super(entity, ComponentType.MOVER);
        this.speed = speed;
    }

    override update(): void {
        const dt = time.deltaTime();
        let dx = this.inputx;
        let dy = this.inputy;
        if(Math.abs(dx) + Math.abs(dy) > 1) {
            const mag = Math.sqrt(dx*dx + dy*dy);
            dx /= mag;
            dy /= mag;
        }

        this.moveX(dx * this.speed * dt);
        this.moveY(dy * this.speed * dt);
    }

    moveX(amount: number): void {
        if(this.collider) {
            this.xError += amount;
            amount = Math.round(this.xError);
            if(Math.abs(amount) > 0) {
                const sign = Math.sign(amount);
                while(amount !== 0) {
                    if(this.collider.collidesAt(Mask.SOLID, sign, 0)) {
                        if(this.onCollisionX) {
                            this.onCollisionX(this);
                        }
                        else {
                            this.stopX();
                        }

                        break;
                    }

                    this.entity.position.x += sign;
                    amount -= sign;
                    this.xError -= sign;
                }
            }
        }
        else {
            this.entity.position.x += amount;
        }
    }

    moveY(amount: number): void {
        if(this.collider) {
            this.yError += amount;
            amount = Math.round(this.yError);
            if(Math.abs(amount) > 0) {
                const sign = Math.sign(amount);
                while(amount !== 0) {
                    if(this.collider.collidesAt(Mask.SOLID, 0, sign)) {
                        if(this.onCollisionY) {
                            this.onCollisionY(this);
                        }
                        else {
                            this.stopY();
                        }

                        break;
                    }

                    this.entity.position.y += sign;
                    amount -= sign;
                    this.xError -= sign;
                }
            }
        }
        else {
            this.entity.position.y += amount;
        }
    }

    stopX(): void {
        this.xError = 0;
    }

    stopY(): void {
        this.xError = 0;
    }
}
