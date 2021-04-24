import { contains, findAll } from '../../src/search/boyer-moore'

describe(findAll.name, () => {
  it('should find all occurrences', () => {
    const text = 'That is my text with the word text 3 times. That is why text again'
    const pattern = 'Text'

    const occurrences = findAll(text, pattern, true)

    expect(3).toBe(occurrences.length)
    expect(11).toBe(occurrences[0])
    expect(30).toBe(occurrences[1])
    expect(56).toBe(occurrences[2])
  })

  it('should not go out of bounds', () => {
    const text = 'The quick brown fox jumps over the lazy dog maybe also a cat a sheep and another dog'
    const pattern = 'dog'

    const occurrences = findAll(text, pattern)

    expect(2).toBe(occurrences.length)
  })

  it('should abort on first occurrence', () => {
    const text = 'That is my text with the word text 3 times. That is why text again'
    const pattern = 'Text'

    const occurrences = findAll(text, pattern, true, true)

    expect(1).toBe(occurrences.length)
    expect(11).toBe(occurrences[0])
  })

  it('given no hit then empty array', () => {
    const text = 'abc'
    const pattern = 'z'

    const occurrences = findAll(text, pattern)

    expect(0).toBe(occurrences.length)
  })

  it('given pattern longer than text, then empty array', () => {
    const text = 'a'
    const pattern = 'abc'

    const occurrences = findAll(text, pattern)

    expect(0).toBe(occurrences.length)
  })

  it('should return no matches when text is empty', () => {
    const occurrences = findAll('', 'pattern')

    expect(0).toBe(occurrences.length)
  })

  it('should return no matches when pattern is empty', () => {
    const occurrences = findAll('text', '')

    expect(0).toBe(occurrences.length)
  })

  it('should return if an occurrence was found', () => {
    const actualHit = contains('That is my text', 'text')

    expect(actualHit).toBeTruthy()
  })
})
