import { Circle } from "./circle.js"

export class Rect {
  public x: number
  public y: number
  public width: number
  public height: number

  draw(context: CanvasRenderingContext2D) {
    context.fillRect(this.x, this.y, this.width, this.height)
  }

  isSquare():boolean { return this.width === this.height }

  isColiding(subject: Rect | Circle): boolean {
    if (subject instanceof Rect) {
      if (this.x + this.width >= subject.x && 
          this.x <= subject.x + subject.width &&
          this.y + this.height >= subject.y && 
          this.y <= subject.y + subject.height) {
        return true
      }
      return false
    }

    if (subject instanceof Circle) {
      // compute a center-to-center vector
      var half = { 
        x: this.width/2, 
        y: this.height/2 
      };
      
      var center = {
        x: subject.x - (this.x+half.x),
        y: subject.y - (this.y+half.y)
      };

      // check circle position inside the rectangle quadrant
      var side = {
          x: Math.abs (center.x) - half.x,
          y: Math.abs (center.y) - half.y};
      if (side.x >  subject.radius || side.y >  subject.radius) // outside
          return false; 
      if (side.x < -subject.radius && side.y < -subject.radius) // inside
          return true;
      if (side.x < 0 || side.y < 0) // intersects side or corner
          return true;

      // circle is near the corner
      return side.x*side.x + side.y*side.y  < subject.radius*subject.radius;

    }
  }

  isMerged(subject: Rect | Circle): boolean {
    if (subject instanceof Rect) {
      if (this.x + this.width > subject.x && 
          this.x < subject.x + subject.width &&
          this.y + this.height > subject.y && 
          this.y < subject.y + subject.height) {
        return true
      }

      return false
    }

    if (subject instanceof Circle) {
      // compute a center-to-center vector
      var half = { 
        x: this.width/2, 
        y: this.height/2 
      };
      
      var center = {
        x: subject.x - (this.x+half.x),
        y: subject.y - (this.y+half.y)
      };

      // check circle position inside the rectangle quadrant
      var side = {
          x: Math.abs (center.x) - half.x,
          y: Math.abs (center.y) - half.y};
      if (side.x >  subject.radius || side.y >  subject.radius) // outside
          return false; 
      if (side.x < -subject.radius && side.y < -subject.radius) // inside
          return true;
      if (side.x < 0 || side.y < 0) // intersects side or corner
          return false;

      // circle is near the corner
      return side.x*side.x + side.y*side.y  < subject.radius*subject.radius;

    }
  }

  constructor (x: number, y: number, width: number, height: number) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
}