import { getLongestCommonSubstring } from '../../src/edit-distance/longest-common-substring'

describe(getLongestCommonSubstring.name, () => {
  test.each([
    ['ThatIsAWord', 'Word', false, 'Word'],
    ['WordLonger', 'longerWord', true, 'Longer'],
    ['Words', 'Worder', true, 'Word'],
    ['testapps', 'appicontest', true, 'test'],
    ['Hello', 'abc', false, '']
  ])('should get correct longest common substring for %p and %p', (one, two, ignoreCase, expectedLcs) => {
    const actual = getLongestCommonSubstring(one, two, ignoreCase)

    expect(actual).toBe(expectedLcs)
  })
})
