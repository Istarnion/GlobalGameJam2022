/**
 * This file contains type definitions used to make sense of
 * loaded JSON files exported from the Tiled map editor.
 * The {@link Tilemap} class takes data on this format and
 * represents an actual tile map in game.
 */

import { loadJSON } from "./loader";

/**
 * Interface for the Tiled map editor tile layer definitions
 */
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

/**
 * Interface for the Tiled map editor tileset definitions
 */
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

/**
 * Interface for the Tiled map editor JSON file format
 */
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
