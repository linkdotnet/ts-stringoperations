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

    private CalculateAndSetWeight() {
      this.weight = this.left === undefined ? this.fragment.length : Rope.GetWeightInternal(this.left)
    }
}