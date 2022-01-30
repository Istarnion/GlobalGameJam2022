import GameState from "../gamestate";
import audio from "../audio";
import gfx from "../graphics";
import input from "../input";
import game from "..";
import BattleState from "./battlestate";
import Stats from "../stats";

export default class MenuState extends GameState {
    starting = false;

    constructor() {
        super();
        audio.play("menu");
    }

    override update(): void {
        if(input.mouseIsJustPressed()) {
            this.starting = true;
            game.pushState(new BattleState(0, [], new Stats()));
            audio.fadeOut("menu", 500);
            audio.play("battle", 0.7);
        }  
    }

    override draw(): void {
        if (this.starting)
            gfx.clear("black");
        else
        {
            gfx.fillStyle = "white"
            gfx.fillText("Click to start", gfx.width/2, gfx.height/2)
        }
    }

    override resume(args?: any): void {
        this.starting = false;
        audio.fadeOut("battle", 500);
        audio.play("menu")
    }
}