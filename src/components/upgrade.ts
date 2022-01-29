import { Component, ComponentType } from "../component";
import Entity from "../entity";
import { Mask } from "../masks";
import Stats from "../stats";
import Animator from "./animator";
import Collider from "./collider";
import EntityStats from "./entitystats";


export default class Upgrade extends Component {
    animator: Animator;
    collider: Collider;
    entityStats: EntityStats;

    constructor(entity: Entity, stats: Stats) {
        super(entity, ComponentType.UPGRADE);
        this.animator = this.entity.first(ComponentType.ANIMATOR) as Animator;
        this.collider = this.entity.first(ComponentType.COLLIDER) as Collider;
        this.entityStats = this.entity.first(ComponentType.STATS) as EntityStats;
        this.entityStats.stats = stats;
    }

    override update(): void {
        if (this.collider.collidesAt(Mask.PLAYER, 0, 0))
        {
            this.apply(this.world.first(ComponentType.PLAYER)?.entity.first(ComponentType.STATS) as EntityStats);
            this.world.destroyEntity(this.entity);
        }
    }

    apply(entityStats: EntityStats) {
        entityStats.apply(this.entityStats);
    }
}