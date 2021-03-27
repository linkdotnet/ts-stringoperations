# String Operations for TypeScript
This library implements some basic string algorithm as well as data structures for a better way of handling strings.

## How to install
`npm i @linkdotnet/stringoperations`

## How to use
```ts
import { Trie, getLargestCommonSubstring } from '@linkdotnet/stringoperations'

const trie = new Trie()
trie.addWord('Hello')
trie.addWord('World')
trie.contains('Hello') // true

const largestCommonSubstring = getLargestCommonSubstring('testapps', 'appicontest') // test
```

## Currently implemented algorithms
### Edit-Distances
 * Largest Common Subsequence
 * Largest Common Substring
 * Levenshtein Distance

## Data-Structures
 * Trie
 * Rope