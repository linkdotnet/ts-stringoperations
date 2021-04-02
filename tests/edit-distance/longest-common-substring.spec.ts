import { getLongestCommonSubstring } from '../../src/edit-distance/longest-common-substring'

describe(getLongestCommonSubstring.name, () => {
  it('should get correct longest common substring', () => {
    [
      { one: 'ThatIsAWord', two: 'Word', ignoreCase: false, expectedLcs: 'Word' },
      { one: 'WordLonger', two: 'longerWord', ignoreCase: true, expectedLcs: 'Longer' },
      { one: 'Words', two: 'Worder', ignoreCase: true, expectedLcs: 'Word' },
      { one: 'testapps', two: 'appicontest', ignoreCase: true, expectedLcs: 'test' },
      { one: 'Hello', two: 'abc', ignoreCase: false, expectedLcs: '' }
    ].forEach(({ one, two, ignoreCase, expectedLcs }) => {
      const actual = getLongestCommonSubstring(one, two, ignoreCase)

      expect(actual).toBe(expectedLcs)
    })
  })
})
