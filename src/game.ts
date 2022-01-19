import audio from './audio';
import GameState from './gamestate';
import gfx from './graphics';
import input from './input';
import { time } from './timer';

/**
 * Core class of the system. Exactly one object of this class
 * should be instantiated and made global.
 */
export default class Game {
    loopTimerID = 0;
    lastFrameTime: number;

    readonly states: GameState[];
    currentState?: GameState;

    constructor(width: number, height: number, initialState: GameState) {
        gfx.setGameSize(240, 160);
        this.lastFrameTime = performance.now();
        this.states = [ initialState ];
    }

    /**
     * Start the game loop.
     */
    run(): void {
        this.states[this.states.length-1].start();
        this.update();
    }

    /**
     * Stop the game and delete the canvas
     */
    quit(): void {
        // End all states
        do {
            this.states.pop()?.end();
        }
        while(this.states.length > 0);

        // Prevent next update call
        window.cancelAnimationFrame(this.loopTimerID);
        document.removeChild(gfx.canvas);
    }

    /**
     * Push a new state on to the state stack,
     * making it the current active state.
     * @param state The new state
     * @param args Optional args to the start function of the new state
     */
    pushState(state: GameState, args?: any): void {
        this.states[this.states.length-1].pause();
        this.states.push(state);
        state.start(args);
    }

    /**
     * Pop the state stack, calling start again on the previous state
     */
    popState(args?: any) {
        this.states.pop()?.end();
        this.states[this.states.length-1].resume(args);
    }

    /**
     * Main game loop using requestAnimationFrame.
     */
    update(): void {
        this.loopTimerID = window.requestAnimationFrame(() => this.update());
        const now = performance.now();
        const deltaTime = (now - this.lastFrameTime) / 1000;
        time.dt = deltaTime;
        time.time += deltaTime;

        // Only update the top state
        this.states[this.states.length-1].update();

        // Then render all states, bottom to top
        for(const state of this.states) {
            state.draw();
        }

        this.lastFrameTime = now;
        input.newFrame();
    }

}
