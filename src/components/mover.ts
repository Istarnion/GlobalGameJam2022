import { Component, ComponentType } from "../component";
import Entity from "../entity";
import { Mask } from "../masks";
import { time } from "../timer";
import Collider from "./collider";

export default class Mover extends Component {
    dx = 0;
    dy = 0;
    xError = 0;
    yError = 0;
    collider: Collider | undefined;

    onCollisionX: Function | undefined;
    onCollisionY: Function | undefined;

    constructor(entity: Entity) {
        super(entity, ComponentType.MOVER);
    }

    override update(): void {
        const dt = time.deltaTime();
        this.moveX(this.dx * dt);
        this.moveY(this.dy * dt);
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
        this.dx = 0;
    }

    stopY(): void {
        this.xError = 0;
        this.dx = 0;
    }
}
