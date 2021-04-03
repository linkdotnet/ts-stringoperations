/**
 * Represents a rope
 */
export class Rope {
    private fragment: string
    private hasToRecaluclateWeights: boolean
    private left: Rope | undefined
    private right: Rope | undefined
    private weight: number

    private constructor () {
      this.left = undefined
      this.right = undefined
      this.hasToRecaluclateWeights = false
      this.fragment = ''
      this.weight = 0
    }

    /**
     * Returns the character at the given index
     * @param index The zero-based index of the desired character.
     * @returns Returns the character at the specified index.
     */
    public charAt (index: number): string {
      if (this.hasToRecaluclateWeights) {
        this.calculateAndSetWeight()
      }

      return Rope.charAtInternal(this, index)
    }

    /**
     * Represents the rope as a single string
     * @returns The whole rope as string
     */
    public toString (): string {
      const results: string[] = []
      Rope.getStrings(this, results)
      return results.join('')
    }

    /**
     * Concats a string to the rope and returns the new rope
     * @param other Other string which will be appended to the rope
     * @param recalculateWeights If set to true the weights of the new rope will be calculated immediately
     * @returns New rope instance with both texts
     * @remarks If concating a lot of strings, setting recalculateWeights to true is very expensive.
     * Operations which require the calculated weight will check if a recalculation is needed.
     * ```ts
     * for (let i = 0; i < 10000; i++) {
     *   newRope = newRope.concat('test', false)
     * }
     * newRope.charAt(2) // This will automatically recalculate the weight
     * ```
     */
    public concatString (other: string, recalculateWeights = false): Rope {
      const otherRope = Rope.create(other)
      return this.concatRope(otherRope, recalculateWeights)
    }

    /**
     * Concats a rope to the current one and returns the new combined rope
     * @param other Other string which will be appended to the rope
     * @param recalculateWeights If set to true the weights of the new rope will be calculated immediately
     * @returns New rope instance with both texts
     * @remarks If concating a lot of strings, setting recalculateWeights to true is very expensive.
     * Operations which require the calculated weight will check if a recalculation is needed.
     * ```ts
     * for (let i = 0; i < 10000; i++) {
     *   newRope = newRope.concat('test', false)
     * }
     * newRope.charAt(2) // This will automatically recalculate the weight
     * ```
     */
    public concatRope (other: Rope, recalculateWeights = false): Rope {
      const newRope = new Rope()
      newRope.left = this
      newRope.right = other
      newRope.hasToRecaluclateWeights = true

      if (recalculateWeights) {
        newRope.calculateAndSetWeight()
      }

      return newRope
    }

    /**
     * Creates the rope with the given text
     * @param text The initial text to add in the rope
     * @param leafLength Size of a single leaf. Every leaf is a substring of the given text
     * @returns Instance of a rope
     */
    public static create (text: string, leafLength = 8): Rope {
      return this.createInternal(text, leafLength, 0, text.length - 1)
    }

    private static createInternal (text: string, leafLength: number, leftIndex: number, rightIndex: number): Rope {
      const node = new Rope()

      if (rightIndex - leftIndex > leafLength) {
        const center = (rightIndex + leftIndex + 1) / 2
        node.left = Rope.createInternal(text, leafLength, leftIndex, center)
        node.right = Rope.createInternal(text, leafLength, center + 1, rightIndex)
      } else {
        node.fragment = text.slice(leftIndex, rightIndex + 1)
      }

      node.calculateAndSetWeight()

      return node
    }

    private static getWeightInternal (node: Rope): number {
      if (node.left !== undefined && node.right !== undefined) {
        return this.getWeightInternal(node.left) + this.getWeightInternal(node.right)
      }

      return node.left !== undefined ? this.getWeightInternal(node.left) : node.fragment.length
    }

    private static charAtInternal (node: Rope, index: number): string {
      if (node.weight <= index && node.right) {
        return Rope.charAtInternal(node.right, index - node.weight)
      }

      if (node.left) {
        return Rope.charAtInternal(node.left, index)
      }

      return node.fragment[index]
    }

    private calculateAndSetWeight () {
      this.weight = this.left === undefined ? this.fragment.length : Rope.getWeightInternal(this.left)
    }

    private static getStrings (node: Rope, results: string[]) {
      if (!node) {
        return
      }

      if (!node.left && !node.right) {
        results.push(node.fragment)
      }

      Rope.getStrings(node.left!, results)
      Rope.getStrings(node.right!, results)
    }
}
