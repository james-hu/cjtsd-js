if ('undefined' != typeof require) {
  var chai = require("chai");
  //var _= require("lodash");
  var cjtsd = require("../src/cjtsd.js");

  var resultFromToStringNumberJSON = require("./sample-data/result-from-to-string-number.json");
  var resultFromToStringNumberJSON_CJTSD = require("./sample-data/result-from-to-string-number_cjtsd.json");

  var getFormattedTimestamps_input = require("./sample-data/getFormattedTimestamps_input.json");
  var getFormattedTimestamps_output = require("./sample-data/getFormattedTimestamps_output.json");
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
      //assert.equal(null, cjtsd.from({"201506010000-201506020000" : "xyz"}));
    });
    it('should convert an entry in result-from-to-string-number.json', function () {
      assert.deepEqual({"t":[24028755], "d":[5], "n":[3906]}, cjtsd.from({"201509081515-201509081520": 3906}));
      assert.deepEqual({"t":[24028755], "d":[60], "n":[3906]}, cjtsd.from({"201509081515-201509081615": 3906}));
    });
    it('should use -1 for some entries in result-from-to-string-number.json', function () {
      assert.deepEqual({"t":[24028755, 24028760], "d":[5, 5], "n":[3906, 3906]}, cjtsd.from({"201509081515-201509081520": 3906, "201509081520-201509081525": 3906}));
      assert.deepEqual({"t":[24028755, 24028760], "d":[120], "n":[3906, 3906]}, cjtsd.from({"201509081515-201509081715": 3906, "201509081520-201509081720": 3906}));
      assert.deepEqual({"t":[24028755, 24028760, 24028765], "d":[120, -1, 5], "n":[3906, 3906, 14]}, cjtsd.from({"201509081515-201509081715": 3906, "201509081520-201509081720": 3906, "201509081525-201509081530": 14}));
    });
    it('should convert from result-from-to-string-number.json', function () {
      var converted = cjtsd.from(resultFromToStringNumberJSON);
      //console.log(JSON.stringify(converted));
      assert.equal(Object.keys(resultFromToStringNumberJSON.result).length, converted.t.length);
      //assert.equal(converted.t.length, converted.d.length);
      assert.equal(converted.t.length, converted.n.length);
      assert.deepEqual(resultFromToStringNumberJSON_CJTSD, converted);
    });
  });
  describe('#getFormattedTimestamps()', function () {
    it('should work with getFormattedTimestamps_input.json', function () {
      var timestamps = cjtsd.getFormattedTimestamps(getFormattedTimestamps_input, 'YYYY-MM-DD', 'time');
      //console.log(JSON.stringify(converted));
      assert.deepEqual(getFormattedTimestamps_output, timestamps);

      timestamps = cjtsd.getFormattedTimestamps(getFormattedTimestamps_input, 'YYYY-MM-DD');
      assert.deepEqual(getFormattedTimestamps_output.slice(1, getFormattedTimestamps_output.length), timestamps);
    });
  });
  describe('#extractFromN()', function () {
    it('should work', function () {
      assert.deepEqual({"t":[24028755, 24028760, 24028765], "d":[120, -1, 5],
          "a": [0.008782059, 0.02, 0.12],
          "c": [213048, 435, 4565],
          "s": [1871, 99999, 787687]},
        cjtsd.from({
          "201509081515-201509081715": {"avg": 0.008782059, "count": 213048, "sum": 1871},
          "201509081520-201509081720": {"avg": 0.02, "count": 435, "sum": 99999},
          "201509081525-201509081530": {"avg": 0.12, "count": 4565, "sum": 787687}}));
    });
  });
});
