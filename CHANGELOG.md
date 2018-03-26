# Chenge log

### v1.0.4
 1. Fixed some mistakes in the readme.
 2. Rewrote `loopThroughKeys()` to use 2 for-of loops instead of one for loop; (1) loop for key-value pairs, (2) loop for keys only.
There is no need to re-chech whether I need to return a KVP, this setting does not change in a middle of a loop.
 3. Rewrote `getNext()` to use 2 for-in loops so I don't have to extract all keys at once.

### v1.0.3 
 Added README.md to the npm package.

### v1.0.2 
 Changed `getNext()` function to use the `loopThroughKeys()` function (the same as function `getNextAsc()` and `getNextDesc()` use).

### v1.0.1 
 Fixed a bug where the sorting was reverced.

### v1.0.0 
 Initial commit.