import { GameScreen } from "./game-screen.js";
import { Platform } from "./platform.js";
import { Player } from "./player.js";

export class Game {
  player: Player
  platforms: Array<Platform> = []

  constructor (private gameScreen: GameScreen){
    this.player = new Player({x: 10,
      y: 10,
      height: 50,
      width: 30
    })
    this.createPlatforms()
  }

  createPlatforms = () => {
    const platform = new Platform({
      x: this.gameScreen.width / 3 + Platform.platformWidths.medium,
      y: (this.gameScreen.height / 4 * 3) + Platform.platformHeights.medium,
      width: Platform.platformWidths.medium,
      height: Platform.platformHeights.medium
    })

    this.platforms.push(platform)
  }
}  