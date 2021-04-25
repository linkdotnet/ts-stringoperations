import { TernarySearchTrie } from '../../src/data-structure/ternary-search-trie'

describe(TernarySearchTrie.name, () => {
  it('Do', () => {
    const t = new TernarySearchTrie<number>()

    t.addWord('cute')
    t.addWord('cup')
    t.addWord('at')
    t.addWord('as')
    t.addWord('he')
    t.addWord('us')
    t.addWord('i')
  })
})
