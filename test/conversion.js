if ('undefined' != typeof require) {
  var chai = require("chai");
  //var _= require("lodash");
  var cjtsd = require("../src/cjtsd.js");

  var resultFromToStringNumberJSON = require("./sample-data/result-from-to-string-number.json");
  var resultFromToStringNumberJSON_CJTSD = require("./sample-data/result-from-to-string-number_cjtsd.json");
}
if (!assert){
  var assert = chai.assert;
}

describe('Conversion Tests', function() {
  describe('#from()', function () {
    it('should return null for null', function () {
      assert.equal(null, cjtsd.from(null));
    });
    it('should return null for invalid input', function () {
      assert.equal(null, cjtsd.from({}));
      assert.equal(null, cjtsd.from([]));
      assert.equal(null, cjtsd.from({"a" : "b"}));
      assert.equal(null, cjtsd.from([{"a" : "b"}]));
      assert.equal(null, cjtsd.from({"result" : "b"}));
      assert.equal(null, cjtsd.from({"result" : [{"123": 234}]}));
      assert.equal(null, cjtsd.from({"201506010000-201506020000" : "xyz"}));
    });
    it('should convert an entry in result-from-to-string-number.json', function () {
      assert.deepEqual({"t":[24028755], "d":[5], "n":[3906]}, cjtsd.from({"201509081515-201509081520": 3906}));
      assert.deepEqual({"t":[24028755], "d":[60], "n":[3906]}, cjtsd.from({"201509081515-201509081615": 3906}));
    });
    it('should use -1 for some entries in result-from-to-string-number.json', function () {
      assert.deepEqual({"t":[24028755, 24028760], "d":[5, 5], "n":[3906, 3906]}, cjtsd.from({"201509081515-201509081520": 3906, "201509081520-201509081525": 3906}));
      assert.deepEqual({"t":[24028755, 24028760], "d":[120, -1], "n":[3906, 3906]}, cjtsd.from({"201509081515-201509081715": 3906, "201509081520-201509081720": 3906}));
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
