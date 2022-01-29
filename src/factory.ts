import Collider from "./components/collider";
import Mover from "./components/mover";
import Player from "./components/player";
import Entity from "./entity";
import World from "./world";

export function createPlayer(x: number, y: number, world: World): Entity {
    const player = world.addEntity(x, y);
    player.add(new Collider(64, player));
    player.add(new Mover(128, player));
    player.add(new Player(player));
    return player;
}