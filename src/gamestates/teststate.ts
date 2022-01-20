import { ComponentType } from "../component";
import Animator from "../components/animator";
import Mover from "../components/mover";
import Player from "../components/player";
import Tilemap from "../components/tilemap";
import Entity from "../entity";
import GameState from "../gamestate";
import gfx from "../graphics";
import input from "../input";
import { fonts, maps, sprites } from "../loader";
import World from "../world";

export class TestState extends GameState {
    map: Entity;
    cameraX = 0;
    cameraY = 0;
    world = new World();
    player: Entity;

    constructor() {
        super();
        this.map = this.world.addEntity(0, 0);
        this.player = this.world.addEntity(8, 8);
    }

    override start(args?: any): void {
        this.map.add(new Tilemap(maps.testmap, this.map));
        this.player.add(new Animator(sprites.testcharacter, this.player));
        this.player.add(new Mover(this.player));
        this.player.add(new Player(this.player));
    }

    override update(): void {
        this.world.update();
    }

    override draw(): void {
        const tilemap = this.map.first(ComponentType.TILEMAP) as Tilemap;
        tilemap.setViewport(this.cameraX, this.cameraY, gfx.width, gfx.height);
        this.world.render();

        fonts['express_mono'].drawText("Tpis is a test string", 32, 64);
    }
}
