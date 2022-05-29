export class Rect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    isSquare() { return this.width === this.height; }
    isColiding(anotherRect) {
        if (this.x + this.width >= anotherRect.x &&
            this.x <= anotherRect.x + anotherRect.width &&
            this.y + this.height >= anotherRect.y &&
            this.y <= anotherRect.y + anotherRect.height) {
            return true;
        }
        return false;
    }
    isMerged(anotherRect) {
        if (this.x + this.width > anotherRect.x &&
            this.x < anotherRect.x + anotherRect.width &&
            this.y + this.height > anotherRect.y &&
            this.y < anotherRect.y + anotherRect.height) {
            return true;
        }
        return false;
    }
}
