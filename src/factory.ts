import Animator from "./components/animator";
import Collider from "./components/collider";
import Mover from "./components/mover";
import PeaProjectile from "./components/peaprojectile";
import Player from "./components/player";
import Entity from "./entity";
import { sprites } from "./loader";
import { Mask } from "./masks";
import World from "./world";

export function createPlayer(x: number, y: number, world: World): Entity {
    const player = world.addEntity(x, y);
    player.add(new Collider(16, player));
    player.add(new Mover(64, player));
    const animator = player.add(new Animator(sprites['maincharacter'], 'stand weapon1', player));
    animator.xOffset = -16;
    animator.yOffset = -16;
    player.add(new Player(player));
    return player;
}

export function createPeaProjectile(x: number, y: number, angle: number, speed: number, mask: Mask, world: World): Entity {
    const projectile = world.addEntity(x, y);
    const pea = projectile.add(new PeaProjectile(projectile));
    pea.dx = Math.cos(angle) * speed;
    pea.dy = Math.sin(angle) * speed;
    return projectile;
}
