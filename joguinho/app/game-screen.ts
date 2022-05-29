import { Game } from "./game.js";
import { Rect } from "./geometry/rect.js";

const PIXEL_SIZE = 12
export const PLAYER_SIZE = 4
const GOAL_SIZE = 4

export class GameScreen {
  private _component: HTMLCanvasElement = document.createElement('canvas')
  private _points: number = 0

  width: number = 50  
  height: number = 50
  
  private _game: Game

  render(game: Game) {
    const gameCanvas = this._component.getContext('2d')
    gameCanvas.fillStyle = 'white'
    gameCanvas.clearRect(0, 0, this.width, this.height)
    
    gameCanvas.fillStyle = 'green'
    const goalRect = new Rect((this.width / 2) - (GOAL_SIZE/2), 0, GOAL_SIZE, PLAYER_SIZE/2)
    gameCanvas.fillRect(goalRect.x, goalRect.y, goalRect.width, goalRect.height)

    gameCanvas.fillStyle = 'blue'
    const playerRect = new Rect(game.player.positionX, game.player.positionY, PLAYER_SIZE, PLAYER_SIZE)
    gameCanvas.fillRect(playerRect.x, playerRect.y, playerRect.width, playerRect.height)


    // Chekcing colision with goal
    if (playerRect.isMerged(goalRect)) console.log('Merged');
    
    

    this._game = game
    requestAnimationFrame(() => this.render(game))
  }

  constructor (){
    document.body.appendChild(this._component)
    this._component.className = 'game-field'
    this._component.style.width = `${this.width * PIXEL_SIZE}px`
    this._component.style.height = `${this.height * PIXEL_SIZE}px`
    this._component.width = this.width
    this._component.height = this.height
 }
}