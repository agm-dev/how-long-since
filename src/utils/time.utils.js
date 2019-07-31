import {
  getHours,
  setHours,
  getMinutes,
  setMinutes,
  getSeconds,
  setSeconds,
  getMilliseconds,
  setMilliseconds,
} from 'date-fns'

export const getCombinedDatetime = (date, time) => {
  const hour = getHours(time)
  const minute = getMinutes(time)
  const second = getSeconds(time)
  const millisecond = getMilliseconds(time)

  return setMilliseconds(setSeconds(setMinutes(setHours(date, hour), minute), second), millisecond)
}

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24
export const timeFormats = {
  years: { tag: 'y', value: day * 365 },
  months: { tag: 'M', value: day * 30 },
  days: { tag: 'd', value: day },
  hours: { tag: 'h', value: hour },
  minutes: { tag: 'm', value: minute },
  seconds: { tag: 's', value: second },
}
