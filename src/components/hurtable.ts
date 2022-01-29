import { Component, ComponentType } from "../component";
import Entity from "../entity";
import { Mask } from "../masks";
import Collider from "./collider";

export default class Hurtable extends Component {
    hurtBy: Mask;
    collider: Collider;
    onCollision: Function | null;

    constructor(onCollision: Function | null, hurtBy: Mask, entity: Entity) {
        super(entity, ComponentType.HURTABLE);
        this.hurtBy = hurtBy;
        this.onCollision = onCollision;

        this.collider = this.entity.first(ComponentType.COLLIDER) as Collider;
    }

    override update(): void {
        if(this.collider.collidesAt(this.hurtBy, 0, 0)) {
            if(this.onCollision) {
                this.onCollision
            }
            else {
                this.world.destroyEntity(this.entity);
            }
        }
    }
}