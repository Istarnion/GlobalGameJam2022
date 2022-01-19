import { Sprite } from "./sprite";
import { TiledMap } from "./tiled";

export const images: Record<string, HTMLImageElement> = {};
export const maps: Record<string, TiledMap> = {};
export const sprites: Record<string, Sprite> = {};

/**
 * Load an image.
 * @param imageName The app name of the image, used to refer to it later
 * @param imagePath The path to the image
 * @returns A promise that will be resolved once the image is loaded.
 */
export function loadImage(imageName: string, imagePath: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            images[imageName] = image;
            resolve(image);
        };

        image.onerror = () => {
            reject(imagePath);
        };

        image.src = imagePath;
    });
}

/**
 * Load multiple images
 * @param images An array of 2-element arrays on the form [imageName, imagePath]
 * @returns a promise that will be resolved once all images are loaded
 */
export function loadImages(images: Array<Array<string>>): Promise<void> {
    return new Promise((resolve, reject) => {
        if(images.length === 0) {
            resolve();
            return;
        }

        const promises: Promise<HTMLImageElement>[] = [];

        images.forEach((image) => {
            promises.push(loadImage(image[0], image[1]));
        });

        Promise.all(promises)
        .then(() => {
            resolve();
        })
        .catch((failedImages) => {
            reject(failedImages);
        })
    });
}

export function loadJSON(path: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fetch(path, {
            method: "GET"
        })
        .then((response: Response) => response.json())
        .then((json: any) => {
            resolve(json);
        })
        .catch((reason: any) => {
            console.error(`Failed to load "${path}": ${reason}`);
            reject();
        });
    });
}

export function loadSprites(path: string): Promise<Record<string, Sprite>> {
    return new Promise((resolve, reject) => {
        loadJSON(path).then((spriteDefs: Record<string, Sprite>) => {
            for(const spriteName in spriteDefs) {
                sprites[spriteName] = spriteDefs[spriteName];
            }

            resolve(sprites);
        })
        .catch(() => {
            reject();
        });
    });
}

export function loadMap(name: string, mapPath: string): Promise<TiledMap> {
    return new Promise((resolve, reject) => {
        loadJSON(mapPath).then((mapDef: any) => {
            maps[name] = <TiledMap>mapDef;
            resolve(<TiledMap>mapDef);
        })
        .catch(() => {
            reject();
        });
    });
}
