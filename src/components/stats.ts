import { Component, ComponentType } from "../component";
import Mover from "./mover";


export default class Stats extends Component {
    shield = 0;
    speedModifier = 1;
    projectileSpeedModifier = 1;
    damageModifer = 1;
    slowOnHit = 0;
    stunChance = 0;
    invulnerabilityTime = 0;
    weaponSpreadModifier = 1;
    weaponCooldownModifier = 1;
    explosionDelay = 0;
    doubleShotChance = 0;
    explosionRangeModifier = 1;

    onapply() {
        (this.entity.first(ComponentType.MOVER) as Mover)?.setSpeedModifier(this.speedModifier);
    }
}