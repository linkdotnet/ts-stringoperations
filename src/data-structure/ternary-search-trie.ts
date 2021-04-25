import { TernarySearchTrieNode } from './ternary-search-trie-node'

export class TernarySearchTrie<T = void> {
  private root: TernarySearchTrieNode<T> | undefined

  // eslint-disable-next-line no-useless-constructor
  public constructor (private ignoreCase = false) {}

  public addWord (word: string, value?: T) {
    if (word.length === 0) {
      return
    }

    if (!this.root) {
      this.root = new TernarySearchTrieNode<T>(word, value)
    }

    this.root.addWord(word, this.ignoreCase, value)
  }

  public test (): boolean | T {
    return this.root?.value ? this.root.value : true
  }
}
