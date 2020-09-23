export const roundNumber = (value?: number) => {
  if (!value) {
    return 0
  }
  return Math.ceil(value)
}
