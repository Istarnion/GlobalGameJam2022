import audio from "../audio";
import { vec2Magnitude } from "../calc";
import { Component, ComponentType } from "../component";
import Entity from "../entity";
import gfx from "../graphics";
import { time } from "../timer";

export default class PeaProjectile extends Component {
    dx = 0;
    dy = 0;

    constructor(entity: Entity) {
        super(entity, ComponentType.PEAPROJECTILE);
        audio.play("pee");
    }

    override update(): void {
        const dt = time.deltaTime();
        this.entity.position.x += this.dx * dt;
        this.entity.position.y += this.dy * dt;

        if(vec2Magnitude(this.entity.position) > 256) {
            this.world.destroyEntity(this.entity);
        }
    }

    override render(): void {
        gfx.fillStyle = 'lime';
        gfx.fillCircle(this.entity.position.x, this.entity.position.y, 2);
    }
}