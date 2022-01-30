import { TAU } from "../calc";
import { Component, ComponentType } from "../component";
import Entity from "../entity";
import { createPeaProjectile } from "../factory";
import { Mask } from "../masks";
import World from "../world";
import Animator from "./animator";

interface Weapon {
    world: World;
    cooldown: number;
    fire(x: number, y: number, heading: number, projectileMask: Mask): void;
}

class PeaShooter implements Weapon {
    world: World;
    cooldown = 0.1;

    constructor(world: World) {
        this.world = world;
    }

    fire(x: number, y: number, heading: number, projectileMask: Mask): void {
        x += Math.cos(heading-TAU/4) * 8;
        y += Math.sin(heading-TAU/4) * 8;
        createPeaProjectile(x, y, heading, 128, projectileMask, this.world);
    }
}

export default class Chef extends Component {
    animator: Animator;
    weapon: Weapon;
    dying = false;
    animationState: string;
    projectileMask: Mask;

    constructor(projectileMask: Mask, entity: Entity) {
        super(entity, ComponentType.CHEF);
        this.projectileMask = projectileMask;
        this.animator = this.entity.first(ComponentType.ANIMATOR) as Animator;
        this.weapon = new PeaShooter(this.world);
        this.animationState = 'stand weapon1';
    }

    fire(): void {
        this.weapon.fire(this.entity.position.x, this.entity.position.y, this.entity.rotation, this.projectileMask);
    }

    override update(): void {
        if(!this.dying) {
            this.animator.play(this.animationState);
        }
        else {
            this.animator.play('death');
            if(this.animator.frameIndex === 2 && this.animator.frameTime >= 50) {
                this.world.destroyEntity(this.entity);
            }
        }
    }
}