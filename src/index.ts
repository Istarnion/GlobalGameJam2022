import Game from "./game";
import GameState from "./gamestate";
import BattleState from "./gamestates/battlestate";
import MenuState from "./gamestates/menustate";
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
        ['maincharactershadow', './res/maincharactershadow.png'],
        ['slime', './res/slime.png'],
    ]),
    loadSprites('./res/sprites.json'),
    loadSprites('./res/sprites_shadow.json')
];

Promise.all(preloads).then((loadedAssets) => {
    game.run(new MenuState());
    game.pushState(new BattleState(0, []));
});
