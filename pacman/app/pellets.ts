import { Circle } from "./geometry/circle.js";

export class Pellet {
  private _geometry: Circle
  pointValue: number = 10
  
  public get geometry() : Circle {
    return this._geometry
  }

  constructor (x: number, y: number) {
    this._geometry = new Circle(x, y, 3)
  }

  update(context: CanvasRenderingContext2D) {
    context.fillStyle = 'white'
    this.draw(context)
  }

  draw(context: CanvasRenderingContext2D) {
    this._geometry.draw(context)
  }
}