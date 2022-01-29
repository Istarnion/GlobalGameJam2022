import Game from "./game";
import BattleState from "./gamestates/battlestate";
import { loadImages, loadSprites, loadMap, loadFont } from "./loader";

/**
 * Global game object. Through this we can
 * access the stuff we need global access to.
 */
const game = new Game(200, 600/4);

export default game;

const preloads: Promise<any>[] = [
    loadImages([
        ['maincharacter', './res/maincharacter.png'],
        ['slime', './res/slime.png'],
    ]),
    loadSprites('./res/sprites.json'),
    loadSprites('./res/sprite_shadow.json')
];

Promise.all(preloads).then((loadedAssets) => {
    game.run(new BattleState());
});
