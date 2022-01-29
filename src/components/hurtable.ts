import { Component, ComponentType } from "../component";
import Entity from "../entity";
import { Mask } from "../masks";
import Collider from "./collider";

export default class Hurtable extends Component {
    hurtBy: Mask;
    collider: Collider;
    onHurt: Function | null;

    constructor(onHurt: Function | null, hurtBy: Mask, entity: Entity) {
        super(entity, ComponentType.HURTABLE);
        this.hurtBy = hurtBy;
        this.onHurt = onHurt;

        this.collider = this.entity.first(ComponentType.COLLIDER) as Collider;
    }

    override update(): void {
        if(this.collider.collidesAt(this.hurtBy, 0, 0)) {
            if(this.onHurt) {
                this.onHurt();
            }
            else {
                this.world.destroyEntity(this.entity);
            }
        }
    }
}