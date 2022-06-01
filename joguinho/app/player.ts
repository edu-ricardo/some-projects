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

  terminalVelocity: number = 10
  constructor(rect:{x: number, y:number, width: number, height: number}) {
    super()
    this.geometry = new Rect(rect.x, rect.y, rect.width, rect.height)
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'red'
    this.geometry.draw(context)
  }

  update = (context: CanvasRenderingContext2D) => {
    if (this.geometry instanceof Rect){
      this.geometry.y += this.velocity.y
      
      if ((this.geometry.y + this.geometry.height + this.velocity.y <= context.canvas.height)){
        if (this.velocity.y <= this.terminalVelocity)
          this.velocity.y += GRAVITY
      } else this.velocity.y = 0 

      this.geometry.x += this.velocity.x

      this.draw(context)
    }
  }
}