import { Rect } from "../calc";
import { Component, ComponentType } from "../component";
import Entity from "../entity";
import gfx from "../graphics";
import { images } from "../loader";
import { TiledTileSet, TiledMap } from "../tiled";

export class Tileset {
    img: HTMLImageElement;
    margin: number;
    spacing: number;
    tileWidth: number;
    tileHeight: number;
    tileCount: number;
    columns: number;

    constructor(tiledDef: TiledTileSet) {
        this.img = images[tiledDef.name.toLowerCase()];
        console.assert(this.img !== undefined, 'Failed to get tileset image');

        this.margin = tiledDef.margin;
        this.spacing = tiledDef.spacing;
        this.tileWidth = tiledDef.tilewidth;
        this.tileHeight = tiledDef.tileheight;
        this.tileCount = tiledDef.tilecount;
        this.columns = (tiledDef.imagewidth - this.margin) / (this.tileWidth + this.spacing);
    }

    drawTile(id: number, x: number, y: number): void {
        if(id > 0) {
            --id;
            const tileX = id % this.columns;
            const tileY = (id / this.columns) | 0;
            const srcX = this.margin + tileX * (this.tileWidth + this.spacing);
            const srcY = this.margin + tileY * (this.tileHeight + this.spacing);
            gfx.drawImage(this.img, srcX, srcY, this.tileWidth, this.tileHeight, x, y, this.tileWidth, this.tileHeight);
        }
    }
}

export default class Tilemap extends Component {
    width: number;
    height: number;
    tileWidth: number;
    tileHeight: number;
    layers: Record<string, number[]>;
    tileSets: Record<string, Tileset>;

    viewport: Rect;

    constructor(tiledDef: TiledMap, entity: Entity) {
        super(entity, ComponentType.TILEMAP);

        this.width = tiledDef.width;
        this.height = tiledDef.height;
        this.tileWidth = tiledDef.tilewidth;
        this.tileHeight = tiledDef.tileheight;

        this.layers = {};
        for(const layerDef of tiledDef.layers) {
            this.layers[layerDef.name] = layerDef.data;
        }

        this.tileSets = {};
        for(const tilesetDef of tiledDef.tilesets) {
            this.tileSets[tilesetDef.name.toLowerCase()] = new Tileset(tilesetDef);
        }

        this.viewport = new Rect(0, 0, this.width * this.tileWidth, this.height * this.tileHeight);
    }

    override render(): void {
        if(this.entity.visible) {
            this.draw(this.viewport.x, this.viewport.y, this.viewport.width, this.viewport.height);
        }
    }

    setViewport(x: number, y: number, width: number, height: number): void {
        this.viewport.x = x;
        this.viewport.y = y;
        this.viewport.width = width;
        this.viewport.width = width;
    }

    /**
     * Draw a sub-region of the map
     * @param x - Left edge of the sub-region
     * @param y - Top edge of the sub-region
     * @param width - Sub-region width
     * @param height - Sub-region height
     */
    draw(x: number, y: number, width: number, height: number): void {
        const startTileX = Math.max((x / this.tileWidth - 1) | 0, 0);
        const startTileY = Math.max((y / this.tileHeight - 1) | 0, 0);
        const endTileX = Math.min(startTileX + ((width / this.tileWidth) | 0) + 2, this.width);
        const endTileY = Math.min(startTileY + ((height / this.tileHeight) | 0) + 2, this.height);

        const tileset = this.tileSets.ground;
        const tiles = this.layers.ground;
        for(let row=startTileY; row<endTileY; ++row) {
            for(let col=startTileX; col<endTileX; ++col) {
                const xOffset = col * this.tileWidth - x;
                const yOffset = row * this.tileHeight - y;
                const tileID = tiles[col + row * this.width];
                tileset.drawTile(tileID, xOffset, yOffset);
            }
        }
    }

    tileAt(x: number, y: number): number {
        return 0;
    }
}
