import game from "..";
import { TAU } from "../calc";
import { Component, ComponentType } from "../component";
import Entity from "../entity";
import { createPeaProjectile } from "../factory";
import BattleState from "../gamestates/battlestate";
import gfx from "../graphics";
import input from "../input";
import { Mask } from "../masks";
import { time } from "../timer";
import World from "../world";
import Animator from "./animator";
import Collider from "./collider";
import Mover from "./mover";
import EntityStats from "./entitystats";

interface Weapon {
    world: World;
    cooldown: number;
    fire(x: number, y: number, heading: number): void;
}

class PeaShooter implements Weapon {
    world: World;
    cooldown = 0.1;

    constructor(world: World) {
        this.world = world;
    }

    fire(x: number, y: number, heading: number): void {
        x += Math.cos(heading-TAU/4) * 8;
        y += Math.sin(heading-TAU/4) * 8;
        createPeaProjectile(x, y, heading, 128, Mask.PLAYER_PROJECTILE, this.world);
    }
}

export default class Player extends Component {
    mover: Mover;
    animator: Animator;
    weapon: Weapon;
    entityStats: EntityStats;
    weaponCooldown = 0;
    firedWeapon = false;
    dying = false;

    constructor(entity: Entity) {
        super(entity, ComponentType.PLAYER);
        this.mover = this.entity.first(ComponentType.MOVER) as Mover;
        this.animator = this.entity.first(ComponentType.ANIMATOR) as Animator;
        this.weapon = new PeaShooter(this.world);
        this.entityStats = this.entity.first(ComponentType.STATS) as EntityStats;
    }

    override awake(): void {
        this.animator.play('stand weapon1')
    }

    override update(): void {
        if(!this.dying) {
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
                    this.weapon.fire(this.entity.position.x, this.entity.position.y, this.entity.rotation);
                    this.firedWeapon = true;
                }
            }
            else {
                this.weaponCooldown -= time.deltaTime();
            }

            // Animation
            if(Math.abs(this.mover.inputx) + Math.abs(this.mover.inputy) > 0) {
                this.animator.play('move weapon1')
            }
            else {
                this.animator.play('stand weapon1')
            }
        }
        else {
            this.mover.inputx = this.mover.inputy = 0;
            this.animator.play('death');
            if(this.animator.frameIndex === 2 && this.animator.frameTime >= 50) {
                this.world.destroyEntity(this.entity);
            }
        }
    }
}