import { GameElement } from "./game-element.js"
import { Projectile } from "./projectile.js"

export class Gun extends GameElement{
  private _projectiles: Array<Projectile> = []
  private _idGun: number
  shotFrequency: number = 1000
  target: GameElement

  
  public get projectiles() : Array<Projectile> {
    return this._projectiles
  }
  

  stopShooting() {
    clearInterval(this._idGun)
  }

  shoot = () => {
    const projectile = new Projectile(this.target)

    projectile.positionX = this.positionX
    projectile.positionY = this.positionY

    this._projectiles.push(projectile)
    console.log('shooting');
    console.log(this.target);
  }

  constructor() {
    super()

    this._idGun = setInterval(this.shoot, this.shotFrequency)
  }
}