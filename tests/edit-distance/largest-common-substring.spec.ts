import { getLargestCommonSubstring } from '../../src/edit-distance/largest-common-substring'

describe(getLargestCommonSubstring.name, () => {
  it('should get correct largest common substring', () => {
    [
      { one: 'ThatIsAWord', two: 'Word', ignoreCase: false, expectedLcs: 'Word' },
      { one: 'WordLonger', two: 'longerWord', ignoreCase: true, expectedLcs: 'Longer' },
      { one: 'Hello', two: 'abc', ignoreCase: false, expectedLcs: '' }
    ].forEach(({ one, two, ignoreCase, expectedLcs }) => {
      const actual = getLargestCommonSubstring(one, two, ignoreCase)

      expect(actual).toBe(expectedLcs)
    })
  })
})
