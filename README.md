# String Operations for TypeScript
![npm](https://img.shields.io/npm/dt/@linkdotnet/stringoperations)

This library implements some basic string algorithm as well as data structures for a better way of handling strings.

## How to install
`npm i @linkdotnet/stringoperations`

## How to use
```ts
import { Trie, getLongestCommonSubstring, getLevenshteinDistance } from '@linkdotnet/stringoperations'

const trie = new Trie()
trie.addWord('Hello')
trie.addWord('Helsinki')
trie.addWord('World')
trie.contains('Hello') // true
trie.getWordsWithPrefix('Hel') // [ 'Hello', 'Helsinki' ]

const longestCommonSubstring = getLongestCommonSubstring('testapps', 'appicontest') // test
const distance = getLevenshteinDistance('Hello', 'Hallo') // 1
```

## Currently implemented algorithms
### Edit-Distances
 * Longest Common Subsequence
 * Longest Common Substring
 * Levenshtein Distance
 * Hamming Distance

## Data-Structures
 * Trie
 * Rope (in development)