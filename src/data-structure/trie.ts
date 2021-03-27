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
}
