import { isPalindrom } from '../../src/search/palindrom'

describe(isPalindrom.name, () => {
  test.each([
    ['abcba', false, true],
    ['aa', false, true],
    ['aA', true, true],
    ['aA', false, false],
    ['aaba', false, false],
    ['aAa', false, true],
    ['121', false, true]
  ])('Check if %p (ignore case: %p) is palindrom', (word, ignoreCase, expectedPalindrom) => {
    const actual = isPalindrom(word, ignoreCase)

    expect(actual).toBe(expectedPalindrom)
  })

  it('Should return false for empty word', () => {
    const actual = isPalindrom('')

    expect(actual).toBeFalsy()
  })
})
