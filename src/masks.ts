export enum Mask {
    NONE = 0,
    SOLID = 1 << 0,
    PLAYER = 1 << 2,
    ENEMY = 1 << 3,
    PLAYER_PROJECTILE = 1 << 4,
    ENEMY_PROJECTILE = 1 << 5
}
