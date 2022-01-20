import Game from "./game";
import { TestState } from "./gamestates/teststate";
import { loadImages, loadSprites, loadMap, loadFont } from "./loader";

/**
 * Global game object. Through this we can
 * access the stuff we need global access to.
 */
const game = new Game(120, 80, new TestState());

export default game;

const preloads = [
    loadImages([
        ['ground', './res/test_tileset8.png'],
        ['testcharacter', './res/testcharacter.png']
    ]),
    loadMap('testmap', './res/testmap.json'),
    loadSprites('./res/sprites.json'),
    loadFont('express_mono', './licenced_res/express_mono/metrics.txt', './licenced_res/express_mono/atlas32.png')
];

Promise.all(preloads).then((loadedAssets) => {
    game.run();
});
