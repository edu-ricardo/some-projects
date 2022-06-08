import { Boundery } from "./boundery.js"
import { CommandKey } from "./command-key.js"
import { map, mapIcons } from "./configs.js"
import { Pacman } from "./pacman.js"
import { Pellet } from "./pellets.js"

export class Game {
  private _canvas = document.createElement('canvas')
  private _context: CanvasRenderingContext2D
  private _animationId: number = 0
  private _bounderies: Array<Boundery> = []
  private _pellets: Array<Pellet> = []
  private pacman: Pacman
  private commands: Array<CommandKey> = []
  private _spanPoints = document.createElement('span')
  private _points = 0

  pause = () => {
    cancelAnimationFrame(this._animationId)
  }

  continue = () => {
    this._animationId = requestAnimationFrame(this.animate)
  }

  restart = () => {
    this.pause()
    this.init()
    this.continue()
  }

  createButtons() {
    const divBtns = document.createElement('div')
    divBtns.className = 'buttons-div'

    const btnPause = document.createElement('button')
    btnPause.innerText = 'Pause'
    btnPause.addEventListener('click', this.pause)
    divBtns.appendChild(btnPause)

    const btnContinue = document.createElement('button')
    btnContinue.innerText = 'Continue'
    btnContinue.addEventListener('click', this.continue)
    divBtns.appendChild(btnContinue)

    const btnRestart = document.createElement('button')
    btnRestart.innerText = 'Restart'
    btnRestart.addEventListener('click', this.restart)
    divBtns.appendChild(btnRestart)    

    document.body.appendChild(divBtns)
  }

  createMap() {
    map.forEach((row, i) => {
      row.forEach((column, j) => {
        const b = new Boundery(j * Boundery.defaultWidth, i * Boundery.defaultHeight)
        if (mapIcons.find(p => p === column)) {
          b.imageUrl = `images/${column}.png`
          this._bounderies.push(b)
        } else if ( column === '.') {
          this._pellets.push(new Pellet(j * Boundery.defaultWidth + Boundery.defaultWidth / 2, i * Boundery.defaultHeight + Boundery.defaultHeight / 2))
        }
      })
    })

    this.pacman = new Pacman(Boundery.defaultWidth + Boundery.defaultWidth / 2, Boundery.defaultHeight + Boundery.defaultHeight / 2)
  } 

  keyUp = (e: KeyboardEvent) => {
    switch(e.key) {
      case 'ArrowUp':
        this.commands.find(p => p.keyName === "Up").pressed = false
        break
      case 'ArrowDown':
        this.commands.find(p => p.keyName === "Down").pressed = false
        break
      case 'ArrowRight':
        this.commands.find(p => p.keyName === "Right").pressed = false
        break
      case 'ArrowLeft':
        this.commands.find(p => p.keyName === "Left").pressed = false
        break
    }
  }

  keyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowRight':
      case 'ArrowLeft':
        this.commands.forEach(c => c.lastKey = false)   
        break;
    }    

    switch(e.key) {
      case 'ArrowUp':
        this.commands.find(p => p.keyName === "Up").pressed = true
        this.commands.find(p => p.keyName === "Up").lastKey = true
        break
      case 'ArrowDown':
        this.commands.find(p => p.keyName === "Down").pressed = true
        this.commands.find(p => p.keyName === "Down").lastKey = true
        break
      case 'ArrowRight':
        this.commands.find(p => p.keyName === "Right").pressed = true
        this.commands.find(p => p.keyName === "Right").lastKey = true
        break
      case 'ArrowLeft':
        this.commands.find(p => p.keyName === "Left").pressed = true
        this.commands.find(p => p.keyName === "Left").lastKey = true
        break
    }
  }

  createCommandListener() {
    this.commands.push({
      keyName: "Up",
      pressed: false
    },
    {
      keyName: "Down",
      pressed: false
    },
    {
      keyName: "Left",
      pressed: false
    },
    {
      keyName: "Right",
      pressed: false
    })

    addEventListener('keydown', this.keyDown)
    addEventListener('keyup', this.keyUp)
  }

  init = () => {
    this._points = 0
    this.createMap()
    this.createCommandListener()
  }

  constructor() {
    this._spanPoints.innerHTML = 'Pontuação: 0'
    document.body.appendChild(this._spanPoints)  

    this._canvas.width = 600 
    this._canvas.height = 600
    document.body.appendChild(this._canvas)

    this.createButtons()
    this.init()

    this._context = this._canvas.getContext("2d")
  }


  animate = () => {
    this._spanPoints.innerHTML = `Pontuação: ${this._points}`
    this._context.clearRect(0,0,this._canvas.width, this._canvas.height)
    this._context.fillStyle = 'black'
    this._context.fillRect(0,0,this._canvas.width, this._canvas.height)
    this.pacman.processComands(this.commands, this._bounderies)
    
    this._bounderies.forEach((boundery) => {
      boundery.draw(this._context)

      if (boundery.geometry.isColiding(this.pacman.geometry, this.pacman.velocity))
        this.pacman.velocity = {
          x: 0,
          y: 0
        }
    })    

    for (let i = this._pellets.length - 1; i >= 0; i--) {
      const p = this._pellets[i];
      p.update(this._context) 

      if (p.geometry.isColiding(this.pacman.geometry)){
        this._pellets.splice(i, 1)
        this._points += p.pointValue
      } 
    }    
    
    if (this._pellets.length === 0) {
      console.log('You Win');
      this.restart()
    }

    this.pacman.update(this._context)    
    this._animationId = requestAnimationFrame(this.animate)
  }
}