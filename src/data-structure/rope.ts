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
      this.checkRecalculation()

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
    public concatRope (other: Rope | undefined, recalculateWeights = false): Rope {
      const newRope = new Rope()
      newRope.left = this
      newRope.right = other
      newRope.hasToRecaluclateWeights = true

      if (recalculateWeights) {
        this.checkRecalculation()
      }

      return newRope
    }

    /**
     * Splits the rope into two new ones at the defined index
     * @param index Zero based index where the rope should be split. The index is always part of the left side of the rope
     */
    public split (index: number): [Rope, Rope | undefined] {
      if (index < 0) {
        throw new RangeError('Index was negative')
      }

      this.checkRecalculation()

      return Rope.splitRope(this, index)
    }

    /**
     * Inserts another rope into the current one and returns the merger
     * @param rope New rope to add to the current one
     * @param index Zero based index where the new rope has to be inserted
     * @returns The merged rope
     */
    public insert (rope: Rope, index: number): Rope {
      const pair = this.split(index)
      const left = pair[0].concatRope(rope)
      return left.concatRope(pair[1])
    }

    /**
     * Inserts a string into the current rope and returns the merger
     * @param rope New rope to add to the current one
     * @param index Zero based index where the new rope has to be inserted
     * @returns The merged rope
     */
    public insertString (text: string, index: number): Rope {
      return this.insert(Rope.create(text), index)
    }

    /**
     * Deletes a substring from the rope
     * @param startIndex Inclusive starting index
     * @param length Length to delete
     * @returns New rope with deleted range
     */
    public delete (startIndex: number, length: number): Rope {
      if (startIndex < 0) {
        throw new RangeError('Index was negative')
      }

      if (length <= 0) {
        throw new RangeError('Length has to be at least 1')
      }

      this.checkRecalculation()

      const beforeStartIndex = this.split(startIndex - 1)[0]
      const afterEndIndex = this.split(startIndex + length - 1)[1]

      return beforeStartIndex.concatRope(afterEndIndex)
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

    private static splitRope (node: Rope, index: number): [Rope, Rope | undefined] {
      if (!node.left) {
        if (index === node.weight - 1) {
          return [node, undefined]
        }

        const item1 = Rope.create(node.fragment.slice(0, index + 1))
        const item2 = Rope.create(node.fragment.slice(index + 1, node.weight))
        return [item1, item2]
      }

      if (index === node.weight - 1) {
        return [node.left, node.right]
      }

      if (index < node.weight) {
        const splitLeftSide = Rope.splitRope(node.left, index)
        return [splitLeftSide[0], splitLeftSide[1]!.concatRope(node.right!)]
      }

      const splitRightSide = Rope.splitRope(node.right!, index - node.weight)
      return [node.left.concatRope(splitRightSide[0]), splitRightSide[1]]
    }

    private calculateAndSetWeight () {
      this.weight = this.left === undefined ? this.fragment.length : Rope.getWeightInternal(this.left)
    }

    private checkRecalculation () {
      if (this.hasToRecaluclateWeights) {
        this.calculateAndSetWeight()
        this.hasToRecaluclateWeights = false
      }
    }
}
