import { Component, ComponentType } from "../component";
import Entity from "../entity";
import SpriteFont from "../spritefont";

/**
 * A component for text objects that should
 * be part of a world, as in they have a
 * world position and are not stuck to the
 * screen as UI text.
 */
export default class WorldText extends Component {
    text: string;
    font: SpriteFont;

    constructor(text: string, font: SpriteFont, entity: Entity) {
        super(entity, ComponentType.TEXT);
        this.text = text;
        this.font = font;
    }

    override render(): void {
        this.font.drawText(this.text, this.entity.position.x, this.entity.position.y);
    }
}