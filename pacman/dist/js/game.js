import { Boundery } from "./boundery.js";
import { map } from "./configs.js";
import { Pacman } from "./pacman.js";
export class Game {
    constructor() {
        this._canvas = document.createElement('canvas');
        this._animationId = 0;
        this._bounderies = [];
        this.commands = [];
        this.pause = () => {
            cancelAnimationFrame(this._animationId);
        };
        this.continue = () => {
            this._animationId = requestAnimationFrame(this.animate);
        };
        this.keyUp = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    this.commands.find(p => p.keyName === "Up").pressed = false;
                    break;
                case 'ArrowDown':
                    this.commands.find(p => p.keyName === "Down").pressed = false;
                    break;
                case 'ArrowRight':
                    this.commands.find(p => p.keyName === "Right").pressed = false;
                    break;
                case 'ArrowLeft':
                    this.commands.find(p => p.keyName === "Left").pressed = false;
                    break;
            }
        };
        this.keyDown = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                case 'ArrowDown':
                case 'ArrowRight':
                case 'ArrowLeft':
                    this.commands.forEach(c => c.lastKey = false);
                    break;
            }
            switch (e.key) {
                case 'ArrowUp':
                    this.commands.find(p => p.keyName === "Up").pressed = true;
                    this.commands.find(p => p.keyName === "Up").lastKey = true;
                    break;
                case 'ArrowDown':
                    this.commands.find(p => p.keyName === "Down").pressed = true;
                    this.commands.find(p => p.keyName === "Down").lastKey = true;
                    break;
                case 'ArrowRight':
                    this.commands.find(p => p.keyName === "Right").pressed = true;
                    this.commands.find(p => p.keyName === "Right").lastKey = true;
                    break;
                case 'ArrowLeft':
                    this.commands.find(p => p.keyName === "Left").pressed = true;
                    this.commands.find(p => p.keyName === "Left").lastKey = true;
                    break;
            }
        };
        this.animate = () => {
            this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
            this._context.fillStyle = 'black';
            this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
            this.pacman.processComands(this.commands, this._bounderies);
            this._bounderies.forEach((boundery) => {
                boundery.draw(this._context);
                if (boundery.geometry.isColiding(this.pacman.geometry, this.pacman.velocity))
                    this.pacman.velocity = {
                        x: 0,
                        y: 0
                    };
            });
            this.pacman.update(this._context);
            this._animationId = requestAnimationFrame(this.animate);
        };
        this._canvas.width = 400;
        this._canvas.height = 400;
        document.body.appendChild(this._canvas);
        this.createButtons();
        this.createMap();
        this.createCommandListener();
        this._context = this._canvas.getContext("2d");
    }
    createButtons() {
        const divBtns = document.createElement('div');
        divBtns.className = 'buttons-div';
        const btnPause = document.createElement('button');
        btnPause.innerText = 'Pause';
        btnPause.addEventListener('click', this.pause);
        divBtns.appendChild(btnPause);
        const btnContinue = document.createElement('button');
        btnContinue.innerText = 'Continue';
        btnContinue.addEventListener('click', this.continue);
        divBtns.appendChild(btnContinue);
        document.body.appendChild(divBtns);
    }
    createMap() {
        map.forEach((row, i) => {
            row.forEach((column, j) => {
                switch (column) {
                    case '-':
                        this._bounderies.push(new Boundery(j * Boundery.defaultWidth, i * Boundery.defaultHeight));
                        break;
                }
            });
        });
        this.pacman = new Pacman(Boundery.defaultWidth + Boundery.defaultWidth / 2, Boundery.defaultHeight + Boundery.defaultHeight / 2);
    }
    createCommandListener() {
        this.commands.push({
            keyName: "Up",
            pressed: false
        }, {
            keyName: "Down",
            pressed: false
        }, {
            keyName: "Left",
            pressed: false
        }, {
            keyName: "Right",
            pressed: false
        });
        addEventListener('keydown', this.keyDown);
        addEventListener('keyup', this.keyUp);
    }
}
