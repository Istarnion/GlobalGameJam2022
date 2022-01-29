import Animator from "./components/animator";
import Collider from "./components/collider";
import Hurtable from "./components/hurtable";
import Mover from "./components/mover";
import PeaProjectile from "./components/peaprojectile";
import Player from "./components/player";
import Upgrade from "./components/upgrade";
import Entity from "./entity";
import { sprites } from "./loader";
import { Mask } from "./masks";
import UpgradeType from "./upgradetype";
import World from "./world";

export function createPlayer(x: number, y: number, world: World): Entity {
    const player = world.addEntity(x, y);
    const collider = player.add(new Collider(6, Mask.PLAYER, player));
    player.add(new Mover(64, player));
    const animator = player.add(new Animator(sprites['maincharacter'], 'stand weapon1', player));
    animator.xOffset = -16;
    animator.yOffset = -21;
    player.add(new Player(player));
    return player;
}

export function createPeaProjectile(x: number, y: number, angle: number, speed: number, mask: Mask, world: World): Entity {
    const projectile = world.addEntity(x, y);
    const pea = projectile.add(new PeaProjectile(projectile));
    pea.dx = Math.cos(angle) * speed;
    pea.dy = Math.sin(angle) * speed;
    projectile.add(new Collider(2, mask, projectile));
    projectile.add(new Hurtable(null, ~(Mask.PLAYER_PROJECTILE | Mask.ENEMY_PROJECTILE), projectile));
    return projectile;
}

export function createSlime(x: number, y: number, world: World): Entity {
    const slime = world.addEntity(x, y);
    slime.add(new Collider(8, Mask.ENEMY, slime));
    const animator = slime.add(new Animator(sprites['slime'], 'move', slime));
    animator.xOffset = -8;
    animator.yOffset = -8;
    slime.add(new Hurtable(null, Mask.PLAYER_PROJECTILE, slime));
    return slime;
}

export function createUpgrade(x: number, y:number, upgradeType: UpgradeType, world: World): Entity {
    const pickup = world.addEntity(x, y);
    const upgrade = pickup.add(new Upgrade(pickup, upgradeType.stats));
    const collider = pickup.add(new Collider(8, Mask.UPGRADE, pickup));
    const animator = pickup.add(new Animator(sprites[upgradeType.name], upgradeType.animation, pickup));
    animator.xOffset = -8;
    animator.yOffset = -8;
    return pickup;
}
