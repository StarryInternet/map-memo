'use strict';

function isObject( arg ) {
  const t = typeof arg;
  return ( t === 'object' || t === 'function' ) && arg !== null;
}

class Cache {

  constructor() {
    this.map     = new Map();
    this.weakmap = new WeakMap();
  }

  // create or retrieve a nested Cache instance based on an arguments object
  get( args ) {
    let cache = this;

    for ( let value of args ) {
      const map = cache[ isObject( value ) ? 'weakmap' : 'map' ];
      cache = map.get( value ) || map.set( value, new Cache() ).get( value );
    }

    return cache;
  }

}

module.exports = function memoize( fn ) {
  const cache = new Cache();

  return function() {
    const args = new Array( arguments.length );

    for ( let i = 0, len = arguments.length; i < len; ++i ) {
      args[ i ] = arguments[ i ];
    }

    // get (or create) a cache item
    const item = cache.get( args );

    if ( item.hasOwnProperty('value') ) {
      return item.value;
    }

    return item.value = fn.apply( this, args );
  };
};
