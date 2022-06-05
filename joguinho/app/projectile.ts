import { GameElement } from "./game-element.js";
import { Rect } from "./geometry/rect.js";

export class Projectile extends GameElement {
  private _idProjectile: number
  velocity: number = 100
  target: GameElement
  diferentialX: number;
  diferentialY: number;


  destroy(){
    this.diferentialY = 0
    this.diferentialX = 0
    this.updateRect()
    clearInterval(this._idProjectile)
    console.log('Destroyed');
    
  }
  
  constructor(private _target: GameElement) {
    super()

  }


  updateRect() {
    
  }
}