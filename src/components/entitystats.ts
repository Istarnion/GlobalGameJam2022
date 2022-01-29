import { Component, ComponentType } from "../component";
import Entity from "../entity";
import Stats from "../stats";
import Mover from "./mover";


export default class EntityStats extends Component {
    stats: Stats;

    constructor(entity: Entity) {
        super(entity, ComponentType.STATS);
        this.stats = new Stats();
    }

    apply(entityStats: EntityStats) {
        this.stats.shield += entityStats.stats.shield;
        this.stats.speedModifier *= entityStats.stats.speedModifier;
        this.stats.projectileSpeedModifier *= entityStats.stats.projectileSpeedModifier;
        this.stats.damageModifer *= entityStats.stats.damageModifer;
        this.stats.slowOnHit += entityStats.stats.slowOnHit;
        this.stats.stunChance += entityStats.stats.stunChance;
        this.stats.invulnerabilityTime += entityStats.stats.invulnerabilityTime;
        this.stats.weaponSpreadModifier *= entityStats.stats.weaponSpreadModifier;
        this.stats.weaponCooldownModifier *= entityStats.stats.weaponCooldownModifier;
        this.stats.explosionDelay += entityStats.stats.explosionDelay;
        this.stats.doubleShotChance += entityStats.stats.doubleShotChance;
        this.stats.explosionRangeModifier *= entityStats.stats.explosionRangeModifier;

        this.onApply();
    }

    onApply() {
        (this.entity.first(ComponentType.MOVER) as Mover)?.setSpeedModifier(this.stats.speedModifier);
    }
}