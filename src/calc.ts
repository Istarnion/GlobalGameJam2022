export type Vec2 = { x: number, y: number };

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
