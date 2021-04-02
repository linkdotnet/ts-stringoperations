import { getHammingDistance } from '../../src/edit-distance/hamming-distance'

describe(getHammingDistance.name, () => {
  it('should get levenshtein distance', () => {
    [
      { one: 'Hallo', two: 'Hello', ignoreCase: false, expectedCost: 1 },
      { one: 'a', two: 'abc', ignoreCase: false, expectedCost: 0 },
      { one: 'abc', two: 'a', ignoreCase: false, expectedCost: 2 },
      { one: 'haLLo', two: 'Hello', ignoreCase: true, expectedCost: 1 }
    ].forEach(({ one, two, ignoreCase, expectedCost }) => {
      const actual = getHammingDistance(one, two, ignoreCase)

      expect(actual).toBe(expectedCost)
    })
  })
})
