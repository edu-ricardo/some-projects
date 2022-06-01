import { GameElement } from "./game-element.js";
import { PLAYER_SIZE } from "./game-screen.js";
import { Rect } from "./geometry/rect.js";

export class Projectile extends GameElement {
  private _idProjectile: number
  velocity: number = 100
  target: GameElement
  diferentialX: number;
  diferentialY: number;


  destroy(){
    this.positionX = -1
    this.positionY = -1
    this.diferentialY = 0
    this.diferentialX = 0
    this.updateRect()
    clearInterval(this._idProjectile)
    console.log('Destroyed');
    
  }
  
  constructor(private _target: GameElement) {
    super()
    this.target = new GameElement()

    this.target.positionX = _target.positionX
    this.target.positionY = _target.positionY

    this.target.geometry = new Rect(this.target.positionX, this.target.positionY, PLAYER_SIZE, PLAYER_SIZE)

    const angle = Math.atan2(this.positionX - this.target.positionX, this.positionY- this.target.positionY)
    
    this.diferentialY = Math.sin(angle)
    this.diferentialX = Math.cos(angle)

    this._idProjectile = setInterval(() => {

      console.log('Distancia do projetil '+this._idProjectile+ ' é de '+angle);
        this.positionX += this.diferentialX
        this.positionY += this.diferentialY
      
        // if (this.target.positionX < this.positionX) {
        //   this.positionX += this.diferentialX
        // }else if(this.target.positionX > this.positionX){
        //   this.positionX -= this.diferentialX
        // }

        // if (this.target.positionY < this.positionY) {
        //   this.positionY += this.diferentialY  
        // }else if (this.target.positionY > this.positionY){
        //   this.positionY -= this.diferentialY
        // }
      
      this.updateRect() 

      if (this.target.geometry.isColiding(this.geometry)){
        this.destroy()
      }      
    }, this.velocity)
  }


  updateRect() {
    this.geometry = new Rect(Math.floor(this.positionX), Math.floor(this.positionY), 1, 1)
  }
}