# Change log

### v2.0.1

 1. Removed redundant keyword `function` in the getter and the setter
 2. Compiled to es2022.

### v2.0.0

 1. **API changes:** _(1)_ `decorateIterableObject()` function replaces the `IterableObjectDecorator` class with its 
 `decorate` static function. _(2)_ `returnKvp` and `dir` (the sorting direction) parameters are now switched places. 
 The sorting direction is seems to be more useful and important parameter so it comes first now.
 2. The code was reworked so some similar part from the decorator was moved to the `decorateIterableObject()` function 
 and the decorator is now calling that function. So the whole code is now shorter.

### v1.0.4
 1. Fixed some mistakes in the readme.
 2. Rewrote `loopThroughKeys()` to use 2 for-of loops instead of one for loop; (1) loop for key-value pairs, (2) loop 
 for keys only. There is no need to re-chech whether I need to return a KVP, this setting does not change in a middle 
 of a loop.
 3. Rewrote `getNext()` to use 2 for-in loops so I don't have to extract all keys at once.

### v1.0.3 
 Added README.md to the npm package.

### v1.0.2 
 Changed `getNext()` function to use the `loopThroughKeys()` function (the same as function `getNextAsc()` and 
 `getNextDesc()` use).

### v1.0.1 
 Fixed a bug where the sorting was reverced.

### v1.0.0 
 Initial commit.