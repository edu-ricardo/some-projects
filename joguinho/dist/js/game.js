import { Platform } from "./platform.js";
import { Player } from "./player.js";
export class Game {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.platforms = [];
        this.createPlatforms = () => {
            const platform = new Platform({
                x: this.gameScreen.width / 3 + Platform.platformWidths.medium,
                y: (this.gameScreen.height / 4 * 2) + Platform.platformHeights.medium,
                width: Platform.platformWidths.medium,
                height: Platform.platformHeights.medium
            });
            this.platforms.push(platform);
        };
        this.player = new Player({ x: 10,
            y: 10,
            height: 150,
            width: 66
        });
        this.createPlatforms();
    }
}
