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

    public charAt (index: number): string {
      if (this.hasToRecaluclateWeights) {
        this.CalculateAndSetWeight()
      }

      return Rope.charAtInternal(this, index)
    }

    public toString (): string {
      const results: string[] = []
      Rope.getStrings(this, results)
      return results.join('')
    }

    public static Create (text: string, leafLength = 8): Rope {
      return this.CreateInternal(text, leafLength, 0, text.length - 1)
    }

    private static CreateInternal (text: string, leafLength: number, leftIndex: number, rightIndex: number): Rope {
      const node = new Rope()

      if (rightIndex - leftIndex > leafLength) {
        const center = (rightIndex + leftIndex + 1) / 2
        node.left = this.CreateInternal(text, leafLength, leftIndex, center)
        node.right = this.CreateInternal(text, leafLength, center + 1, rightIndex)
      } else {
        node.fragment = text.substr(leftIndex, rightIndex - leftIndex)
      }

      node.CalculateAndSetWeight()

      return node
    }

    private static GetWeightInternal (node: Rope): number {
      if (node.left !== undefined && node.right !== undefined) {
        return this.GetWeightInternal(node.left) + this.GetWeightInternal(node.right)
      }

      return node.left !== undefined ? this.GetWeightInternal(node.left) : node.fragment.length
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

    private CalculateAndSetWeight () {
      this.weight = this.left === undefined ? this.fragment.length : Rope.GetWeightInternal(this.left)
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
