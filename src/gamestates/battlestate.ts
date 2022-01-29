import Entity from "../entity";
import { createPeaProjectile, createPlayer, createShadowChef, createSlime } from "../factory";
import GameState from "../gamestate";
import game from "..";
import { ComponentType } from "../component";
import Player from "../components/player";
import FrameRecording from "../framerecording";
import Recording from "../recording";
import World from "../world";
import Shadow from "../components/shadow";
import { TAU } from "../calc";
import { Mask } from "../masks";

export default class BattleState extends GameState {

    world: World;
    player: Entity;
    currentLevel = 0;
    recordings: Array<Recording> = [];
    shadows: Array<Array<Shadow>> = [];
    currentRecording: Recording;

    constructor(currentLevel: number, recordings: Array<Recording>) {
        super();

        this.world = new World();
        this.player = createPlayer(0, 0, this.world);
        this.currentLevel = currentLevel;
        this.recordings = recordings;
        this.currentRecording = new Recording();

        if(currentLevel === 0) {
            createSlime(0, -32, this.world);
        }
        else {
            let totalShadows = 0;
            for(let i=0; i<recordings.length; ++i) {
                totalShadows += recordings.length - i;
                this.shadows.push([]);
            }

            let radius = 32 * recordings.length;
            for(let i=0; i<recordings.length; ++i) {
                const numShadows = recordings.length - i;
                let theta = 0;
                for(let j=0; j<numShadows; ++j) {
                    const x = Math.cos(theta) * radius;
                    const y = Math.sin(theta) * radius;
                    this.shadows[i].push(createShadowChef(x, y, this.world).first(ComponentType.SHADOW) as Shadow);
                    theta += TAU / numShadows;
                }

                radius -= 32;
            }
        }

        console.log(currentLevel);
    }

    override update(): void {
        for(let i=0; i<this.recordings.length; ++i) {
            const action = this.recordings[i].getNext();
            for(const shadow of this.shadows[i]) {
                if(shadow.entity.active)
                {
                    shadow.entity.position.x = shadow.startX + action.x;
                    shadow.entity.position.y = shadow.startY + action.y;
                    shadow.entity.rotation = action.rotation;

                    if(action.shoot) {
                        createPeaProjectile(shadow.entity.position.x, shadow.entity.position.y, shadow.entity.rotation, 128, Mask.ENEMY_PROJECTILE, this.world);
                    }
                }
            }
        }

        this.world.update();
        this.world.cameraX = this.player.position.x;
        this.world.cameraY = this.player.position.y;

        this.currentRecording.add(new FrameRecording(this.player.position.x,
                                                    this.player.position.y,
                                                    this.player.rotation,
                                                    (this.player.first(ComponentType.PLAYER) as Player).firedWeapon));

        if(this.world.all(ComponentType.ENEMY).length === 0) {
            this.onNewLevel();
        }
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
