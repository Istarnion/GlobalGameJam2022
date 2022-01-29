import { Component, ComponentType } from "../component";
import Entity from "../entity";

// Convenience component, just to make it easier to
// check if we're killed all enemies
export default class Enemy extends Component {
    constructor(entity: Entity) {
        super(entity, ComponentType.ENEMY);
    }
}