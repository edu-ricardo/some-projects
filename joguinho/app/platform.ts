import { GameElement } from "./game-element.js";
import { Rect } from "./geometry/rect.js";

export class Platform extends GameElement {
  geometryVisual: Rect;
  
  constructor(rect:{x: number, y:number, width: number, height: number}) {
    super()
    this.collider = new Rect(rect.x, rect.y, rect.width, 1)
    this.geometryVisual = new Rect(rect.x, rect.y, rect.width, rect.height)
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'blue'
    this.geometryVisual.draw(context)
  }

  update(context: CanvasRenderingContext2D) {
    this.draw(context)
  }

  static platformWidths = {
    'small': 50,
    'medium': 100,
    'large': 200
  }
  
  static platformHeights = {
    'small': 20,
    'medium': 40,
    'large': 60
  }
}
