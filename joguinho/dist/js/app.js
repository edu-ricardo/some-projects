import { Game } from "./game.js";
import { GameScreen } from "./game-screen.js";
const gameScreen = new GameScreen();
const game = new Game(gameScreen);
// document.addEventListener('keydown', )
requestAnimationFrame(() => gameScreen.render(game));
