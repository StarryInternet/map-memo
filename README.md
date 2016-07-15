# map-memo

![Codeship badge](https://codeship.com/projects/dd6eb2b0-20fe-0134-23d7-6a7a2fea738b/status?branch=master)

Generic memoization using `Map` and `WeakMap`.

---

### What/Why?

Memoization in JavaScript has typically been limited to arguments
with primitive values, or by utilizing hacks such as stringifying objects.

By storing arguments using a series of nested cache objects backed by `Map`
and `WeakMap`, `map-memo` is able to memoize functions with *any*
argument types.

---

### Example

```js
'use strict';

const memoize = require('map-memo');

function loop( fn, n ) {
  let v;

  for ( let i = 0; i < n; ++i ) {
    v = fn( i );
  }

  return v;
}

let mem = memoize( loop );

console.log( mem( Math.sqrt, 1e9 ) ); // slow
console.log( mem( Math.sqrt, 1e9 ) ); // fast!
```

### Example with expire time in milliseconds

```js
'use strict';

const memoize = require('map-memo');

function getRandom() {
  return Math.random();
}

let mem = memoize( getRandom, { ttl: 1000 } );
console.log( mem() );
console.log( mem() ); // Same value as above

setTimeout( function() {
  console.log( mem() );
}, 1001 ); // Different value
```
