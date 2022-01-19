import { Component, ComponentType } from "../component";
import Entity from "../entity";
import input from "../input";
import Animator from "./animator";
import Mover from "./mover";

export default class Player extends Component {
    mover: Mover;
    animator: Animator;
    facingRight = true;

    constructor(entity: Entity) {
        super(entity, ComponentType.PLAYER);
        this.mover = this.entity.first(ComponentType.MOVER) as Mover;
        this.animator = this.entity.first(ComponentType.ANIMATOR) as Animator;
    }

    override update(): void {
        this.mover.dx = this.mover.dy = 0;

        if(input.keyIsPressed('up', 'w')) {
            this.mover.dy -= 8;
        }
        if(input.keyIsPressed('down', 's')) {
            this.mover.dy += 8;
        }
        if(input.keyIsPressed('left', 'a')) {
            this.mover.dx -= 8;
        }
        if(input.keyIsPressed('right', 'd')) {
            this.mover.dx += 8;
        }

        this.facingRight = this.mover.dx >= 0;

        if(Math.abs(this.mover.dx) + Math.abs(this.mover.dy) > 0) {
            if(this.facingRight) {
                this.animator.play('run_right');
            }
            else {
                this.animator.play('run_left');
            }
        }
        else {
            this.animator.play('idle');
        }
    }
}