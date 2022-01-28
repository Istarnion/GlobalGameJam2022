import Game from "./game";
import BattleState from "./gamestates/battlestate";
import { loadImages, loadSprites, loadMap, loadFont } from "./loader";

/**
 * Global game object. Through this we can
 * access the stuff we need global access to.
 */
const game = new Game(120, 80, new BattleState());

export default game;

const preloads: Promise<any>[] = [
];

Promise.all(preloads).then((loadedAssets) => {
    game.run();
});
