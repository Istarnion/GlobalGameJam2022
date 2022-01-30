import { TAU } from "../calc";
import { Component, ComponentType } from "../component";
import Entity from "../entity";
import input from "../input";
import { Mask } from "../masks";
import { time } from "../timer";
import Animator from "./animator";
import Chef from "./chef";
import Mover from "./mover";


export default class Player extends Component {
    mover: Mover;
    animator: Animator;
    chef: Chef;
    weaponCooldown = 0;
    firedWeapon = false;

    constructor(entity: Entity) {
        super(entity, ComponentType.PLAYER);
        this.mover = this.entity.first(ComponentType.MOVER) as Mover;
        this.animator = this.entity.first(ComponentType.ANIMATOR) as Animator;
        this.chef = this.entity.first(ComponentType.CHEF) as Chef;
    }

    override update(): void {
        if(!this.chef.dying) {
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

            // Shooting
            this.firedWeapon = false;
            if(this.weaponCooldown <= 0) {
                if(input.mouseIsJustPressed()) {
                    this.chef.fire();
                    this.firedWeapon = true;
                }
            }
            else {
                this.weaponCooldown -= time.deltaTime();
            }

            // Animation
            if(Math.abs(this.mover.inputx) + Math.abs(this.mover.inputy) > 0) {
                this.chef.animationState = 'move weapon1';
            }
            else {
                this.chef.animationState = 'stand weapon1';
            }
        }
        else {
            this.mover.inputx = this.mover.inputy = 0;
        }
    }
}