import { format } from 'date-fns'

export const formatDate = (date: Date | null) => {
  return date ? format(date, 'dd.MM.yyyy') : ''
}
