import { Rope } from '../../src/data-structure/rope'

describe(Rope.name, () => {
  it('should create string', () => {
    const text = 'That is my text'
    const rope = Rope.create(text, 4)

    expect(text).toBe(rope.toString())
  })

  it('should get index', () => {
    const rope = Rope.create('012345678', 2)

    expect('2').toBe(rope.charAt(2))
  })

  it('should concat strings and get correct string', () => {
    let rope = Rope.create('Hello')

    rope = rope.concatString('World')

    expect('HelloWorld').toBe(rope.toString())
  })

  it('should get charAt after concat', () => {
    const rope = Rope.create('01234').concatString('5678')

    expect('8').toBe(rope.charAt(8))
  })

  test.each([
    ['HelloWorld', 4, 'Hello', 'World'],
    ['HelloWorld', 5, 'HelloW', 'orld'],
    ['HelloWorld', 6, 'HelloWo', 'rld']
  ])('split word %p at index %p should return %p and %p', (word, index, expectedLeftSide, expectedRightSide) => {
    const rope = Rope.create(word)

    const values = rope.split(index)

    expect(values[0].toString()).toBe(expectedLeftSide)
    expect(values[1]!.toString()).toBe(expectedRightSide)
  })
})
