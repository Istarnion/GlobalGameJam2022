import gfx from "./graphics";

class CharInfo {
    advance: number;
    offsetX: number;
    offsetY: number;
    width: number;
    height: number;
    packX: number;
    packY: number;
    kerning: Record<number, number> = {};

    constructor(advance: number, offsetX: number, offsetY: number, width: number, height: number, packX: number, packY: number) {
        this.advance = advance;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.width = width;
        this.height = height;
        this.packX = packX;
        this.packY = packY;
    }
}

/**
 * A spritefont is a font loaded as
 * a bitmap. It has a fixed size.
 */
export default class SpriteFont {
    texture: HTMLImageElement;
    characters: Record<number, CharInfo>;
    size = 0;       // The "size" of the font.
    lineHeight = 0; // The distance between baselines
    spaceWidth = 0; // The width of a space character
    ascent = 0;     // Max height above the baseline
    descent = 0;    // Max descent under the baseline

    constructor(texture: HTMLImageElement, definition: string) {
        this.texture = texture;
        this.characters = {};

        const lines: string[] = definition.split('\n');

        const chars = new Array<number>();
        const advance = new Array<number>();
        const offsetX = new Array<number>();
        const offsetY = new Array<number>();
        const width = new Array<number>();
        const height = new Array<number>();
        const packX = new Array<number>();
        const packY = new Array<number>();
        const kerning = new Array<number>();

        let charCount = 0;
        let kerningCount = 0;

        for(let i=0; i<lines.length; ++i) {
            const parts = lines[i].split("=");
            const key = parts[0];
            const value = parts[1];
            switch(key) {
                case 'size': {
                    this.size = parseInt(value);
                } break;
                case 'ascent': {
                    this.ascent = parseInt(value);
                } break;
                case 'descent': {
                    this.descent = parseInt(value);
                } break;
                case 'char_count': {
                    charCount = parseInt(value);
                } break;
                case 'kerning_count': {
                    kerningCount = parseInt(value);
                } break;
                case 'chars': {
                    for(const charStr of value.split(',')) {
                        chars.push(parseInt(charStr));
                    }
                } break;
                case 'advance': {
                    for(const charStr of value.split(',')) {
                        advance.push(parseInt(charStr));
                    }
                } break;
                case 'offset_x': {
                    for(const charStr of value.split(',')) {
                        offsetX.push(parseInt(charStr));
                    }
                } break;
                case 'offset_y': {
                    for(const charStr of value.split(',')) {
                        offsetY.push(parseInt(charStr));
                    }
                } break;
                case 'width': {
                    for(const charStr of value.split(',')) {
                        width.push(parseInt(charStr));
                    }
                } break;
                case 'height': {
                    for(const charStr of value.split(',')) {
                        height.push(parseInt(charStr));
                    }
                } break;
                case 'pack_x': {
                    for(const charStr of value.split(',')) {
                        packX.push(parseInt(charStr));
                    }
                } break;
                case 'pack_y': {
                    for(const charStr of value.split(',')) {
                        packY.push(parseInt(charStr));
                    }
                } break;
                case 'kerning': {
                    for(const charStr of value.split(',')) {
                        kerning.push(parseInt(charStr));
                    }
                } break;
            }
        }

        for(let i=0; i<charCount; ++i) {
            const char = chars[i];
            if(char === 32) {
                this.spaceWidth = advance[i];
            }
            else {
                const character = new CharInfo(advance[i],
                                               offsetX[i], offsetY[i],
                                               width[i], height[i],
                                               packX[i], packY[i]);
                this.characters[chars[i]] = character;
            }
        }

        for(let i=0; i<kerningCount; i+=3) {
            const left = kerning[i];
            const right = kerning[i+1];
            const offset = kerning[i+2];
            this.characters[right].kerning[left] = offset;
        }

        this.lineHeight = (this.ascent - this.descent) + 1;
    }

    /**
     * Measure the width of a certain text using this font.
     * If the text has multiple lines, the width of the
     * longest line is returned.
     * @param text The text to measure
     * @returns The width in pixels of that text
     */
    measureTextWidth(text: string): number {
        return 0;
    }

    drawText(text: string, left: number, baseline: number): void {
        let x = left;
        let y = baseline;

        let charsOnLine = 0;
        const codepoints = Array.from(text);
        for(let i=0; i<codepoints.length; ++i) {
            const codepoint = codepoints[i];
            if(codepoint === ' ') {
                x += this.spaceWidth;
                ++charsOnLine;
            }
            else if(codepoint === '\n') {
                x = left;
                y += this.lineHeight;
                charsOnLine = 0;
            }
            else if(codepoint === '\t') {
                const spacesToFill = 4 - (charsOnLine % 4);
                x += spacesToFill * this.spaceWidth;
                charsOnLine += spacesToFill;
            }
            else {
                const charInfo = this.characters[codepoint.codePointAt(0) as number];
                if(charInfo) {
                    const prev = (i-1 >= 0) ? (codepoints[i-1].codePointAt(0) as number) : 0;

                    const kerning = (prev in charInfo.kerning) ? charInfo.kerning[prev] : 0;
                    x += kerning;

                    gfx.drawImage(this.texture,
                                  charInfo.packX, charInfo.packY, charInfo.width, charInfo.height,
                                  x + charInfo.offsetX, y+charInfo.offsetY, charInfo.width, charInfo.height);
                    x += charInfo.advance;
                }
                else {
                    console.warn(`Trying to render unsupported character ${codepoint}`);
                }
            }
        }
    }
}
