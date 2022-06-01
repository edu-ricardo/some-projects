import { Rect } from "./rect.js";

export class Circle {
  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    context.fill();
    context.closePath();
  }

  isColiding(subject: Rect | Circle): boolean {
    if (subject instanceof Rect) {
      // compute a center-to-center vector
      var half = { 
        x: subject.width/2, 
        y: subject.height/2 
      };
      
      var center = {
        x: this.x - (subject.x+half.x),
        y: this.y - (subject.y+half.y)
      };

      // check circle position inside the rectangle quadrant
      var side = {
          x: Math.abs (center.x) - half.x,
          y: Math.abs (center.y) - half.y};
      if (side.x >  this.radius || side.y >  this.radius) // outside
          return false; 
      if (side.x < -this.radius && side.y < -this.radius) // inside
          return true;
      if (side.x < 0 || side.y < 0) // intersects side or corner
          return true;

      // circle is near the corner
      return side.x*side.x + side.y*side.y  < this.radius*this.radius;
    }

    if (subject instanceof Circle) {
      const distX = subject.x - this.x
      const distY = subject.y - this.y
      const dist = Math.floor(Math.sqrt(Math.pow(distX,2) + Math.pow(distY,2)))
      return dist <= subject.radius + this.radius
    }
  }


  isMerged(subject: Rect | Circle): boolean {
    if (subject instanceof Rect) {
      // compute a center-to-center vector
      var half = { 
        x: subject.width/2, 
        y: subject.height/2 
      };
      
      var center = {
        x: this.x - (subject.x+half.x),
        y: this.y - (subject.y+half.y)
      };

      // check circle position inside the rectangle quadrant
      var side = {
          x: Math.abs (center.x) - half.x,
          y: Math.abs (center.y) - half.y};
      if (side.x >  this.radius || side.y >  this.radius) // outside
          return false; 
      if (side.x < -this.radius && side.y < -this.radius) // inside
          return true;
      if (side.x < 0 || side.y < 0) // intersects side or corner
          return false;

      // circle is near the corner
      return side.x*side.x + side.y*side.y  < this.radius*this.radius;
    }

    if (subject instanceof Circle) {
      const distX = subject.x - this.x
      const distY = subject.y - this.y
      const dist = Math.floor(Math.sqrt(Math.pow(distX,2) + Math.pow(distY,2)))
      return dist < subject.radius + this.radius
    }
  }

  constructor(public x: number, public y: number, public radius: number) {
    
  }
}