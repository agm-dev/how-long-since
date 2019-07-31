const hour = 1000 * 60 * 60
const day = hour * 24

export default class Item {
  constructor(data) {
    const { text, time, format } = data
    this.id = (new Date()).getTime()
    this.text = text
    this.time = time
    this.format = format || 'ms'
  }

  get howLong() {
    const now = (new Date()).getTime()
    const diff = now - this.time
    let result
    switch (this.format) {
      case 'y':
        result = diff / (day * 365)
        break
      case 'M':
        result = diff / (day * 30)
        break
      case 'd':
        result = diff / day
        break
      case 'h':
        result = diff / hour
        break
      case 'm':
        result = diff / (hour * 60)
        break
      case 's':
        result = diff / 1000
        break
      default:
        result = diff
    }
    return result
  }
}
