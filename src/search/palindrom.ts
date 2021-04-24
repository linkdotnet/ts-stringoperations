export function isPalindrom (word: string, ignoreCase = false): boolean {
  if (word.length === 0) {
    return false
  }

  for (let i = 0; i < word.length / 2; i++) {
    const left = ignoreCase ? word.charAt(i).toUpperCase() : word.charAt(i)
    const right = ignoreCase ? word.charAt(word.length - 1 - i).toUpperCase() : word.charAt(word.length - 1 - i)
    if (left !== right) {
      return false
    }
  }

  return true
}
