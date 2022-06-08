import { Rect } from "./geometry/rect.js";

export class Boundery {
  static defaultWidth : number = 40
  static defaultHeight : number = 40
  private _geometry: Rect
  private _image: HTMLImageElement = new Image()

  public get geometry() : Rect {
    return this._geometry
  }

  
  public set imageUrl(v : string) {
    this._image.src = v; 
  }

  constructor(x: number, y: number) {
    this._geometry = new Rect(x, y, Boundery.defaultWidth, Boundery.defaultHeight)    
  }

  draw(context: CanvasRenderingContext2D) {
    // context.fillStyle = 'blue'
    // this._geometry.draw(context)
    context.drawImage(this._image, this._geometry.x, this._geometry.y)
  }
}