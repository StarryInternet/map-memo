'use strict';

class Cache {

  constructor() {
    this.map     = new Map();
    this.weakmap = new WeakMap();
  }

  // create or retrieve a nested Cache instance based on an arguments object
  get( args ) {
    return args.reduce( Cache.reducer, this );
  }

  // get a backing store (map/weakmap) based on a given value
  store( value ) {
    const t = typeof value;
    const isObject = ( t === 'object' || t === 'function' ) && value !== null;
    return Reflect.get( this, isObject ? 'weakmap' : 'map' );
  }

  static reducer( cache, value ) {
    const store = cache.store( value );
    return store.get( value ) || store.set( value, new Cache() ).get( value );
  }

}

module.exports = function memoize( fn, { ttl = Infinity } = {} ) {
  const cache = new Cache();

  return function( ...args ) {
    // get (or create) a cache item
    const item = cache.get( args );

    if ( item.hasOwnProperty('value') && item.expires >= Date.now() ) {
      return item.value;
    }

    item.expires = Date.now() + ttl;
    return item.value = fn.apply( this, args );
  };
};
