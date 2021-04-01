export class Trie {
  private children: { [key: string] : Trie } = {}
  private isLeaf: boolean = false

  // eslint-disable-next-line no-useless-constructor
  public constructor (private ignoreCase = false) { }

  /**
   * Adds a word to the trie
   * @param word Word to add to the trie
   */
  public addWord (word: string) {
    let current = this.children

    for (let i = 0; i < word.length; i++) {
      const currentCharacter = this.ignoreCase ? word[i].toUpperCase() : word[i]
      const node = this.createOrGetNode(currentCharacter, current)
      current = node.children

      if (i === word.length - 1) {
        node.isLeaf = true
      }
    }
  }

  /**
   * Check whether a word is contained in the trie
   * @param word Word to check whether it exists in the trie
   * @returns Returns true when the word is contained, otherwise false
   */
  public contains (word: string): boolean {
    if (word.length === 0) {
      return false
    }

    const node = this.findNode(word)

    return node !== undefined && node.isLeaf
  }

  /**
   * Determines whether this trie starts with the specified character
   * @param text Character to compare
   * @returns True, when the text matches the beginning of the trie, otherwise false
   */
  public startsWith (text: string): boolean {
    if (text.length === 0) {
      return false
    }

    return this.findNode(text) !== undefined
  }

  /**
   * Returns all words in the trie which starts with the given prefix
   * @param prefix Starting sequence which all returned words have to match
   * @returns All words in the trie which start with the given prefix
   */
  public getWordsWithPrefix (prefix: string): string[] {
    const node = this.findNode(prefix)
    if (!node) {
      return []
    }

    const results: string[] = []
    const prefixes = this.stringToCharArray(prefix)

    this.collect(node, prefixes, results)
    return results
  }

  /**
   * Deletes the word out of the trie
   * @param word Word to delete
   */
  public delete (word: string) {
    Trie.deleteInternal(this, word, 0)
  }

  private createOrGetNode (character: string, children: { [key: string] : Trie }): Trie {
    let node: Trie
    if (children[character] !== undefined) {
      node = children[character]
    } else {
      node = new Trie(this.ignoreCase)
      children[character] = node
    }

    return node
  }

  private findNode (word: string): Trie | undefined {
    let children = this.children
    let currentNode: Trie | undefined

    for (let i = 0; i < word.length; i++) {
      const currentCharacter = this.ignoreCase ? word[i].toUpperCase() : word[i]
      if (children[currentCharacter] !== undefined) {
        currentNode = children[currentCharacter]
        children = currentNode.children
      } else {
        return undefined
      }
    }

    return currentNode
  }

  private stringToCharArray (prefix: string) {
    const prefixes: string[] = []
    for (let i = 0; i < prefix.length; i++) {
      prefixes.push(prefix[i])
    }
    return prefixes
  }

  private collect (node: Trie, prefix: string[], results: string[]) {
    if (Object.keys(node.children).length === 0) {
      results.push(prefix.join(''))
      return
    }

    Object.keys(node.children).forEach(char => {
      prefix.push(char)
      this.collect(node.children[char], prefix, results)
      prefix.pop()
    })
  }

  private static deleteInternal (node: Trie | null, word: string, index: number): boolean {
    if (index === word.length) {
      node = null
    } else {
      const char = word[index]
      if (node?.children[char] && Trie.deleteInternal(node.children[char], word, index + 1)) {
        delete node.children[char]
      }
    }

    return node === null || (node !== null && Object.keys(node.children).length === 0)
  }
}
