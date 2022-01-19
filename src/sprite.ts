export interface Animation {
    start: number;
    framedurations: number[];
}

export interface Sprite {
    image: string;
    width: number;
    height: number;
    frameWidth: number;
    frameHeight: number;
    anims: Record<string, Animation>;
}
