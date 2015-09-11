if ('undefined' != typeof require) {
  var chai = require("chai");
  //var _= require("lodash");
  var cjtsd = require("../src/cjtsd.js");

  var resultFromToStringNumberJSON = require("./sample-data/result-from-to-string-number.json");
  var resultFromToStringNumberJSON_CJTSD = require("./sample-data/result-from-to-string-number_cjtsd.json");
}
var assert = chai.assert;

describe('Conversion Tests', function() {
  describe('#from()', function () {
    it('should return null for null', function () {
      assert.equal(null, cjtsd.from(null));
    });
    it('should convert from result-from-to-string-number.json', function () {
      var converted = cjtsd.from(resultFromToStringNumberJSON);
      //console.log(JSON.stringify(converted));
      assert.equal(Object.keys(resultFromToStringNumberJSON.result).length, converted.t.length);
      assert.equal(converted.t.length, converted.d.length);
      assert.equal(converted.t.length, converted.n.length);
      assert.deepEqual(resultFromToStringNumberJSON_CJTSD, converted);
    });
  });
});
