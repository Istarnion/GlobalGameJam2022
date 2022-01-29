import game from "..";
import { TAU } from "../calc";
import { Component, ComponentType } from "../component";
import Entity from "../entity";
import BattleState from "../gamestates/battlestate";
import gfx from "../graphics";
import input from "../input";
import Animator from "./animator";
import Collider from "./collider";
import Mover from "./mover";

export default class Player extends Component {
    mover: Mover;
    animator: Animator;

    constructor(entity: Entity) {
        super(entity, ComponentType.PLAYER);
        this.mover = this.entity.first(ComponentType.MOVER) as Mover;
        this.animator = this.entity.first(ComponentType.ANIMATOR) as Animator;
    }

    override awake(): void {
        const collider = this.entity.first(ComponentType.COLLIDER) as Collider;
        collider.debugDraw = true;
        this.animator.play('stand weapon1')
    }

    override update(): void {
        // Mouselook
        const worldMouse = this.world.screenToWorld(input.mouseX, input.mouseY);
        const mouseDx = worldMouse[0] - this.entity.position.x;
        const mouseDy = worldMouse[1] - this.entity.position.y;
        this.entity.rotation = Math.atan2(mouseDy, mouseDx) + TAU/4;

        // Movement
        this.mover.inputx = this.mover.inputy = 0;

        if(input.keyIsPressed('up', 'w')) {
            this.mover.inputy -= 1;
        }
        if(input.keyIsPressed('down', 's')) {
            this.mover.inputy += 1;
        }
        if(input.keyIsPressed('left', 'a')) {
            this.mover.inputx -= 1;
        }
        if(input.keyIsPressed('right', 'd')) {
            this.mover.inputx += 1;
        }

        // Animation
        if(Math.abs(this.mover.inputx) + Math.abs(this.mover.inputy) > 0) {
            // walking
        }
        else {
            // Standing
        }
    }
}