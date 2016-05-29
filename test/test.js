'use strict';

const assert = require('assert');
const memoize = require('../lib/map-memo');

// sample types
const types = [
  123,
  'foo',
  true,
  null,
  undefined,
  {},
  function() {},
  Symbol('foo')
];

describe( 'memoize', () => {

  it( 'should be a function', () => {
    assert.equal( typeof memoize, 'function' );
  });

  it( 'should return a value', () => {
    function sqrt( n ) {
      return Math.sqrt( n );
    }

    let mem = memoize( sqrt );
    let result = mem( 9 );

    assert.equal( result, 3 );
  });

  // check all cache types
  types.forEach( val => {
    let type = val === null ? 'null' : typeof val;

    it( 'should cache ' + type, () => {
      let calls = 0;
      let result;

      function fn() {
        calls++;
        return ( result = null );
      }

      let mem = memoize( fn );

      let first = mem( val );
      let second = mem( val );

      assert.equal( first, result, 'Incorrect result was returned' );
      assert.equal( calls, 1, 'Result was not cached' );
      assert.equal( first, second, 'Cached result is incorrect' );
    });
  });

  it( 'should cache multiple arguments', () => {
    let calls = 0;
    let result;

    function fn() {
      calls++;
      return ( result = {} );
    }

    let mem = memoize( fn );

    let first = mem( types );
    let second = mem( types );

    assert.equal( first, result, 'Incorrect result was returned' );
    assert.equal( calls, 1, 'Result was not cached' );
    assert.equal( first, second, 'Cached result is incorrect' );
  });

  it( 'should not return cached results for mismatched arguments', () => {
    let calls = 0;

    function fn() {
      calls++;
      return {};
    }

    let mem = memoize( fn );

    let first = mem.apply( null, types );
    let second = mem.apply( null, types.reverse() );

    assert.equal( calls, 2, 'Function was not called twice' );
    assert.notEqual( first, second, 'Result was cached' );
  });

  it( 'should cache calls with no args', () => {
    let calls = 0;
    let result;

    function fn() {
      calls++;
      return ( result = {} );
    }

    let mem = memoize( fn );

    let first = mem();
    let second = mem();

    assert.equal( first, result, 'Incorrect result was returned' );
    assert.equal( calls, 1, 'Result was not cached' );
    assert.equal( first, second, 'Cached result is incorrect' );
  });

  it( 'should cache falsy values', () => {
    let calls = 0;
    let result;

    function fn() {
      calls++;
      return ( result = null );
    }

    let mem = memoize( fn );

    let first = mem( 123 );
    let second = mem( 123 );

    assert.equal( first, result, 'Incorrect result was returned' );
    assert.equal( calls, 1, 'Result was not cached' );
    assert.equal( first, second, 'Cached result is incorrect' );
  });

});
