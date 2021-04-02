/**
 * Checks whether 'text' has an occurrence of 'word' 
 * @param text Text to look for the occurrences of 'word'
 * @param word Word to look for in 'text'
 * @param ignoreCase Ignore case, when comparing each character
 * @returns Returns true, if an occurence was found otherwise false
 */
export function contains (text: string, word: string, ignoreCase = false): boolean {
  return findAll(text, word, ignoreCase, true) !== []
}

/**
 * Finds all occurences of 'word' in 'text' and returns the indexes
 * @param text Text to look for the occurrences of 'word'
 * @param word Word to look for in 'text'
 * @param ignoreCase Ignore case, when comparing each character
 * @param abortOnFirstOccurrence If set to true, findAll will only return the first index instead of all
 * @returns Array of indexes. Empty if no occurrence was found
 */
export function findAll (text: string, word: string, ignoreCase = false, abortOnFirstOccurrence = false): number[] {
  if (text.length === 0 || word.length === 0) {
    return []
  }
  if (text.length < word.length) {
    return []
  }

  const wordLength = word.length
  const textLength = text.length

  const badCharacterTable = createBadCharacterTable(word, ignoreCase)
  let shift = 0
  const occurrences = []

  while (shift <= textLength - wordLength) {
    let index = word.length - 1

    index = reduceIndexWhileMatchAtShift(text, word, ignoreCase, index, shift)

    if (index < 0) {
      occurrences.push(shift)
      if (abortOnFirstOccurrence) {
        break
      }

      shift = shiftPatternToNextCharacterWithLastOccurrenceOfPattern(text, shift, wordLength, textLength, badCharacterTable, ignoreCase)
    } else {
      shift = shiftPatternAfterBadCharacter(text, shift, index, badCharacterTable, ignoreCase)
    }
  }

  return occurrences
}

function createBadCharacterTable (text: string, ignoreCase: boolean): number[] {
  const alphabetSize = 256
  const table: number[] = new Array(alphabetSize).fill(-1)

  for (let i = 0; i < text.length; i++) {
    const character = ignoreCase ? text[i].toUpperCase() : text[i]
    const asciiNumber = character.charCodeAt(0)
    table[asciiNumber] = i
  }

  return table
}

function reduceIndexWhileMatchAtShift (text: string, word: string, ignoreCase: boolean, index: number, shift: number): number {
  while (index >= 0 && isCharacterEqual(text, word, ignoreCase, shift + index, index)) {
    index--
  }

  return index
}

function isCharacterEqual (text: string, word: string, ignoreCase: boolean, positionInText: number, positionInWord: number): boolean {
  return ignoreCase ? text[positionInText].toUpperCase() === word[positionInWord].toUpperCase() : text[positionInText] === word[positionInWord]
}

function shiftPatternToNextCharacterWithLastOccurrenceOfPattern (text: string, shift: number, wordLength: number, textLength: number, badCharacterTable: number[], ignoreCase: boolean) {
  return shift + (shift + wordLength < textLength
    ? wordLength - badCharacterTable[getAsciiNumberFromText(text, shift + wordLength, ignoreCase)]
    : 1)
}

function getAsciiNumberFromText (text: string, position: number, ignoreCase: boolean): number {
  const character = ignoreCase ? text[position].toUpperCase() : text[position]
  return character.charCodeAt(0)
}

function shiftPatternAfterBadCharacter (text: string, shift: number, index: number, badCharacterTable: number[], ignoreCase: boolean): number {
  const character = getAsciiNumberFromText(text, shift + index, ignoreCase)
  return shift + Math.max(1, index - badCharacterTable[character])
}
