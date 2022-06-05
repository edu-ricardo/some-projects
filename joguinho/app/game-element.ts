import { Circle } from "./geometry/circle.js"
import { Rect } from "./geometry/rect.js"

export class GameElement {
  collider: Rect | Circle
}