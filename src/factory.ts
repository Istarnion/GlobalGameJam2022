import { TAU } from "./calc";
import Animator from "./components/animator";
import Collider from "./components/collider";
import Enemy from "./components/enemy";
import Hurtable from "./components/hurtable";
import Mover from "./components/mover";
import PeaProjectile from "./components/peaprojectile";
import Player from "./components/player";
import Upgrade from "./components/upgrade";
import Shadow from "./components/shadow";
import Entity from "./entity";
import { sprites } from "./loader";
import { Mask } from "./masks";
import UpgradeType from "./upgradetype";
import World from "./world";
import EntityStats from "./components/entitystats";
import Chef from "./components/chef";
import { ComponentType } from "./component";
import audio from "./audio";
import Stats from "./stats";

export function createPlayer(x: number, y: number, stats: Stats, world: World): Entity {
    const player = world.addEntity(x, y);
    player.add(new Collider(6, Mask.PLAYER, player));
    player.add(new Mover(64, player));
    const entityStats = player.add(new EntityStats(player));
    entityStats.stats = stats;
    const animator = player.add(new Animator(sprites['maincharacter'], 'stand weapon1', player));
    animator.xOffset = -16;
    animator.yOffset = -21;

    const onPlayerHurt = () => {
        if (entityStats.stats.shield > 0)
            entityStats.stats.shield--;
        else
        {
            if (!p.chef.dying)
                audio.play('deaf');
            p.chef.dying = true;
        }
    };

    player.add(new Hurtable(onPlayerHurt, Mask.ENEMY | Mask.ENEMY_PROJECTILE, player));
    player.add(new Chef(Mask.PLAYER_PROJECTILE, player));
    const p = player.add(new Player(player));
    return player;
}

export function createPeaProjectile(x: number, y: number, angle: number, speed: number, mask: Mask, world: World): Entity {
    const projectile = world.addEntity(x, y);
    const projectileColor = mask === Mask.PLAYER_PROJECTILE ? 'lime' : '#bc90da';
    const pea = projectile.add(new PeaProjectile(projectileColor, projectile));
    angle -= TAU / 4;
    pea.dx = Math.cos(angle) * speed;
    pea.dy = Math.sin(angle) * speed;
    projectile.add(new Collider(2, mask, projectile));
    const hurtableBy = mask === Mask.PLAYER_PROJECTILE ? (Mask.ENEMY | Mask.PLAYER) : Mask.PLAYER;
    projectile.add(new Hurtable(null, hurtableBy, projectile));
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

export function createUpgrade(x: number, y:number, upgradeType: UpgradeType, world: World): Entity {
    const pickup = world.addEntity(x, y);
    pickup.add(new EntityStats(pickup));
    const animator = pickup.add(new Animator(sprites[upgradeType.name], upgradeType.animation, pickup));
    pickup.add(new Collider(8, Mask.UPGRADE, pickup));x
    pickup.add(new Upgrade(upgradeType, pickup));
    animator.xOffset = -8;
    animator.yOffset = -8;
    return pickup;
}

export function createShadowChef(x: number, y: number, world: World): Entity {
    const chef = world.addEntity(x, y);
    chef.rotation = TAU/2;
    chef.add(new Collider(6, Mask.ENEMY, chef));
    const entityStats = chef.add(new EntityStats(chef));
    const animator = chef.add(new Animator(sprites['maincharactershadow'], 'stand weapon1', chef));
    animator.xOffset = -16;
    animator.yOffset = -21;

    const onShadowHurt = () => {
        if (entityStats.stats.shield > 0)
            entityStats.stats.shield--;
        else
        {
            if(!c.dying)
                audio.play("deaf");
            c.dying = true;
        }
    };

    chef.add(new Hurtable(onShadowHurt, Mask.PLAYER_PROJECTILE, chef));
    chef.add(new Enemy(chef));
    const c = chef.add(new Chef(Mask.ENEMY_PROJECTILE, chef));
    chef.add(new Shadow(chef));
    return chef;
}
