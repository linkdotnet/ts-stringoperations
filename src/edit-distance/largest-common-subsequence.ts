/**
 * Computes and returns the largest common subsequence of two strings
 * @param one First string
 * @param two Second string
 * @param ignoreCase If true, the string compares ignoring the case. So 'd' and 'D' would match
 * @returns Largest common subsequence
 * @remarks If ignoreCase is true, the casing of one will be returned as largest common subsequence.
 * If word one is 'HeLlO' and word two is 'Hallo' then 'HLlO' will be returned
 */
export function getLargestCommonSubsequence (one: string, two: string, ignoreCase = false): string {
  const lcsMatrix = createLargestCommonSubsequenceMatrix(one, two, ignoreCase)
  return getLongestCommonSubsequenceBackTrack(lcsMatrix, one, two, one.length, two.length, ignoreCase)
}

function createLargestCommonSubsequenceMatrix (one: string, two: string, ignoreCase: boolean): number[][] {
  const lcsMatrix: number[][] = new Array(one.length + 1).fill(0).map(() => new Array(two.length + 1).fill(0))

  for (let i = 1; i <= one.length; i++) {
    for (let j = 1; j <= two.length; j++) {
      const characterEqual = ignoreCase
        ? one[i - 1].toUpperCase() === two[j - 1].toUpperCase()
        : one[i - 1] === two[j - 1]

      if (characterEqual) {
        lcsMatrix[i][j] = lcsMatrix[i - 1][j - 1] + 1
      } else {
        lcsMatrix[i][j] = Math.max(lcsMatrix[i - 1][j], lcsMatrix[i][j - 1])
      }
    }
  }

  return lcsMatrix
}

function getLongestCommonSubsequenceBackTrack (lcsMatrix: number[][], one: string, two: string, oneLength: number, twoLength: number, ignoreCase: boolean): string {
  if (oneLength === 0 || twoLength === 0) {
    return ''
  }

  const characterEqual = ignoreCase
    ? one[oneLength - 1].toUpperCase() === two[twoLength - 1].toUpperCase()
    : one[oneLength - 1] === two[twoLength - 1]

  if (characterEqual) {
    return getLongestCommonSubsequenceBackTrack(lcsMatrix, one, two, oneLength - 1, twoLength - 1, ignoreCase) + one[oneLength - 1]
  }

  if (lcsMatrix[oneLength][twoLength - 1] > lcsMatrix[oneLength - 1][twoLength]) {
    return getLongestCommonSubsequenceBackTrack(lcsMatrix, one, two, oneLength, twoLength - 1, ignoreCase)
  }

  return getLongestCommonSubsequenceBackTrack(lcsMatrix, one, two, oneLength - 1, twoLength, ignoreCase)
}
