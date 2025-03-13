export function formatDate(isoString) {
  if (!isoString || isoString.startsWith('0001')) return 'Неверная дата'

  const date = new Date(isoString)
  if (isNaN(date)) return 'Неверная дата'

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear())

  return `${day}.${month}.${year}`
}

export function dateDifference(date1, date2 = new Date()) {
  if (!date1) return ''

  const d1 = new Date(date1)
  const d2 = new Date(date2)

  const diffTime = Math.abs(d2 - d1)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}

export function formatExperience(days) {
  if (!days || days < 0) return '0 месяцев'

  const years = Math.floor(days / 365)
  const months = Math.floor((days % 365) / 30)

  if (years > 0 && months > 0) {
    return `${years} ${years === 1 ? 'год' : years < 5 ? 'года' : 'лет'} ${months} ${months === 1 ? 'месяц' : 'месяца'}`
  } else if (years > 0) {
    return `${years} ${years === 1 ? 'год' : years < 5 ? 'года' : 'лет'}`
  } else {
    return `${months} ${months === 1 ? 'месяц' : 'месяца'}`
  }
}