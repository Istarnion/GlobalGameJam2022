import { Component, ComponentType } from "../component";
import Entity from "../entity";
import gfx from "../graphics";
import Stats from "../stats";
import Mover from "./mover";


export default class EntityStats extends Component {
    stats: Stats;

    constructor(entity: Entity) {
        super(entity, ComponentType.STATS);
        this.stats = new Stats();
    }

    apply(stats: Stats) {
        this.stats.shield += stats.shield;
        this.stats.speedModifier *= stats.speedModifier;
        this.stats.projectileSpeedModifier *= stats.projectileSpeedModifier;
        this.stats.damageModifer *= stats.damageModifer;
        this.stats.slowOnHit += stats.slowOnHit;
        this.stats.stunChance += stats.stunChance;
        this.stats.invulnerabilityTime += stats.invulnerabilityTime;
        this.stats.weaponSpreadModifier *= stats.weaponSpreadModifier;
        this.stats.weaponCooldownModifier *= stats.weaponCooldownModifier;
        this.stats.explosionDelay += stats.explosionDelay;
        this.stats.doubleShotChance += stats.doubleShotChance;
        this.stats.explosionRangeModifier *= stats.explosionRangeModifier;

        this.onApply();
    }

    onApply() {
        (this.entity.first(ComponentType.MOVER) as Mover)?.setSpeedModifier(this.stats.speedModifier);
    }
    
    override render(): void {
        if (this.stats.shield > 0) {
            gfx.strokeStyle = "blue";
            gfx.drawCircle(this.entity.position.x, this.entity.position.y, 8);
        }
    }
}