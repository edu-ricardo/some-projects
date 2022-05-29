import { GameElement } from "./game-element.js";
export class Projectile extends GameElement {
    constructor(_target) {
        super();
        this._target = _target;
        this.velocity = 100;
        this.target = new GameElement();
        this.target.positionX = _target.positionX;
        this.target.positionY = _target.positionY;
        const id = setInterval(() => {
            if (this.target.positionX < this.positionX) {
                this.positionX--;
            }
            else if (this.target.positionX > this.positionX) {
                this.positionX++;
            }
            if (this.target.positionY < this.positionY) {
                this.positionY--;
            }
            else if (this.target.positionY > this.positionY) {
                this.positionY++;
            }
            if ((this.target.positionX === this.positionX) && (this.target.positionY === this.positionY)) {
                this.positionX = -1;
                this.positionY = -1;
                clearInterval(id);
            }
        }, this.velocity);
    }
}
