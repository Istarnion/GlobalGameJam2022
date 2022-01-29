import Collider from "../components/collider";
import Mover from "../components/mover";
import Player from "../components/player";
import Entity from "../entity";
import { createPlayer } from "../factory";
import GameState from "../gamestate";
import gfx from "../graphics";
import World from "../world";

export default class BattleState extends GameState {

    world: World;
    player: Entity;
    cameraX = 0;
    cameraY = 0;

    constructor() {
        super();

        this.world = new World();
        this.player = createPlayer(0, 0, this.world);
    }

    override start(args?: any): void {
    }

    override update(): void {
        this.world.update();
        this.cameraX = this.player.position.x;
        this.cameraY = this.player.position.y;
    }

    override draw(): void {
        gfx.save();
        gfx.translate(gfx.width/2-this.cameraX, gfx.height/2-this.cameraY);
        this.world.render();
        gfx.restore();
    }
}
