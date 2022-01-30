import UpgradeType, { upgrades } from "./upgradetype";

export default class UpgradeArray {
    upgradesTypes: Array<UpgradeType> = [];

    constructor() {
        this.upgradesTypes.push(new UpgradeType(upgrades.speed, 1.2))
        this.upgradesTypes.push(new UpgradeType(upgrades.shield, 1))
        this.upgradesTypes.push(new UpgradeType(upgrades.projectileSpeed, 1.5))
    }

    getRandomUpgrade(): UpgradeType {
        const randomIndex = Math.floor(Math.random() * this.upgradesTypes.length);
        return this.upgradesTypes[randomIndex];
    }
}