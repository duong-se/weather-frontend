const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Staturday']

export const getDay = (value?: string): string => {
  if (!value) {
    return ''
  }
  const date = new Date(value)
  const dayIndex = date.getDay()
  return daysInWeek[dayIndex]
}
