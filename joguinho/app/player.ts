import { GRAVITY } from "./configurations.js";
import { GameElement } from "./game-element.js";
import { Rect } from "./geometry/rect.js";

export class Player extends GameElement{
  velocity: {
    x: number,
    y: number
  } = {
    x: 0,
    y: 0
  }
  frame: number = 0

  terminalVelocity: number = 10
  constructor(rect:{x: number, y:number, width: number, height: number}) {
    super()
    this.collider = new Rect(rect.x, rect.y, rect.width, rect.height)
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'red'
    this.collider.draw(context)
    if (this.collider instanceof Rect){
      const spriteStandRight = document.createElement('img')
      spriteStandRight.src = './images/spriteStandRight.png'

      const spriteRunRight = document.createElement('img')
      spriteRunRight.src = './images/spriteRunRight.png'

      const spriteRunLeft = document.createElement('img')
      spriteRunLeft.src = './images/spriteRunLeft.png'

      // console.log(spriteRunRight);
      // context.drawImage(spriteRunRight, 341.6 * this.frame, 0, 341.6, 400, this.collider.x, this.collider.y, this.collider.width + 60, this.collider.height)        

      // context.drawImage(spriteStandRight, 177 * this.frame, 0, 177, 400, this.collider.x + 500, this.collider.y, this.collider.width, this.collider.height)
      if (this.velocity.x == 0) {
        context.drawImage(spriteStandRight, 177 * this.frame, 0, 177, 400, this.collider.x, this.collider.y, this.collider.width, this.collider.height)
      }else if(this.velocity.x < 0) {
        context.drawImage(spriteRunLeft, 341.6 * this.frame, 0, 341.6, 400, this.collider.x, this.collider.y, this.collider.width+ 70, this.collider.height)
      }else {
        context.drawImage(spriteRunRight, 341.6 * this.frame, 0, 341.6, 400, this.collider.x, this.collider.y, this.collider.width+ 70, this.collider.height)        
      }
    }
  }

  update = (context: CanvasRenderingContext2D) => {
    this.frame++
    if (this.frame > 29) this.frame = 0

    if (this.collider instanceof Rect){
      this.collider.y += this.velocity.y
      
      if ((this.collider.y + this.collider.height + this.velocity.y <= context.canvas.height)){
        if (this.velocity.y <= this.terminalVelocity)
          this.velocity.y += GRAVITY
      } else this.velocity.y = 0 

      if (this.collider.x < context.canvas.width / 3 * 2) 
        this.collider.x += this.velocity.x

      this.draw(context)
    }
  }
}