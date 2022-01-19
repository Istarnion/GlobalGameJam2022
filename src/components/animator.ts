import { Component, ComponentType } from "../component";
import Entity from "../entity";
import gfx from "../graphics";
import { images } from "../loader";
import { Animation, Sprite } from "../sprite";
import { time } from "../timer";

export default class Animator extends Component {
    xOffset = 0;
    yOffset = 0;
    img: HTMLImageElement;
    sprite: Sprite;
    frameIndex = 0;
    frameTime = 0;
    current: string;
    currentAnim: Animation;
    columns: number;

    constructor(sprite: Sprite, entity: Entity) {
        super(entity, ComponentType.ANIMATOR);

        this.sprite = sprite;
        this.img = images[sprite.image];
        console.assert(this.img !== undefined, 'Failed to load image for animation');
        this.columns = (this.sprite.width / this.sprite.frameWidth) | 0;

        this.current = 'idle';
        this.currentAnim = this.sprite.anims[this.current];
        console.log(this.sprite.anims);
    }

    play(animName: string): void {
        if(animName !== this.current) {
            this.current = animName;
            this.currentAnim = this.sprite.anims[animName];
            this.frameTime = 0;
            this.frameIndex = 0;
        }
    }

    override awake(): void {
        this.frameIndex = 0;
        this.frameTime = 0;
    }

    override update(): void {
        const deltaTimeMillis = time.deltaTime * 1000;

        this.frameTime += deltaTimeMillis;
        while(this.frameTime >= this.currentAnim.framedurations[this.frameIndex]) {
            this.frameTime -= this.currentAnim.framedurations[this.frameIndex];

            this.frameIndex += 1;
            if(this.frameIndex >= this.currentAnim.framedurations.length) {
                this.frameIndex = 0;
            }
        }
    }

    override render(): void {
        if(this.entity.visible) {
            const tileID = this.currentAnim.start + this.frameIndex;
            const x = (tileID % this.columns) * this.sprite.frameWidth;
            const y = ((tileID / this.columns) | 0) * this.sprite.frameHeight;

            gfx.drawImage(this.img,
                        x, y, this.sprite.frameWidth, this.sprite.frameHeight,
                        this.entity.position.x + this.xOffset, this.entity.position.y + this.yOffset,
                        this.sprite.frameWidth, this.sprite.frameHeight);
        }
    }
}
