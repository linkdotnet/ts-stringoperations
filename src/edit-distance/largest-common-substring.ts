/**
 * Gets the largest common substring of two given strings
 * @param one First word
 * @param two Second word
 * @param ignoreCase If true, the string compares ignoring the case. So 'd' and 'D' would match
 * @returns Largest common substring
 * @remarks If ignoreCase is true, the casing of one will be returned as largest common substring.
 * If word one is 'typeSCRIPT' and word two is 'JAVAscript' then 'SCRIPT' will be returned
 */
export function getLargestCommonSubstring (one: string, two: string, ignoreCase = false) {
  const lcsMatrix = getLargestCommonSubstringMatrix(one, two, ignoreCase)

  let length = -1
  let index = -1

  for (let i = 0; i <= one.length; i++) {
    for (let j = 0; j <= two.length; j++) {
      if (length < lcsMatrix[i][j]) {
        length = lcsMatrix[i][j]
        index = i - length
      }
    }
  }

  return length > 0 ? one.substr(index, length) : ''
}

function getLargestCommonSubstringMatrix (one: string, two: string, ignoreCase: boolean): number[][] {
  const lcsMatrix: number[][] = new Array(one.length + 1).fill(0).map(() => new Array(two.length + 1).fill(0))

  for (let i = 1; i <= one.length; i++) {
    for (let j = 1; j <= two.length; j++) {
      const characterEqual = ignoreCase
        ? one[i - 1].toUpperCase() === two[j - 1].toUpperCase()
        : one[i - 1] === two[j - 1]

      if (characterEqual) {
        lcsMatrix[i][j] = lcsMatrix[i - 1][j - 1] + 1
      }
    }
  }

  return lcsMatrix
}
