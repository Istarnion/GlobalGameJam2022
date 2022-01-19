import { Vec2 } from "./calc";
import { Component, ComponentType } from "./component";
import World from "./world";

export default class Entity {
    active = true;
    world: World;
    position: Vec2 = { x: 0, y: 0 };
    visible = true;
    components: Array<Component> = [];

    constructor(world: World) {
        this.world = world;
    }

    first(compType: ComponentType): Component | null {
        for(const c of this.components) {
            if(c.type === compType) {
                return c;
            }
        }

        return null;
    }

    add<T extends Component>(comp: T): T {
        this.components.push(comp);
        this.world.add(comp);
        return comp;
    }
}
