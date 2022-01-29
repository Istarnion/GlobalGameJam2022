import Entity from "../entity";
import { createPlayer, createSlime } from "../factory";
import GameState from "../gamestate";
import game from "..";
import { ComponentType } from "../component";
import Player from "../components/player";
import FrameRecording from "../framerecording";
import Recording from "../recording";
import World from "../world";

export default class BattleState extends GameState {

    world: World;
    player: Entity;
    currentLevel = 0;
    recordings: Array<Recording> = [];
    currentRecording: Recording;

    constructor(currentLevel: number, recordings: Array<Recording>) {
        super();

        this.world = new World();
        this.player = createPlayer(0, 0, this.world);
        this.currentLevel = currentLevel;
        this.recordings = recordings;
        this.currentRecording = new Recording();
        createSlime(0, -32, this.world);
        createSlime(-32, -32, this.world);
        createSlime(32, -32, this.world);
    }

    override update(): void {
        this.world.update();
        this.world.cameraX = this.player.position.x;
        this.world.cameraY = this.player.position.y;

        this.currentRecording.add(new FrameRecording(this.player.position,
                                                    this.player.rotation,
                                                    (this.player.first(ComponentType.PLAYER) as Player).firedWeapon));
    }

    override draw(): void {
        this.world.render();
    }

    onNewLevel() {
        this.recordings.push(this.currentRecording);
        game.popState();
        game.pushState(new BattleState(++this.currentLevel, this.recordings));
    }
}
