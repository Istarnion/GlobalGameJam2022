import { Rect } from "../calc";
import { Component, ComponentType } from "../component";
import Entity from "../entity";
import { Mask } from "../masks";

// Used for tilemaps
export class CollisionGrid {
    cellWidth: number;
    cellHeight: number;
    columns: number;
    rows: number;
    data: boolean[];

    constructor(cellWidth: number, cellHeight: number, columns: number, rows: number) {
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.columns = columns;
        this.rows = rows;
        this.data = new Array<boolean>(columns * rows);
        this.data.fill(false);
    }

    set(x: number, y: number, solid: boolean): void {
        this.data[x + y * this.columns] = solid;
    }

    get(x: number, y: number): boolean {
        return this.data[x + y * this.columns];
    }
}

type CollisionShape = Rect | CollisionGrid;

export default class Collider extends Component {
    mask = Mask.NONE;
    shape: CollisionShape;

    constructor(shape: CollisionShape, entity: Entity) {
        super(entity, ComponentType.COLLIDER);
        this.shape = shape;
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
        if(this.shape instanceof Rect) {
            // Create offset rect in world space
            const us = new Rect(this.entity.position.x + this.shape.x + xOffset,
                                this.entity.position.y + this.shape.y + yOffset,
                                this.shape.width, this.shape.height);

            if(collider.shape instanceof Rect) {
                const them = new Rect(collider.entity.position.x + collider.shape.x,
                                      collider.entity.position.y + collider.shape.y,
                                      collider.shape.width, collider.shape.height);
                return (us.overlaps(them));
            }
            else {
                const grid = collider.shape;
                const left = Math.floor((us.x-collider.entity.position.x) / grid.cellWidth);
                const right = left + Math.ceil(us.width / grid.cellWidth);
                const top = Math.floor((us.y-collider.entity.position.y) / grid.cellHeight);
                const bottom = top + Math.ceil(us.height / grid.cellHeight);

                for(let y=top; y<=bottom; ++y) {
                    for(let x=left; x<=right; ++x) {
                        if(grid.get(x, y)) {
                            return true;
                        }
                    }
                }

                return false;
            }
        }
        else {
            console.assert(false, "Checking collision as a grid is not supported.");
            return false;
        }
    }
}
