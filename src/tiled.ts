import { loadJSON } from "./loader";

export interface TiledTileLayer {
    name: string;
    x: number;
    y: number;
    type: string;
    width: number;
    height: number;
    opacity: number;
    visible: boolean;
    data: Array<number>;
}

export interface TiledTileSet {
    name: string;
    image: string;
    imagewidth: number;
    imageheight: number;
    firstgid: number;
    margin: number;
    spacing: number;
    tilecount: number;
    tilewidth: number;
    tileheight: number;
}

export interface TiledMap {
    type: string;
    version: number;
    width: number;
    height: number;
    infinite: boolean;
    layers: Array<TiledTileLayer>;
    tilesets: Array<TiledTileSet>;
    nextobjectid: number,
    orientation: string;
    renderorder: string;
    tiledversion: string;
    tilewidth: number;
    tileheight: number;
}
