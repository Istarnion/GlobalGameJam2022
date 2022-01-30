import { Component, ComponentType } from "../component";
import Entity from "../entity";
import Chef from "./chef";

export default class Shadow extends Component {
    startX: number;
    startY: number;
    chef: Chef;

    constructor(entity: Entity) {
        super(entity, ComponentType.SHADOW);
        this.startX = this.entity.position.x;
        this.startY = this.entity.position.y;
        this.chef = this.entity.first(ComponentType.CHEF) as Chef;
    }
}