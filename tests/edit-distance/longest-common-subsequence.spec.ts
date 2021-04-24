import { getClosestWord, getClosestWords, getLongestCommonSubsequence } from '../../src/edit-distance/longest-common-subsequence'

describe(getLongestCommonSubsequence.name, () => {
  test.each([
    ['Hello', 'Hallo', false, 'Hllo'],
    ['HeLlO', 'Hallo', true, 'HLlO'],
    ['Hello', 'abc', true, '']
  ])('should get correct longest common subsequence for %p and %p', (one, two, ignoreCase, expectedLcs) => {
    const actual = getLongestCommonSubsequence(one, two, ignoreCase)

    expect(actual).toBe(expectedLcs)
  })

  it('get closest words', () => {
    const actual = getClosestWords('Hallo', 2, false, ['Hallo', 'Auto', 'Something else', 'Haribo'])

    expect(2).toBe(actual.length)
    expect('Hallo').toBe(actual[0])
    expect('Haribo').toBe(actual[1])
  })

  it('get closest word', () => {
    const actual = getClosestWord('Hallo', false, ['Hallo', 'Auto', 'Something else', 'Haribo'])

    expect(actual).toBeTruthy()
    expect('Hallo').toBe(actual!)
  })

  it('should return empty array when base word empty', () => {
    const actual = getClosestWords('', 1, false, ['Test'])

    expect(actual.length).toBe(0)
  })

  it('should return empty array when references words empty', () => {
    const actual = getClosestWords('Test', 1, false, [])

    expect(actual.length).toBe(0)
  })

  it('should return undefinded when no closest word', () => {
    const actual = getClosestWord('', false, ['test'])

    expect(actual).toBeUndefined()
  })
})
