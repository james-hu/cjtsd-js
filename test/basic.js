if ('undefined' != typeof require) {
  var chai = require("chai");
  //var _= require("lodash");
  var cjtsd = require("../src/cjtsd.js");
}
var assert = chai.assert;

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
});
