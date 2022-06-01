import { GameElement } from "./game-element.js";
import { Rect } from "./geometry/rect.js";
export class Platform extends GameElement {
    constructor(rect) {
        super();
        this.geometry = new Rect(rect.x, rect.y, rect.width, 1);
        this.geometryVisual = new Rect(rect.x, rect.y, rect.width, rect.height);
    }
    draw(context) {
        context.fillStyle = 'blue';
        this.geometryVisual.draw(context);
    }
    update(context) {
        this.draw(context);
    }
}
Platform.platformWidths = {
    'small': 50,
    'medium': 100,
    'large': 200
};
Platform.platformHeights = {
    'small': 20,
    'medium': 40,
    'large': 60
};
