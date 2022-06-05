import { JUMP_FORCE, LATERAL_FORCE } from "./configurations.js";
import { Rect } from "./geometry/rect.js";
const PIXEL_SIZE = 1;
export class GameScreen {
    constructor() {
        this._component = document.createElement('canvas');
        this.width = innerWidth - 50;
        this.height = innerHeight - 50;
        this.keyup = (e) => {
            if ((e.key == 'ArrowRight') || (e.key == 'ArrowLeft')) {
                this.game.player.velocity.x = 0;
            }
        };
        this.keydow = (e) => {
            if (e.key == 'ArrowRight') {
                this.game.player.velocity.x += LATERAL_FORCE;
            }
            if (e.key == 'ArrowLeft') {
                this.game.player.velocity.x -= LATERAL_FORCE;
            }
            if (e.key == 'ArrowUp') {
                this.game.player.velocity.y += JUMP_FORCE;
            }
        };
        document.body.appendChild(this._component);
        this._component.className = 'game-field';
        this._component.style.width = `${this.width * PIXEL_SIZE}px`;
        this._component.style.height = `${this.height * PIXEL_SIZE}px`;
        this._component.width = this.width;
        this._component.height = this.height;
        // document.addEventListener('mousemove', (e) => {
        //   this.rect.x = e.clientX - this._component.offsetLeft
        //   this.rect.y = e.clientY - this._component.offsetTop
        // })
        document.addEventListener('keydown', this.keydow);
        document.addEventListener('keyup', this.keyup);
    }
    render(game) {
        const gameCanvas = this._component.getContext('2d');
        gameCanvas.fillStyle = 'white';
        gameCanvas.clearRect(0, 0, this.width, this.height);
        game.player.update(gameCanvas);
        game.platforms.forEach((platform) => {
            platform.update(gameCanvas);
            if (platform.collider.isColiding(game.player.collider)) {
                if (game.player.velocity.y > 0)
                    game.player.velocity.y = 0;
            }
            if (platform.collider.isMerged(game.player.collider)) {
                if (game.player.collider instanceof Rect)
                    game.player.collider.y = platform.collider.y - game.player.collider.height;
            }
        });
        if (this.game == undefined)
            this.game = game;
        requestAnimationFrame(() => this.render(game));
    }
}
