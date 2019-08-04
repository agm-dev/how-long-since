import { timeFormats } from '../utils/time.utils'

const {
  seconds,
  minutes,
  hours,
  days,
  months,
  years,
} = timeFormats

const getFormattedTime = (time, format) => {
  let result
  switch (format) {
    case years.tag:
      result = time / years.value
      break
    case months.tag:
      result = time / months.value
      break
    case days.tag:
      result = time / days.value
      break
    case hours.tag:
      result = time / hours.value
      break
    case minutes.tag:
      result = time / minutes.value
      break
    default:
      result = time / seconds.value
  }
  return parseInt(result.toFixed())
}

export default class Item {
  constructor(data) {
    const {
      id = (new Date()).getTime(),
      text,
      time,
      format = timeFormats.seconds.tag,
      goal = null,
      record = null,
    } = data
    this.id = id
    this.text = text
    this.time = time
    this.format = format
    this.goal = goal
    this.record = record
  }

  get timeDiff() {
    const now = (new Date()).getTime()
    return now - this.time
  }

  get howLong() {
    const diff = this.timeDiff
    return getFormattedTime(diff, this.format)
  }

  get howLongRecord() {
    return getFormattedTime(this.record, this.format)
  }

  get isCompleted() {
    if (this.goal === null) {
      return false
    }
    const currentDiff = this.timeDiff
    const timeFormatData = Object
      .entries(timeFormats)
      .find(([key, data]) => data.tag === this.format)
      .pop()
    const goalTime = timeFormatData.value * this.goal
    return currentDiff >= goalTime
  }

  reset() {
    const currentDiff = this.timeDiff
    const isTherePreviousRecord = this.record !== null
    const isNewRecord = !isTherePreviousRecord || currentDiff > this.record
    const now = (new Date()).getTime()

    this.record = isNewRecord ? currentDiff : this.record
    this.time = now
  }
}
