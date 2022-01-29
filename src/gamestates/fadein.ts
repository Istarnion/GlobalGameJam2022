import game from "..";
import GameState from "../gamestate";
import gfx from "../graphics";
import { time } from "../timer";

export default class FadeIn extends GameState {
    duration: number;
    t = 0;

    constructor(duration: number) {
        super();
        this.duration = duration;
    }

    override update(): void {
        this.t += time.deltaTime();

        if(this.t >= this.duration) {
            game.popState();
        }
    }

    override draw(): void {
        gfx.fillStyle = `rgba(0, 0, 0, ${1 - this.t / this.duration}`;
        gfx.fillRect(0, 0, gfx.width, gfx.height);
    }
}
