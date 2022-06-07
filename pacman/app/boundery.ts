import { Rect } from "./geometry/rect.js";

export class Boundery {
  static defaultWidth : number = 40
  static defaultHeight : number = 40
  private _geometry: Rect

  public get geometry() : Rect {
    return this._geometry
  }
  

  constructor(x: number, y: number) {
    this._geometry = new Rect(x, y, Boundery.defaultWidth, Boundery.defaultHeight)
    
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'blue'
    this._geometry.draw(context)
  }
}