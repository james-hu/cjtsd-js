if ('undefined' != typeof require) {
  var chai = require("chai");
  //var _= require("lodash");
  var cjtsd = require("../src/cjtsd.js");
}
if (!assert){
  var assert = chai.assert;
}

/*
function betterDeepEqual(o1, o2){
  return _.isMatch(o1, o2) && _.isMatch(o2, o1);
}
*/

describe('Basic Tests', function() {
  describe('#mergeJSON()', function () {
    it('should add new properties', function () {
      assert.deepEqual({"a": 1}, cjtsd.mergeJSON({}, {"a": 1}));
      assert.deepEqual({"a": 1, "b": 2, "c": 3}, cjtsd.mergeJSON({}, {"a": 1, "b": 2, "c": 3}));
      assert.deepEqual({"a": 1, "b": 2, "c": 3}, cjtsd.mergeJSON({"a": 1}, {"a": 1, "b": 2, "c": 3}));
    });
    it('should update existing properties with new values', function () {
      assert.deepEqual({"a": 2}, cjtsd.mergeJSON({"a": 1}, {"a": 2}));
      assert.deepEqual({"a": 2, "b": 2, "c": 3}, cjtsd.mergeJSON({"a": 1, "b": 2, "c": 3}, {"a": 2}));
      //assert(betterDeepEqual({"a": 2, "b": 2, "c": 3}, cjtsd.mergeJSON({"a": 1, "b": 2, "c": 3}, {"a": 2})));
      assert.deepEqual({"a": 2, "b": 2, "c": 3, "d": 4}, cjtsd.mergeJSON({"a": 1, "b": 2, "c": 3}, {"a": 2, "d": 4}));
      //assert(betterDeepEqual({"a": 2, "b": 2, "c": 3, "d": 4}, cjtsd.mergeJSON({"a": 1, "b": 2, "c": 3}, {"a": 2, "d": 4})));
    });
    it('should work for strings', function () {
      assert.deepEqual({"a": "2", "b": "2", "c": "3", "d": "4"}, cjtsd.mergeJSON({"a": "1", "b": "2", "c": "3"}, {"a": "2", "d": "4"}));
      //assert(betterDeepEqual({"a": "2", "b": "2", "c": "3", "d": "4"}, cjtsd.mergeJSON({"a": "1", "b": "2", "c": "3"}, {"a": "2", "d": "4"})));
    });
    it('should work for arrays', function () {
      assert.deepEqual({"a": [1,2], "b": "2", "c": "3", "d": "4"}, cjtsd.mergeJSON({"a": "1", "b": "2", "c": "3"}, {"a": [1,2], "d": "4"}));
      //assert(betterDeepEqual({"a": [1,2], "b": "2", "c": "3", "d": "4"}, cjtsd.mergeJSON({"a": "1", "b": "2", "c": "3"}, {"a": [1,2], "d": "4"})));
    });
  });
  describe('#prepend()', function () {
    it('should work', function () {
      assert.deepEqual(["x", "a", "b"], cjtsd.prepend(["a", "b"], "x"));
      assert.deepEqual(["x"], cjtsd.prepend(null, "x"));
      assert.deepEqual(["x", "a"], cjtsd.prepend("a", "x"));
    });
  });
  describe('#mergeTimestamps()', function () {
    it('should work', function () {
      assert.deepEqual([], cjtsd.mergeTimestamps(null));
      assert.deepEqual([], cjtsd.mergeTimestamps(null, null));
      assert.deepEqual([], cjtsd.mergeTimestamps([]));
      assert.deepEqual([], cjtsd.mergeTimestamps([], [], []));
      assert.deepEqual([], cjtsd.mergeTimestamps([], null, []));
      assert.deepEqual([1], cjtsd.mergeTimestamps([1], null, []));
      assert.deepEqual([1,2,3], cjtsd.mergeTimestamps([1,2,3], null, []));
      assert.deepEqual([1,2,3], cjtsd.mergeTimestamps([1,2,3], [1,2,3], [1,2,3]));
      assert.deepEqual([1,2,3,4,5,6], cjtsd.mergeTimestamps([1,2,3], [1,2,3,4,5,6], [1,2,3]));
      assert.deepEqual([1,2,3,4,5,6], cjtsd.mergeTimestamps([2,3], [1,2,5,6], [2,4]));
      assert.deepEqual([1,2,3,4,5,6], cjtsd.mergeTimestamps([2], [5,6], [1,4], [1,2,3,4]));
      assert.deepEqual([1,2,3,4,5,6], cjtsd.mergeTimestamps([6], [5,6], [], null, [1,4], [2,3,4]));
      assert.deepEqual([1,2,3,4,5,6], cjtsd.mergeTimestamps([6], [5,6], [], null, [1,4,6], [2,3,4]));
      assert.deepEqual([1,2,3,4,5,6], cjtsd.mergeTimestamps([1,6], [2,5], [2,3,4]));
      assert.deepEqual([1,2,3,4,5,6], cjtsd.mergeTimestamps([1,2,3,4], [5,6], [1,2,3,4], [1,2,3], [1,2]));
    });
  });
  describe('#alignByTimestamps()', function () {
    it('should work', function () {
      assert.deepEqual([null,null,null], cjtsd.alignByTimestamps([1,2,3], [], []));
      assert.deepEqual([null,null,null], cjtsd.alignByTimestamps([1,2,3], null, null));
      assert.deepEqual([null,null,null], cjtsd.alignByTimestamps([1,2,3], [4,5], [4,5]));
      assert.deepEqual([1,2,3], cjtsd.alignByTimestamps([1,2,3], [1,2,3], [1,2,3]));
      assert.deepEqual([null, 2,3,4,5], cjtsd.alignByTimestamps([1,2,3,4,5], [2,3,4,5], [2,3,4,5]));
      assert.deepEqual([1,2,3,null,null], cjtsd.alignByTimestamps([1,2,3,4,5], [1,2,3], [1,2,3]));
      assert.deepEqual([null,2,3,null,5], cjtsd.alignByTimestamps([1,2,3,4,5], [2,3,5], [2,3,5]));
      assert.deepEqual([null,"two","three",null,"five"], cjtsd.alignByTimestamps([1,2,3,4,5], [2,3,5], ["two", "three", "five"]));
    });
  });
  describe('#add()', function () {
    it('should work', function () {
      assert.deepEqual([1,2,3], cjtsd.add([1,2,3], null));
      assert.deepEqual([1,2,3], cjtsd.add([0,0,1], cjtsd.add([1,0,0], [0,2,2])));
      assert.deepEqual([1,0,3], cjtsd.add([0,0,1], [1, null, 2]));
      assert.deepEqual([null,0,3], cjtsd.add([null,0,1], [null, null, 2]));
    });
  });
  describe('#substract()', function () {
    it('should work', function () {
      assert.deepEqual([1,2,3], cjtsd.substract([1,2,3], null));
      assert.deepEqual([-1,-2,-3], cjtsd.substract(null, [1,2,3]));
      assert.deepEqual([-1,-1,-1], cjtsd.substract([1,1,2], cjtsd.substract([2,4,5], [0,2,2])));
      assert.deepEqual([-1,5,-2], cjtsd.substract([null,5,null], [1, null, 2]));
      assert.deepEqual([-1,null,-2], cjtsd.substract([null,null,null], [1, null, 2]));
    });
  });
  describe('#merge()', function () {
    it('should work', function () {
      assert.deepEqual([1,2,3], cjtsd.merge(function(a,b){return a+b;}, [1,2,1], [0, 0, 2]));
    });
  });
});
