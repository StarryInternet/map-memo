# map-memo

[![Build Status](https://travis-ci.org/StarryInternet/map-memo.svg?branch=master)](https://travis-ci.org/StarryInternet/map-memo)

Generic memoization using `Map` and `WeakMap`.

---

### Installing

```
npm install --save @starryinternet/map-memo
```

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

const memoize = require('@starryinternet/map-memo');

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

const memoize = require('@starryinternet/map-memo');

function getRandom() {
  return Math.random();
}

let mem = memoize( getRandom, { ttl: 1000 } );
console.log( mem() );
console.log( mem() ); // Same value as above

setTimeout( function() {
  console.log( mem() ); // Different value
}, 1001 );
```

### Example with asynchronous function

```js
'use strict';

const memoize = require('@starryinternet/map-memo');

function loopAsync( fn, n ) {
  return new Promise( ( resolve, reject ) => {
    let v;

    for ( let i = 0; i < n; ++i ) {
      v = fn( i );
    }

    resolve( v );
  });
}

let mem = memoize( loopAsync );

mem( Math.sqrt, 1e9 ).then( result => {
  console.log( result ); // slow
  mem( Math.sqrt, 1e9 ).then( console.log ); // fast!
});
```
