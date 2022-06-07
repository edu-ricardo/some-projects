import { Boundery } from "./boundery.js";
import { CommandKey } from "./command-key.js";
import { Circle } from "./geometry/circle.js";
import { Velocity } from "./velocity";

export class Pacman {
  static speedX: number = 5
  static speedY: number = 5

  private _geometry: Circle
  
  public get geometry() : Circle {
    return this._geometry
  }
  

  velocity: Velocity = {
    x: 0,
    y: 0
  }

  lastKeys: Array<CommandKey>

  constructor (x: number, y: number) {
    this._geometry = new Circle(x, y, 15)
  }

  processComands(commands: Array<CommandKey>, bounderies: Array<Boundery>) {
    commands.filter(p => p.pressed).forEach((command) => {
      if (command.lastKey)
        switch(command.keyName) {
          case 'Up':
            if (bounderies.map(b => b.geometry.isColiding(this._geometry, {
              x: 0,
              y: -Pacman.speedY
            })).find(p => p))
              this.velocity.y = 0
            else
              this.velocity.y = -Pacman.speedY 
            break
          case 'Down': 
            if (bounderies.map(b => b.geometry.isColiding(this._geometry, {
              x: 0,
              y: Pacman.speedY
            })).find(p => p))
              this.velocity.y = 0
            else
              this.velocity.y = Pacman.speedY 
            break
          case 'Left': 
            if (bounderies.map(b => b.geometry.isColiding(this._geometry, {
              x: -Pacman.speedX,
              y: 0
            })).find(p => p))
              this.velocity.x = 0
            else
              this.velocity.x = -Pacman.speedX 
            break
          case 'Right': 
            if (bounderies.map(b => b.geometry.isColiding(this._geometry, {
              x: Pacman.speedX,
              y: 0
            })).find(p => p))
              this.velocity.x = 0
            else
              this.velocity.x = Pacman.speedX 
            break
        }
    })

  }

  update(context: CanvasRenderingContext2D) {
    this._geometry.x += this.velocity.x
    this._geometry.y += this.velocity.y

    context.fillStyle = 'yellow'
    this.draw(context)
  }

  draw(context: CanvasRenderingContext2D) {
    this._geometry.draw(context)
  }
}