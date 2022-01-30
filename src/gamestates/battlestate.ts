import Entity from "../entity";
import { createPeaProjectile, createPlayer, createShadowChef, createSlime, createUpgrade } from "../factory";
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
import FadeOut from "./fadeout";
import FadeIn from "./fadein";
import gfx from "../graphics";
import UpgradeArray from "../upgradearray";
import Animator from "../components/animator";

export default class BattleState extends GameState {

    world: World;
    player: Player;
    currentLevel = 0;
    recordings: Array<Recording> = [];
    shadows: Array<Array<Shadow>> = [];
    currentRecording: Recording;
    upgradeArray: UpgradeArray;

    constructor(currentLevel: number, recordings: Array<Recording>) {
        super();

        this.world = new World();
        this.player = createPlayer(0, 0, this.world).first(ComponentType.PLAYER) as Player;
        this.currentLevel = currentLevel;
        this.recordings = recordings;
        this.currentRecording = new Recording();
        this.upgradeArray = new UpgradeArray();

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

        createUpgrade(0, 32, this.upgradeArray.getRandomUpgrade(), this.world);

        console.log(currentLevel);
    }

    override update(): void {
        if(!this.player.entity.active) {
            game.popState();
            return;
        }

        for(let i=0; i<this.recordings.length; ++i) {
            const action = this.recordings[i].getNext();
            for(const shadow of this.shadows[i]) {
                if(shadow.entity.active)
                {
                    shadow.entity.position.x = shadow.startX + action.x;
                    shadow.entity.position.y = shadow.startY + action.y;

                    shadow.chef.animationState = action.animationState;
                    shadow.entity.rotation = action.rotation;

                    if(action.upgrade) {
                        shadow.chef.takeUpgrade(action.upgrade);
                    }

                    if(action.shoot) {
                        shadow.chef.fire();
                    }
                }
            }
        }

        this.world.update();
        this.world.cameraX = this.player.entity.position.x;
        this.world.cameraY = this.player.entity.position.y;

        this.currentRecording.add(new FrameRecording(this.player.entity.position.x,
                                                    this.player.entity.position.y,
                                                    this.player.entity.rotation,
                                                    this.player.animator.current,
                                                    (this.player.chef.upgradeType ? this.player.chef.upgradeType : null),
                                                    this.player.firedWeapon));

        if(this.world.all(ComponentType.ENEMY).length === 0) {
            this.onNewLevel();
        }
    }

    override draw(): void {
        gfx.clear("black");
        this.world.render();
    }

    onNewLevel() {
        this.recordings.push(this.currentRecording);
        game.pushState(new FadeOut(1, () => {
            game.popState();
            game.pushState(new BattleState(++this.currentLevel, this.recordings));
            game.pushState(new FadeIn(1));
        }));
    }
}
