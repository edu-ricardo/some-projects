import { PLAYER_SIZE } from "./game-screen.js";
import { Player } from "./player.js";
export class Game {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.movePlayerLeft = () => {
            if (this._player.positionX - 1 >= 0) {
                this._player.positionX--;
            }
        };
        this.movePlayerRight = () => {
            if (this._player.positionX + 1 <= this.gameScreen.height - PLAYER_SIZE) {
                this._player.positionX++;
            }
        };
        this.movePlayerUp = () => {
            if (this._player.positionY - 1 >= 0) {
                this._player.positionY--;
            }
        };
        this.movePlayerDown = () => {
            if (this._player.positionY + 1 <= this.gameScreen.width - PLAYER_SIZE) {
                this._player.positionY++;
            }
        };
        this.keyboardInput = (e) => {
            console.log('Pressing......' + e.key);
            if (this._playerMovements.has(e.key))
                this._playerMovements.get(e.key)();
        };
        this._player = new Player();
        this._player.positionX = Math.floor(Math.random() * (gameScreen.width - PLAYER_SIZE - 1));
        this._player.positionY = Math.floor(Math.random() * (gameScreen.height - PLAYER_SIZE - 1));
        this._playerMovements = new Map();
        this._playerMovements.set('ArrowUp', this.movePlayerUp);
        this._playerMovements.set('ArrowDown', this.movePlayerDown);
        this._playerMovements.set('ArrowLeft', this.movePlayerLeft);
        this._playerMovements.set('ArrowRight', this.movePlayerRight);
        document.addEventListener('keydown', this.keyboardInput);
    }
    get player() {
        return this._player;
    }
}
