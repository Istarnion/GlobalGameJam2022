class Time {
    time = 0; // Total amount of seconds passed
    slowdown = 1; // Use this to scale deltaTime. At 2, time moves twice as slow (deltaTime is doubled)
    dt: number = 1 / 60;

    deltaTime(): number {
        return this.dt * this.slowdown;
    }
}

export const time = new Time();
