# String Operations for TypeScript
![npm](https://img.shields.io/npm/dt/@linkdotnet/stringoperations)

This library implements some basic string algorithm as well as data structures for a better way of handling strings.

## How to install
`npm i @linkdotnet/stringoperations`

## How to use
### Trie
The following example shows how to import the trie and use it afterwards
```ts
import { Trie } from '@linkdotnet/stringoperations'

const trie = new Trie()
trie.addWord('Hello')
trie.addWord('Helsinki')
trie.addWord('World')
trie.contains('Hello') // true
trie.getWordsWithPrefix('Hel') // [ 'Hello', 'Helsinki' ]
```

### Edit-Distances
The following example shows how to use the edit-distances
```ts
import { getLongestCommonSubstring, getLevenshteinDistance } from '@linkdotnet/stringoperations'
const longestCommonSubstring = getLongestCommonSubstring('testapps', 'appicontest') // test
const distance = getLevenshteinDistance('Hello', 'Hallo') // 1
```

### Search
If you want to find all occurrences of a string use the `findAll` method. The function implements the Boyer-Moore algorithm with Bad-Character table.
```ts
import { contains, findAll } from '@linkdotnet/stringoperations'
const occurrences = findAll('Hello World. Goodbye World', 'World') // [ 6, 21 ]
const hasHit = contains('Hello World. Goodbye World', 'World') // true
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

## Search
 * Boyer-Moore