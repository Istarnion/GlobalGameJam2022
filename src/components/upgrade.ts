import { Component, ComponentType } from "../component";
import Entity from "../entity";
import { Mask } from "../masks";
import { PowerUp } from "../powerups/powerup";
import Animator from "./animator";
import Collider from "./collider";


export default class Upgrade extends Component {
    animator: Animator;
    collider: Collider;
    powerUp: PowerUp;

    constructor(entity: Entity, powerUp: PowerUp) {
        super(entity, ComponentType.UPGRADE);
        this.animator = this.entity.first(ComponentType.ANIMATOR) as Animator;
        this.collider = this.entity.first(ComponentType.COLLIDER) as Collider;
        this.powerUp = powerUp;
    }

    override update(): void {
        
    }
}