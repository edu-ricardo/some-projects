import { Rect } from "./geometry/rect.js";
export class Boundery {
    constructor(x, y) {
        this._geometry = new Rect(x, y, Boundery.defaultWidth, Boundery.defaultHeight);
    }
    get geometry() {
        return this._geometry;
    }
    draw(context) {
        context.fillStyle = 'blue';
        this._geometry.draw(context);
    }
}
Boundery.defaultWidth = 40;
Boundery.defaultHeight = 40;
