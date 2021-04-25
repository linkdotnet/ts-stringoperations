export class TernarySearchTrieNode<T = void> {
  public character: string | undefined;
  public value?: T;
  public left: TernarySearchTrieNode<T> | undefined;
  public middle: TernarySearchTrieNode<T> | undefined;
  public right: TernarySearchTrieNode<T> | undefined;
  public isLeaf: boolean = false;

  public constructor (character: string, value?: T) {
    this.character = character.charAt(0)
    if (character.length > 1) {
      this.middle = new TernarySearchTrieNode<T>(character.substr(1), value)
    } else {
      this.value = value
    }
  }

  public addWord (word: string, ignoreCase: boolean, value?: T) {
    const compare = TernarySearchTrieNode.compareTo(word.charAt(0), this.character!, ignoreCase)
    if (compare === 0) {
      if (word.length === 1) {
        this.value = value
      } else if (this.middle) {
        this.middle.addWord(word.substr(1), ignoreCase, value)
      } else {
        this.middle = new TernarySearchTrieNode<T>(word.substr(1), value)
      }
    } else if (compare < 0) {
      if (this.left) {
        this.left.addWord(word, ignoreCase, value)
      } else {
        this.left = new TernarySearchTrieNode<T>(word, value)
      }
    } else {
      if (this.right) {
        this.right.addWord(word, ignoreCase, value)
      } else {
        this.right = new TernarySearchTrieNode<T>(word, value)
      }
    }
  }

  private static compareTo (word: string, character: string, ignoreCase: boolean): number {
    return word.localeCompare(character, undefined, ignoreCase ? { sensitivity: 'accent' } : {})
  }
}
