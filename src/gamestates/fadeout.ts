import game from "..";
import GameState from "../gamestate";
import gfx from "../graphics";
import { time } from "../timer";

export default class FadeOut extends GameState {
    duration: number;
    t = 0;
    onFadeComplete?: Function;

    constructor(duration: number, onFadeComplete?: Function) {
        super();
        this.duration = duration;
        this.onFadeComplete = onFadeComplete;
    }

    override update(): void {
        this.t += time.deltaTime();

        if(this.t >= this.duration) {
            game.popState();
            if(this.onFadeComplete) {
                this.onFadeComplete();
            }
        }
    }

    override draw(): void {
        gfx.fillStyle = `rgba(0, 0, 0, ${this.t / this.duration}`;
        gfx.fillRect(0, 0, gfx.width, gfx.height);
    }
}
