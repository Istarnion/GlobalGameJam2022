import Entity from "./entity";
import World from "./world";

export enum ComponentType {
    INVALID_TYPE,
    PEAPROJECTILE,
    ENEMY,
    SHADOW,
    HURTABLE,
    TILEMAP,
    ANIMATOR,
    COLLIDER,
    MOVER,
    TEXT,
    PLAYER,
    UPGRADE,
    STATS,
    CHEF,
    NUM_TYPES
}

export class Component {
    type = ComponentType.INVALID_TYPE;
    active = true;
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
