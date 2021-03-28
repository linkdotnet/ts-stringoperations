export class Trie {
  private children: { [key: string] : Trie } = {}
  private isLeaf: boolean = false

  // eslint-disable-next-line no-useless-constructor
  public constructor (private ignoreCase = false) { }

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

  public contains (word: string): boolean {
    if (word.length === 0) {
      return false
    }

    const node = this.findNode(word)

    return node !== undefined && node.isLeaf
  }

  public startsWith (text: string): boolean {
    if (text.length === 0) {
      return false
    }

    return this.findNode(text) !== undefined
  }

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

  private stringToCharArray(prefix: string) {
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
}
