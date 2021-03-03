import assert from 'assert';

import {
  compareByFixedOrder,
  compareAlphabeticalCaseInsensitive,
  sortBy
} from '../utils';

describe('utils', () => {
  describe('#compareByFixedOrder', () => {
    const order = ['A', 'D', 'C', 'Q', 'B'];
    const compare = compareByFixedOrder(order);

    it('should return a function', () => {
      assert.equal(typeof compare, 'function');
    });

    it('returned function should return less than zero for ascending values', () => {
      const result = compare('D', 'Q');
      assert(result < 0);
    });

    it('returned function should return greater than zero for descending values', () => {
      const result = compare('C', 'D');
      assert(result > 0);
    });

    it('returned function should return zero for equal values', () => {
      const result = compare('B', 'B');
      assert.equal(result, 0);
    });

    it('returned function should return greater than zero for first value not in list', () => {
      const result = compare('X', 'A');
      assert(result > 0);
    });

    it('returned function should return less than zero for second value not in list', () => {
      const result = compare('B', 'X');
      assert(result < 0);
    });

    it('returned function should return zero for two values not in list', () => {
      const result = compare('X', 'Y');
      assert.equal(result, 0);
    });

    it('should accept an accessor function', () => {
      const compareWithAccessor = compareByFixedOrder(order, val => val.name);
      const a = {name: 'C', value: 2};
      const b = {name: 'D', value: 5};
      const result = compareWithAccessor(a, b);
      assert(result > 0);
    });

    it('returned function should work with Array.sort()', () => {
      const original = ['A', 'B', 'A', 'C', 'D', 'E', 'D'];
      const expected = ['A', 'A', 'D', 'D', 'C', 'B', 'E'];
      const actual = original.sort(compare);
      assert.deepEqual(actual, expected);
    });
  });

  describe('#compareAlphabeticalCaseInsensitive', () => {
    const compare = compareAlphabeticalCaseInsensitive();

    it('should return a function', () => {
      assert.equal(typeof compare, 'function');
    });

    it('returned function should return less than zero for ascending values', () => {
      const result = compare('first', 'SECOND');
      assert(result < 0);
    });

    it('returned function should return greater than zero for descending values', () => {
      const result = compare('xylophone', 'aardvark');
      assert(result > 0);
    });

    it('returned function should return zero for eqivalent values', () => {
      const result = compare('eQuAl', 'EqUal');
      assert.equal(result, 0);
    });

    it('should accept an accessor function', () => {
      const compareWithAccessor = compareAlphabeticalCaseInsensitive(val => val.name);
      const a = {name: 'sox9a', count: 2};
      const b = {name: 'Pten', count: 9};
      const result = compareWithAccessor(a, b);
      assert(result > 0);
    });

    it ('returned function should work wtih Array.sort()', () => {
      const original = ['Finn', 'and', 'Zoe', 'Are', 'fluffy', 'cats'];
      const expected = ['and', 'Are', 'cats', 'Finn', 'fluffy', 'Zoe'];
      const actual = original.sort(compare);
      assert.deepEqual(actual, expected);
    });
  });

  describe('#sortBy', () => {
    it('should chain compare functions', () => {
      const order = ['ONE', 'TWO', 'THREE'];
      const original = ['THREE', 'TWO', 'FIVE', 'FOUR', 'FIVE', 'ONE', 'THREE', 'ONE'];
      const expected = ['ONE', 'ONE', 'TWO', 'THREE', 'THREE', 'FIVE', 'FIVE', 'FOUR'];
      const actual = sortBy(original, [
        compareByFixedOrder(order),
        compareAlphabeticalCaseInsensitive()
      ]);
      assert.deepEqual(actual, expected);
    });
  });
});
