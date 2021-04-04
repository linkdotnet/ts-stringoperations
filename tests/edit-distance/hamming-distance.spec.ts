import { getHammingDistance } from '../../src/edit-distance/hamming-distance'

describe(getHammingDistance.name, () => {
  test.each([
    ['Hallo', 'Hello', false, 1],
    ['a', 'abc', false, 0],
    ['abc', 'a', false, 2],
    ['haLLo', 'Hello', true, 1]
  ])('should get hamming distance for words %p and %p', (one, two, ignoreCase, expectedCost) => {
    const actual = getHammingDistance(one, two, ignoreCase)

    expect(actual).toBe(expectedCost)
  })
})
