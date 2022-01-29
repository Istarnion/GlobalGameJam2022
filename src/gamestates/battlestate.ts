import Collider from "../components/collider";
import Mover from "../components/mover";
import Player from "../components/player";
import Entity from "../entity";
import { createPlayer } from "../factory";
import GameState from "../gamestate";
import World from "../world";

export default class BattleState extends GameState {

    world: World;
    player: Entity;

    constructor() {
        super();

        this.world = new World();
        this.player = createPlayer(0, 0, this.world);
    }

    override start(args?: any): void {
    }

    override update(): void {
        this.world.update();
    }

    override draw(): void {
        this.world.render();
    }
}
