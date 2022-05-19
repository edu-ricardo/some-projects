const OBJECTIVE_DATE = '01/25/2023'

class Main {
  private hourElement: HTMLElement
  private daysElement: HTMLElement
  private minutesElement: HTMLElement
  private secondsElement: HTMLElement
  private countdowId: number

  getFullDays(time: number): number {
    return (time - (time % (1000 * 60 * 60 * 24))) /(1000 * 60 * 60 * 24)
  }
  
  getFullDaysRemains(time: number): number {
    return time % (1000 * 60 * 60 * 24)
  }

  getFullHours(time: number): number {
    return (time - (time % (1000 * 60 * 60))) /(1000 * 60 * 60)
  }

  getFullHoursRemaining(time: number): number {
    return (time % (1000 * 60 * 60))
  }
  
  getFullMinutes(time: number): number {
    return (time - (time % (1000 * 60))) /(1000 * 60)
  }

  getFullMinutesRemaining(time: number): number {
    return (time % (1000 * 60 ))
  }

  getFullSeconds(time: number): number {
    return (time - (time % (1000))) /(1000)
  }

  getFullSecondsRemaining(time: number): number {
    return (time % (1000))
  }

  padLeft(value: string, size: number, char: string): string{
    let s = value
    while (s.length < size) s = "0" + s;

    return s
  }

  countdown = () => {
    const objectiveDate = new Date(OBJECTIVE_DATE)
    const now = new Date()

    let diff = objectiveDate.getTime() - now.getTime()

    this.daysElement.innerText = this.getFullDays(diff).toString()
    diff = this.getFullDaysRemains(diff)
    this.hourElement.innerText = this.padLeft(this.getFullHours(diff).toString(), 2, '0')
    diff = this.getFullHoursRemaining(diff)
    this.minutesElement.innerText = this.padLeft(this.getFullMinutes(diff).toString(), 2, '0')
    diff = this.getFullMinutesRemaining(diff)
    this.secondsElement.innerText = this.padLeft(this.getFullSeconds(diff).toString(), 2, '0')
  }


  execute() {
    this.daysElement = document.getElementById('days')
    this.hourElement = document.getElementById('hours')   
    this.minutesElement = document.getElementById('minutes')   
    this.secondsElement = document.getElementById('seconds')           

    this.countdown()
    this.countdowId = setInterval(this.countdown, 1000)

  }
}

(new Main()).execute()
