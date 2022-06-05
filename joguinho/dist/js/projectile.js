import { GameElement } from "./game-element.js";
export class Projectile extends GameElement {
    constructor(_target) {
        super();
        this._target = _target;
        this.velocity = 100;
    }
    destroy() {
        this.diferentialY = 0;
        this.diferentialX = 0;
        this.updateRect();
        clearInterval(this._idProjectile);
        console.log('Destroyed');
    }
    updateRect() {
    }
}
