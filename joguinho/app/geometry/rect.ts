export class Rect {
  x: number
  y: number
  width: number
  height: number

  isSquare():boolean { return this.width === this.height }

  isColiding(anotherRect: Rect): boolean {

    if (this.x + this.width >= anotherRect.x && 
        this.x <= anotherRect.x + anotherRect.width &&
        this.y + this.height >= anotherRect.y && 
        this.y <= anotherRect.y + anotherRect.height) {
      return true
    }

    return false
  }

  isMerged(anotherRect: Rect): boolean {

    if (this.x + this.width > anotherRect.x && 
        this.x < anotherRect.x + anotherRect.width &&
        this.y + this.height > anotherRect.y && 
        this.y < anotherRect.y + anotherRect.height) {
      return true
    }

    return false
  }

  constructor (x: number, y: number, w: number, h: number) {
    this.x = x
    this.y = y
    this.width = w
    this.height = h
  }
}