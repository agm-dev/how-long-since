import { timeFormats } from '../utils/time.utils'

const {
  seconds,
  minutes,
  hours,
  days,
  months,
  years,
} = timeFormats

export default class Item {
  constructor(data) {
    const { id, text, time, format } = data
    this.id = id || (new Date()).getTime()
    this.text = text
    this.time = time
    this.format = format || timeFormats.seconds.tag
  }

  get howLong() {
    const now = (new Date()).getTime()
    const diff = now - this.time
    let result
    switch (this.format) {
      case years.tag:
        result = diff / years.value
        break
      case months.tag:
        result = diff / months.value
        break
      case days.tag:
        result = diff / days.value
        break
      case hours.tag:
        result = diff / hours.value
        break
      case minutes.tag:
        result = diff / minutes.value
        break
      default:
        result = diff / seconds.value
    }
    return parseInt(result.toFixed())
  }
}
