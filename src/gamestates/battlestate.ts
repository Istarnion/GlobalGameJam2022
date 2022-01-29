import Entity from "../entity";
import { createPlayer, createSlime } from "../factory";
import GameState from "../gamestate";
import World from "../world";

export default class BattleState extends GameState {

    world: World;
    player: Entity;

    constructor() {
        super();

        this.world = new World();
        this.player = createPlayer(0, 0, this.world);

        createSlime(0, -32, this.world);
        createSlime(-32, -32, this.world);
        createSlime(32, -32, this.world);
    }

    override update(): void {
        this.world.update();
        this.world.cameraX = this.player.position.x;
        this.world.cameraY = this.player.position.y;
    }

    override draw(): void {
        this.world.render();
    }
}
