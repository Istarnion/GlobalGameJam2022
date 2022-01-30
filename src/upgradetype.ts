import Stats from "./stats";


export default class UpgradeType {
    name = "crate";
    animation = "stand";
    stats: Stats;
    type: upgrades;

    constructor(type: upgrades, value: number) {
        this.stats = this.setStats(type, value);
        this.type = type;
    }

    setStats(type: upgrades, value: number) : Stats
    {
        let stats = new Stats();
        switch (type)
        {
            case upgrades.shield:
                stats.shield = value;
            case upgrades.speed:
                stats.speedModifier = value;
            case upgrades.projectileSpeed:
                stats.projectileSpeedModifier = value;
            case upgrades.damage:
                stats.damageModifer = value;
            case upgrades.slow:
                stats.slowOnHit = value;
            case upgrades.stun:
                stats.stunChance = value;
            case upgrades.invulnerability:
                stats.invulnerabilityTime = value;
            case upgrades.weaponSpread:
                stats.weaponSpreadModifier = value;
            case upgrades.weaponCooldown:
                stats.weaponCooldownModifier = value;
            case upgrades.explosionDelay:
                stats.explosionDelay = value;
            case upgrades.doubleShot:
                stats.doubleShotChance = value;
            case upgrades.explosionRange:
                stats.explosionRangeModifier = value;
        }

        return stats;
    }
}

export enum upgrades
{
    shield,
    speed,
    projectileSpeed,
    damage,
    slow,
    stun,
    invulnerability,
    weaponSpread,
    weaponCooldown,
    explosionDelay,
    doubleShot,
    explosionRange,
}