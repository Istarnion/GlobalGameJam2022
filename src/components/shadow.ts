import { Component, ComponentType } from "../component";
import Entity from "../entity";

export default class Shadow extends Component {
    startX: number;
    startY: number;

    constructor(entity: Entity) {
        super(entity, ComponentType.SHADOW);
        this.startX = this.entity.position.x;
        this.startY = this.entity.position.y;
    }
}