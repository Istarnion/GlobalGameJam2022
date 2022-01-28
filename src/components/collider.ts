import { Rect } from "../calc";
import { Component, ComponentType } from "../component";
import Entity from "../entity";
import { Mask } from "../masks";

export default class Collider extends Component {
    mask = Mask.NONE;
    radius: number;

    constructor(radius: number, entity: Entity) {
        super(entity, ComponentType.COLLIDER);
        this.radius = radius;
    }

    collidesAt(mask: Mask, xOffset: number, yOffset: number): boolean {
        return this.firstCollisionAt(mask, xOffset, yOffset) !== null;
    }

    firstCollisionAt(mask: Mask, xOffset: number, yOffset: number): Collider | null {
        for(const other of this.world.all(ComponentType.COLLIDER) as Collider[]) {
            if((other.mask & this.mask) !== 0) {
                if(this.collidesWithAt(other, xOffset, yOffset)) {
                    return other;
                }
            }
        }

        return null;
    }

    allCollisionsAt(mask: Mask, xOffset: number, yOffset: number): Collider[] {
        const overlappedColliders: Collider[] = [];
        for(const other of this.world.all(ComponentType.COLLIDER) as Collider[]) {
            if((other.mask & this.mask) !== 0) {
                if(this.collidesWithAt(other, xOffset, yOffset)) {
                    overlappedColliders.push(other);
                }
            }
        }

        return overlappedColliders;
    }

    collidesWithAt(collider: Collider, xOffset: number, yOffset: number): boolean {
        const dx = (this.entity.position.x + xOffset) - collider.entity.position.x;
        const dy = (this.entity.position.y + yOffset) - collider.entity.position.y;

        const distSquared = dx*dx + dy*dy;
        const combinedRadius = this.radius + collider.radius;
        return distSquared <= (combinedRadius*combinedRadius);
    }
}
