import UpgradeType, { upgrades } from "./upgradetype";

export default class UpgradeArray {
    upgradesTypes: Array<UpgradeType> = [];

    constructor() {
        this.upgradesTypes.push(new UpgradeType("Coffe", "", upgrades.speed, 1.2))
    }

    getRandomUpgrade(): UpgradeType {
        const randomIndex = Math.floor(Math.random() * this.upgradesTypes.length);
        return this.upgradesTypes[randomIndex];
    }
}