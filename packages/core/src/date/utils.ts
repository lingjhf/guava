import dayjs from 'dayjs'

export enum Week {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export function generateWeekDays(firstWeekDay: Week = Week.Sunday) {
  const days: Week[] = []
  let weekDay = firstWeekDay
  while (days.length < 7) {
    days.push(weekDay)
    weekDay += 1
    if (weekDay > Week.Saturday) {
      weekDay = Week.Sunday
    }
  }
  return days
}

export function generateDays(currentDay: dayjs.Dayjs = dayjs(), firstWeekDay: Week = Week.Sunday): dayjs.Dayjs[] {
  const days: dayjs.Dayjs[] = []
  const day1 = dayjs()
    .set('year', currentDay.year())
    .set('month', currentDay.month())
    .set('date', 1)
  if (day1.day() !== firstWeekDay) {
    let prevDay = day1
    while (true) {
      prevDay = prevDay.subtract(1, 'day')
      days.unshift(prevDay)
      if (prevDay.day() === firstWeekDay) {
        break
      }
    }
  }
  let nextDay = day1
  while (true) {
    if (nextDay.month() !== day1.month() && nextDay.day() === firstWeekDay) {
      break
    }
    days.push(nextDay)
    nextDay = nextDay.add(1, 'day')
  }
  return days
}

export function isWeekend(date: dayjs.Dayjs) {
  return date.day() === Week.Saturday || date.day() === Week.Sunday
}