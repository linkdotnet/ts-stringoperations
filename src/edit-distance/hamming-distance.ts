/**
 *
 * @param one First word to compare
 * @param two Second word to compare
 * @param ignoreCase Ignore case, when comparing each character
 */
export function getHammingDistance (one: string, two: string, ignoreCase = false) {
  let difference = 0
  for (let i = 0; i < one.length; i++) {
    const characterEqual = ignoreCase ? one[i].toUpperCase() === two[i].toUpperCase() : one[i] === two[i]
    if (!characterEqual) {
      difference++
    }
  }

  return difference
}
