import { Trie } from '../../src/data-structure/trie'

describe(Trie.name, () => {
  it('should find words', () => {
    [
      { wordToAdd: 'csharp', wordToSearch: 'csharp', ignoreCase: false, expectedHit: true },
      { wordToAdd: 'cccc', wordToSearch: 'ccccc', ignoreCase: false, expectedHit: false },
      { wordToAdd: 'words', wordToSearch: 'word', ignoreCase: false, expectedHit: false },
      { wordToAdd: 'WOrd', wordToSearch: 'word', ignoreCase: false, expectedHit: false },
      { wordToAdd: 'WOrd', wordToSearch: 'word', ignoreCase: true, expectedHit: true }
    ].forEach(({ wordToAdd, wordToSearch, ignoreCase, expectedHit }) => {
      const trie = new Trie(ignoreCase)
      trie.addWord(wordToAdd)

      const actualHit = trie.contains(wordToSearch)

      expect(actualHit).toBe(expectedHit)
    })
  })
})