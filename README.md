# String Operations for TypeScript
![npm](https://img.shields.io/npm/dt/@linkdotnet/stringoperations)

This library implements some basic string algorithm as well as data structures for a better way of handling strings.

## How to install
`npm i @linkdotnet/stringoperations`

## How to use
```ts
import { Trie, getLargestCommonSubstring, getLevenshteinDistance } from '@linkdotnet/stringoperations'

const trie = new Trie()
trie.addWord('Hello')
trie.addWord('Helsinki')
trie.addWord('World')
trie.contains('Hello') // true
trie.getWordsWithPrefix('Hel') // [ 'Hello', 'Helsinki' ]

const largestCommonSubstring = getLargestCommonSubstring('testapps', 'appicontest') // test
const distance = getLevenshteinDistance('Hello', 'Hallo') // 1
```

## Currently implemented algorithms
### Edit-Distances
 * Largest Common Subsequence
 * Largest Common Substring
 * Levenshtein Distance

## Data-Structures
 * Trie
 * Rope