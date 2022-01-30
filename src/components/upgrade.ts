import { Component, ComponentType } from "../component";
import Entity from "../entity";
import { Mask } from "../masks";
import Stats from "../stats";
import UpgradeType from "../upgradetype";
import Animator from "./animator";
import Collider from "./collider";
import EntityStats from "./entitystats";
import Player from "./player";


export default class Upgrade extends Component {
    collider: Collider;
    upgradeType: UpgradeType;

    constructor(upgradeType: UpgradeType, entity: Entity) {
        super(entity, ComponentType.UPGRADE);
        this.collider = this.entity.first(ComponentType.COLLIDER) as Collider;
        this.upgradeType = upgradeType;
    }

    override update(): void {
        if (this.collider.collidesAt(Mask.PLAYER, 0, 0))
        {
            const player = this.world.first(ComponentType.PLAYER) as Player;
            player.chef.takeUpgrade(this.upgradeType);
            this.world.destroyEntity(this.entity);
        }
    }
}