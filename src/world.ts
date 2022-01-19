import { Component, ComponentType } from "./component";
import Entity from "./entity";

/**
 * Container for a simple entity-component framework.
 * World has an array of components that are attached to entities.
 * Components has both data and behaviour in this framework.
 */
export default class World {
    entities = new Array<Entity>();
    components: Array<Array<Component>>;

    constructor() {
        this.components = [];
        for(let i=1; i<ComponentType.NUM_TYPES; ++i) {
            this.components.push([]);
        }
    }

    update(): void {
        for(const compType of this.components) {
            for(const comp of compType) {
                if(comp.active && comp.entity.active) {
                    comp.update();
                }
            }
        }
    }

    render(): void {
        for(const compType of this.components) {
            for(const comp of compType) {
                if(comp.active && comp.entity.active) {
                    comp.render();
                }
            }
        }
    }

    addEntity(x: number, y: number): Entity {
        const entity = new Entity(this);
        entity.position = { x: x, y: y };
        this.entities.push(entity);
        return entity;
    }

    destroyEntity(entity: Entity): void {
        entity.active = false;
        for(const comp of entity.components) {
            this.destroy(comp);
        }

        for(let i=0; i<this.entities.length; ++i) {
            if(this.entities[i] === entity) {
                this.entities.splice(i, 1);
                break;
            }
        }
    }
 
    first(compType: ComponentType): Component | null {
        if(this.components[compType].length > 0) {
            return this.components[compType - 1][0];
        }
        else {
            return null;
        }
    }

    all(compType: ComponentType): Component[] {
        return this.components[compType-1];
    }

    add(comp: Component): Component {
        const componentsOfSameType = this.components[comp.type - 1];
        componentsOfSameType.push(comp);
        comp.awake();
        return comp;
    }

    destroy(comp: Component): void {
        comp.alive = false;
        const componentsOfSameType = this.components[comp.type - 1];
        for(let i=0; i<componentsOfSameType.length; ++i) {
            if(componentsOfSameType[i] === comp) {
                componentsOfSameType.splice(i, 1);
                break;
            }
        }

        comp.destroy();
    }
}
