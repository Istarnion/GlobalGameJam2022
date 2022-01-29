import { Component, ComponentType } from "./component";
import Entity from "./entity";
import gfx from "./graphics";

/**
 * Container for a simple entity-component framework.
 * World has an array of components that are attached to entities.
 * Components has both data and behaviour in this framework.
 */
export default class World {
    entities = new Array<Entity>();
    components: Array<Array<Component>>;
    cameraX = 0;
    cameraY = 0;

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
        gfx.save();
        gfx.translate(gfx.width/2-this.cameraX, gfx.height/2-this.cameraY);
        for(const compType of this.components) {
            for(const comp of compType) {
                if(comp.active && comp.entity.active) {
                    gfx.save();
                    if(comp.entity.rotation !== 0) {
                        gfx.translate(comp.entity.position.x, comp.entity.position.y);
                        gfx.rotate(comp.entity.rotation);
                        gfx.translate(-comp.entity.position.x, -comp.entity.position.y);
                    }
                    comp.render();
                    gfx.restore();
                }
            }
        }
        gfx.restore();
    }

    screenToWorld(x: number, y: number): [number, number] {
        return [
            x - gfx.width/2 + this.cameraX,
            y - gfx.height/2 + this.cameraY
        ];
    }

    worldToScreen(x: number, y: number): [number, number] {
        return [
            x + gfx.width/2 - this.cameraX,
            y + gfx.height/2 - this.cameraY
        ];
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
