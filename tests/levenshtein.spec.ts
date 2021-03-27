import { getLevenshteinDistance } from '../src/edit-distance/levenshtein'

describe(getLevenshteinDistance.name, () => {
  it('should get levenshtein distance', () => {
    [
      { one: 'Hallo', two: 'Hello', ignoreCase: false, expectedCost: 1 },
      { one: 'hALLO', two: 'Hello', ignoreCase: true, expectedCost: 1 },
      { one: '', two: 'Hello', ignoreCase: false, expectedCost: 5 },
      { one: 'Hello', two: '', ignoreCase: false, expectedCost: 5 },
      { one: 'olleH', two: 'Hello', ignoreCase: false, expectedCost: 4 },
      { one: 'ABCDEF', two: 'abcdef', ignoreCase: false, expectedCost: 6 }
    ].forEach(({ one, two, ignoreCase, expectedCost }) => {
      const actual = getLevenshteinDistance(one, two, ignoreCase)

      expect(actual).toBe(expectedCost)
    })
  })
})
