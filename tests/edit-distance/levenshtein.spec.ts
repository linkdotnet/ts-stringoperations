import { getLevenshteinDistance } from '../../src/edit-distance/levenshtein'

describe(getLevenshteinDistance.name, () => {
  test.each([
    ['Hallo', 'Hello', false, 1],
    ['hALLO', 'Hello', true, 1],
    ['', 'Hello', false, 5],
    ['Hello', '', false, 5],
    ['olleH', 'Hello', false, 4],
    ['ABCDEF', 'abcdef', false, 6]
  ])('should get levenshtein distance for word %p and %p', (one, two, ignoreCase, expectedCost) => {
    const actual = getLevenshteinDistance(one, two, ignoreCase)

    expect(actual).toBe(expectedCost)
  })
})
