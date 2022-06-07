import { Circle } from "./geometry/circle.js";
export class Pacman {
    constructor(x, y) {
        this.velocity = {
            x: 0,
            y: 0
        };
        this._geometry = new Circle(x, y, 15);
    }
    get geometry() {
        return this._geometry;
    }
    processComands(commands, bounderies) {
        commands.filter(p => p.pressed).forEach((command) => {
            if (command.lastKey)
                switch (command.keyName) {
                    case 'Up':
                        if (bounderies.map(b => b.geometry.isColiding(this._geometry, {
                            x: 0,
                            y: -Pacman.speedY
                        })).find(p => p))
                            this.velocity.y = 0;
                        else
                            this.velocity.y = -Pacman.speedY;
                        break;
                    case 'Down':
                        if (bounderies.map(b => b.geometry.isColiding(this._geometry, {
                            x: 0,
                            y: Pacman.speedY
                        })).find(p => p))
                            this.velocity.y = 0;
                        else
                            this.velocity.y = Pacman.speedY;
                        break;
                    case 'Left':
                        if (bounderies.map(b => b.geometry.isColiding(this._geometry, {
                            x: -Pacman.speedX,
                            y: 0
                        })).find(p => p))
                            this.velocity.x = 0;
                        else
                            this.velocity.x = -Pacman.speedX;
                        break;
                    case 'Right':
                        if (bounderies.map(b => b.geometry.isColiding(this._geometry, {
                            x: Pacman.speedX,
                            y: 0
                        })).find(p => p))
                            this.velocity.x = 0;
                        else
                            this.velocity.x = Pacman.speedX;
                        break;
                }
        });
    }
    update(context) {
        this._geometry.x += this.velocity.x;
        this._geometry.y += this.velocity.y;
        context.fillStyle = 'yellow';
        this.draw(context);
    }
    draw(context) {
        this._geometry.draw(context);
    }
}
Pacman.speedX = 5;
Pacman.speedY = 5;
