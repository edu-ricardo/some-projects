import { GRAVITY } from "./configurations.js";
import { GameElement } from "./game-element.js";
import { Rect } from "./geometry/rect.js";
export class Player extends GameElement {
    constructor(rect) {
        super();
        this.velocity = {
            x: 0,
            y: 0
        };
        this.terminalVelocity = 10;
        this.update = (context) => {
            if (this.geometry instanceof Rect) {
                this.geometry.y += this.velocity.y;
                if ((this.geometry.y + this.geometry.height + this.velocity.y <= context.canvas.height)) {
                    if (this.velocity.y <= this.terminalVelocity)
                        this.velocity.y += GRAVITY;
                }
                else
                    this.velocity.y = 0;
                this.geometry.x += this.velocity.x;
                this.draw(context);
            }
        };
        this.geometry = new Rect(rect.x, rect.y, rect.width, rect.height);
    }
    draw(context) {
        context.fillStyle = 'red';
        this.geometry.draw(context);
    }
}
