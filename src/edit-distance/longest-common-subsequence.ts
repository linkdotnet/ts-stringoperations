export function getClosestWord (base: string, ignoreCase: boolean, words: string[]): string | undefined {
  const closestWords = getClosestWords(base, 1, ignoreCase, words)

  if (closestWords.length === 0) {
    return undefined
  }

  return closestWords[0]
}

export function getClosestWords (base: string, count: number, ignoreCase: boolean, words: string[]): string[] {
  if (base.length === 0) {
    return []
  }

  if (!words || words.length === 0) {
    return []
  }

  const wordToSimiliarity: { [key: string] : number } = {}
  for (let i = 0; i < words.length; i++) {
    wordToSimiliarity[words[i]] = getLongestCommonSubsequence(base, words[i], ignoreCase).length
  }

  const sorted = Object.entries(wordToSimiliarity).sort((a, b) => {
    return b[1] - a[1]
  })

  return sorted.map(v => v[0]).slice(0, count)
}

/**
 * Computes and returns the longest common subsequence of two strings
 * @param one First string
 * @param two Second string
 * @param ignoreCase If true, the string compares ignoring the case. So 'd' and 'D' would match
 * @returns Longest common subsequence
 * @remarks If ignoreCase is true, the casing of one will be returned as longest common subsequence.
 * If word one is 'HeLlO' and word two is 'Hallo' then 'HLlO' will be returned
 */
export function getLongestCommonSubsequence (one: string, two: string, ignoreCase = false): string {
  const lcsMatrix = createLongestCommonSubsequenceMatrix(one, two, ignoreCase)
  return getLongestCommonSubsequenceBackTrack(lcsMatrix, one, two, one.length, two.length, ignoreCase)
}

function createLongestCommonSubsequenceMatrix (one: string, two: string, ignoreCase: boolean): number[][] {
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
