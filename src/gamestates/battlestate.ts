import Collider from "../components/collider";
import Mover from "../components/mover";
import Player from "../components/player";
import Entity from "../entity";
import GameState from "../gamestate";
import World from "../world";

export default class BattleState extends GameState {

    world: World;
    player: Entity;

    constructor() {
        super();

        this.world = new World();
        this.player = this.world.addEntity(0, 0);
    }

    override start(args?: any): void {
        this.player.add(new Collider(64, this.player));
        this.player.add(new Mover(this.player));
        this.player.add(new Player(this.player));
    }

    override update(): void {
        this.world.update();
    }

    override draw(): void {
        this.world.render();
    }
}
