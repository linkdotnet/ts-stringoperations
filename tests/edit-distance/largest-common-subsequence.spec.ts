import { getLargestCommonSubsequence } from '../../src/edit-distance/largest-common-subsequence'

describe(getLargestCommonSubsequence.name, () => {
  it('should get correct largest common subsequence', () => {
    [
      { one: 'Hello', two: 'Hallo', ignoreCase: false, expectedLcs: 'Hllo' },
      { one: 'HeLlO', two: 'Hallo', ignoreCase: true, expectedLcs: 'HLlO' },
      { one: 'Hello', two: 'abc', ignoreCase: true, expectedLcs: '' }
    ].forEach(({ one, two, ignoreCase, expectedLcs }) => {
      const actual = getLargestCommonSubsequence(one, two, ignoreCase)

      expect(actual).toBe(expectedLcs)
    })
  })
})
