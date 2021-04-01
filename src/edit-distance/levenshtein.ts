/**
 * Calculates the Levenshtein distance of two given strings
 * @param one First word
 * @param two Second word
 * @param ignoreCase Ignore case, when comparing each character
 * @param substitutionCost Cost of a substitution. Per default set to 1
 * @param abortCost If abortCost is met, the function will immediately return (with abortCost as return value) 
 * @returns Levenshtein distance
 */
export function getLevenshteinDistance (one: string, two: string, ignoreCase = false, substitutionCost = 1, abortCost = Number.MAX_SAFE_INTEGER): number {
  if (one.length === 0) {
    return two.length
  }
  if (two.length === 0) {
    return one.length
  }

  const matrix = createLevenshteinMatrix(one, two)

  for (let i = 1; i <= one.length; i++) {
    for (let j = 1; j <= two.length; j++) {
      const characterEqual = ignoreCase
        ? one[i - 1].toUpperCase() === two[j - 1].toUpperCase()
        : one[i - 1] === two[j - 1]

      const substituteCost = characterEqual ? 0 : substitutionCost
      const deleteCost = matrix[i - 1][j] + 1
      const insertCost = matrix[i][j - 1] + 1
      const completeSubstitutionCost = matrix[i - 1][j - 1] + substituteCost

      matrix[i][j] = Math.min(deleteCost, insertCost, completeSubstitutionCost)

      if (matrix[i][j] >= abortCost) {
        return abortCost
      }
    }
  }

  return matrix[one.length][two.length]
}

function createLevenshteinMatrix (one: string, two: string): number[][] {
  const matrix: number[][] = new Array(one.length + 1).fill(0).map(() => new Array(two.length + 1).fill(0))

  for (let i = 0; i < one.length; i++) {
    matrix[i][0] = i
  }

  for (let j = 0; j < one.length; j++) {
    matrix[0][j] = j
  }

  return matrix
}
