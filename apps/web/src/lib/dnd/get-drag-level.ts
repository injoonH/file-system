export function getDragLevel(offset: number, indentWidth: number) {
  return Math.round(offset / indentWidth)
}
