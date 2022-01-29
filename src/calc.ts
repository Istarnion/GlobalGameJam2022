export const TAU = 2 * Math.PI;

export type Vec2 = { x: number, y: number };

export function addVec2(a: Vec2, b: Vec2): Vec2 {
    return {
        x: a.x + b.x,
        y: a.y + b.y
    };
}

export function subVec2(a: Vec2, b: Vec2): Vec2 {
    return {
        x: a.x - b.x,
        y: a.y - b.y
    };
}

export function mulVec2(a: Vec2, b: Vec2): Vec2 {
    return {
        x: a.x * b.x,
        y: a.y * b.y
    };
}

export function divVec2(a: Vec2, b: Vec2): Vec2 {
    return {
        x: a.x / b.x,
        y: a.y / b.y
    };
}

export function vec2Magnitude(vec: Vec2): number {
    return Math.sqrt(vec.x*vec.x + vec.y*vec.y);
}

export function vec2MagnitudeSquared(vec: Vec2): number {
    return (vec.x*vec.x + vec.y*vec.y);
}

export class Rect {
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    overlaps(other: Rect): boolean {
        return !(this.x > other.x + other.width  || this.x+this.width  < other.x ||
                 this.y > other.y + other.height || this.y+this.height < other.y);
    }
}
