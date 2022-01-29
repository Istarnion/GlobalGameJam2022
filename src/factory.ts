import { TAU } from "./calc";
import { Component, ComponentType } from "./component";
import Animator from "./components/animator";
import Collider from "./components/collider";
import Enemy from "./components/enemy";
import Hurtable from "./components/hurtable";
import Mover from "./components/mover";
import PeaProjectile from "./components/peaprojectile";
import Player from "./components/player";
import Shadow from "./components/shadow";
import Entity from "./entity";
import { sprites } from "./loader";
import { Mask } from "./masks";
import World from "./world";

export function createPlayer(x: number, y: number, world: World): Entity {
    const player = world.addEntity(x, y);
    player.add(new Collider(6, Mask.PLAYER, player));
    player.add(new Mover(64, player));
    const animator = player.add(new Animator(sprites['maincharacter'], 'stand weapon1', player));
    animator.xOffset = -16;
    animator.yOffset = -21;
    const p = player.add(new Player(player));

    const onPlayerHurt = () => {
        p.dying = true;
    };

    player.add(new Hurtable(onPlayerHurt, Mask.ENEMY | Mask.ENEMY_PROJECTILE, player));
    return player;
}

export function createPeaProjectile(x: number, y: number, angle: number, speed: number, mask: Mask, world: World): Entity {
    const projectile = world.addEntity(x, y);
    const pea = projectile.add(new PeaProjectile(projectile));
    angle -= TAU / 4;
    pea.dx = Math.cos(angle) * speed;
    pea.dy = Math.sin(angle) * speed;
    projectile.add(new Collider(2, mask, projectile));
    const hurtableBy = mask === Mask.PLAYER_PROJECTILE ? (Mask.ENEMY | Mask.PLAYER) : Mask.PLAYER;
    projectile.add(new Hurtable(null, Mask.PLAYER, projectile));
    return projectile;
}

export function createSlime(x: number, y: number, world: World): Entity {
    const slime = world.addEntity(x, y);
    slime.add(new Collider(8, Mask.ENEMY, slime));
    const animator = slime.add(new Animator(sprites['slime'], 'move', slime));
    animator.xOffset = -8;
    animator.yOffset = -8;
    slime.add(new Hurtable(null, Mask.PLAYER_PROJECTILE, slime));
    slime.add(new Enemy(slime));
    return slime;
}

export function createShadowChef(x: number, y: number, world: World): Entity {
    const chef = world.addEntity(x, y);
    chef.rotation = TAU/2;
    chef.add(new Collider(6, Mask.ENEMY, chef));
    const animator = chef.add(new Animator(sprites['maincharactershadow'], 'stand weapon1', chef));
    animator.xOffset = -16;
    animator.yOffset = -21;
    chef.add(new Hurtable(null, Mask.PLAYER_PROJECTILE, chef));
    chef.add(new Enemy(chef));
    chef.add(new Shadow(chef));
    return chef;
}
