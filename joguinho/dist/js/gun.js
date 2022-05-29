import { GameElement } from "./game-element.js";
import { Projectile } from "./projectile.js";
export class Gun extends GameElement {
    constructor() {
        super();
        this._projectiles = [];
        this.shotFrequency = 1000;
        this.shoot = () => {
            const projectile = new Projectile(this.target);
            projectile.positionX = this.positionX;
            projectile.positionY = this.positionY;
            this._projectiles.push(projectile);
            console.log('shooting');
            console.log(this.target);
        };
        this._idGun = setInterval(this.shoot, this.shotFrequency);
    }
    get projectiles() {
        return this._projectiles;
    }
    stopShooting() {
        clearInterval(this._idGun);
    }
}
