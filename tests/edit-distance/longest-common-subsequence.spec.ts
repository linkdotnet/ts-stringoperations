import { getLongestCommonSubsequence } from '../../src/edit-distance/longest-common-subsequence'

describe(getLongestCommonSubsequence.name, () => {
  it('should get correct longest common subsequence', () => {
    [
      { one: 'Hello', two: 'Hallo', ignoreCase: false, expectedLcs: 'Hllo' },
      { one: 'HeLlO', two: 'Hallo', ignoreCase: true, expectedLcs: 'HLlO' },
      { one: 'Hello', two: 'abc', ignoreCase: true, expectedLcs: '' }
    ].forEach(({ one, two, ignoreCase, expectedLcs }) => {
      const actual = getLongestCommonSubsequence(one, two, ignoreCase)

      expect(actual).toBe(expectedLcs)
    })
  })
})
