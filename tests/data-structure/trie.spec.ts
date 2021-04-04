import { Trie } from '../../src/data-structure/trie'

describe(Trie.name, () => {
  test.each([
    ['csharp', 'csharp', false, true],
    ['cccc', 'ccccc', false, false],
    ['words', 'word', false, false],
    ['WOrd', 'word', false, false],
    ['WOrd', 'word', true, true]
  ])('Given word %p when looking for word %p (case sensitive: %p) then actualHit %p',
    (wordToAdd, wordToSearch, ignoreCase, expectedHit) => {
      const trie = new Trie(ignoreCase)
      trie.addWord(wordToAdd)

      const actualHit = trie.contains(wordToSearch)

      expect(actualHit).toBe(expectedHit)
    })

  it('should not find substrings', () => {
    const trie = new Trie()
    trie.addWord('abcde')
    trie.addWord('abcdefg')
    trie.addWord('efgh')

    const actualHit = trie.contains('efg')

    expect(actualHit).toBe(false)
  })

  it('should find startswith', () => {
    const trie = new Trie()
    trie.addWord('abcde')

    const actualHit = trie.startsWith('abc')

    expect(actualHit).toBe(true)
  })

  it('should get all keys with prefix', () => {
    const trie = new Trie()
    trie.addWord('Hello')
    trie.addWord('Melone')
    trie.addWord('Helsinki')

    const actualHits = trie.getWordsWithPrefix('Hel')

    expect(2).toBe(actualHits.length)
  })

  it('should delete word in trie', () => {
    const trie = new Trie()
    trie.addWord('Hello')
    trie.addWord('Melone')

    trie.delete('Hello')

    expect(false).toBe(trie.contains('Hello'))
  })

  it('should only delete word in trie when whole sequence matches', () => {
    const trie = new Trie()
    trie.addWord('Hello')

    trie.delete('Hallo')

    expect(true).toBe(trie.contains('Hello'))
  })
})
