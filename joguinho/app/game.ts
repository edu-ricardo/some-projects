import { GameScreen, GOAL_SIZE, GUN_SIZE, PLAYER_SIZE } from "./game-screen.js";
import { Gun } from "./gun.js";
import { Player } from "./player.js";

export class Game {
  private _player: Player
  private _playerMovements: Map<string,Function> 
  private _guns: Array<Gun> = []
  
  
  public get guns() : Array<Gun> {
    return this._guns
  }
  

  public get player() : Player {
    return this._player
  }
  

  movePlayerLeft = () =>  {
    if (this._player.positionX - 1 >= 0) {
      this._player.positionX--
    }
  }  

  movePlayerRight = () =>  {
    if (this._player.positionX + 1 <= this.gameScreen.height - PLAYER_SIZE) {
      this._player.positionX++
    }
  }

  movePlayerUp = () =>  {
    if (this._player.positionY - 1 >= 0) {
      this._player.positionY--
    }
  }  

  movePlayerDown = () =>  {
    if (this._player.positionY + 1 <= this.gameScreen.width - PLAYER_SIZE) {
      this._player.positionY++
    }
  }

  keyboardInput = (e: KeyboardEvent) => {
    console.log('Pressing......'+e.key);
    

    if (this._playerMovements.has(e.key))
      this._playerMovements.get(e.key)()
  }

  constructor (private gameScreen: GameScreen){
    this._player = new Player()

    this._player.positionX = Math.floor(Math.random() * (gameScreen.width - PLAYER_SIZE - 1))
    this._player.positionY = Math.floor(Math.random() * (gameScreen.height- PLAYER_SIZE - 1))    

    this._playerMovements = new Map()

    this._playerMovements.set('ArrowUp', this.movePlayerUp)
    this._playerMovements.set('ArrowDown', this.movePlayerDown)
    this._playerMovements.set('ArrowLeft', this.movePlayerLeft)
    this._playerMovements.set('ArrowRight', this.movePlayerRight)

    document.addEventListener('keydown', this.keyboardInput)

    const g = new Gun()
    g.target = this._player
    g.positionX = gameScreen.width - GUN_SIZE
    g.positionY = Math.floor(Math.random() * (gameScreen.height- PLAYER_SIZE - 1)) + GOAL_SIZE
    this._guns.push(g)
  }
}  