import GameState from "../gamestate";
import audio from "../audio";
import gfx from "../graphics";
import input from "../input";
import game from "..";
import BattleState from "./battlestate";

export default class MenuState extends GameState {
    constructor() {
        super();
        audio.play("menu");
    }

    override update(): void {
        if(input.mouseIsJustPressed()) {
            game.pushState(new BattleState(0, []));
            audio.fadeOut("menu", 500);
            audio.play("battle", 0.7);
        }  
    }

    override draw(): void {
        gfx.fillStyle = "white"
        gfx.fillText("Click to start", gfx.width/2, gfx.height/2)
    }

    override resume(args?: any): void {
        audio.fadeOut("battle", 500);
        audio.play("menu")
    }
}