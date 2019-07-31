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
