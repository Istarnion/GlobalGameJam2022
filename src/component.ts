import Entity from "./entity";
import World from "./world";

export enum ComponentType {
    INVALID_TYPE,
    PEAPROJECTILE,
    TILEMAP,
    ANIMATOR,
    COLLIDER,
    MOVER,
    TEXT,
    PLAYER,
    NUM_TYPES
}

export class Component {
    type = ComponentType.INVALID_TYPE;
    active = true;
    alive = true;
    entity: Entity;

    constructor(entity: Entity, type: ComponentType) {
        this.entity = entity;
        this.type = type;
    }

    awake(): void {}
    update(): void {}
    render(): void {}
    destroy(): void {}

    get world(): World {
        return this.entity.world;
    }
}
