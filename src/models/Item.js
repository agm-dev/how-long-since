export default class Item {
  constructor(data) {
    const { text, time, timeFormat } = data
    this.id = (new Date()).getTime()
    this.text = text
    this.time = time
    this.timeFormat = timeFormat || 'ms'
  }

  get howLong() {
    const now = (new Date()).getTime()
    const diff = now - this.time
    let result
    switch (this.timeFormat) {
      case 'y':
        result = diff / 1000 / 60 / 60 / 24 / 365
        break
      case 'M':
        result = diff / 1000 / 60 / 60 / 24 / 30
        break
      case 'd':
        result = diff / 1000 / 60 / 60 / 24
        break
      case 'h':
        result = diff / 1000 / 60 / 60
        break
      case 'm':
        result = diff / 1000 / 60
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
