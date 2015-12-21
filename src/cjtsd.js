"use strict";

if ('undefined' != typeof require) {
  var moment = require('moment');
}

(function(exports) {

  function getTimestampScale(cjtsdObj){
    if (!cjtsdObj.u || cjtsdObj.u === 'm'){
      return 60000;
    }else if (cjtsdObj.u === 's'){
      return 1000;
    }else{
      return 1;
    }
  }

  /**
   * Get an array of timestamps from the t property of an CJTSD object referring its u property.
   * @param  {CJTSD} cjtsdObj the CJTSD object
   * @return {array of numbers}    array of timestamps as numbers representing
   *                   							milliseconds since local Epoch
   */
  function getTimestamps(cjtsdObj) {
    var scale = getTimestampScale(cjtsdObj);

    var result = new Array(cjtsdObj.t.length);
    for (var i = 0; i < result.length; i ++){
      result[i] = cjtsdObj.t[i] * scale;
    }
    return result;
  }

  /**
   * Get an array of formatted timestamps from the t property of an CJTSD object referring its u property.
   * @param  {CJTSD} cjtsdObj the CJTSD object
   * @param  {string} formatPattern  format pattern as defined by moment
   * @param  {string} optional head string that will be the first element of the returned array
   * @return {array of strings}    array of formatted strings, optionally with the additional head element as specified
   */
  function getFormattedTimestamps(cjtsdObj, formatPattern, head) {
    var scale = getTimestampScale(cjtsdObj);
    var j = 0;
    var result;
    if (head){
      result = new Array(cjtsdObj.t.length + 1);
      result[j++] = head;
    }else{
      result = new Array(cjtsdObj.t.length);
    }
    for (var i = 0; i < cjtsdObj.t.length; i ++){
      result[j++] = moment(scale * cjtsdObj.t[i]).utc().format(formatPattern);
    }
    return result;
  }

  /**
   * Create a new CJTSD object from time series data object in other formats
   * @param  {object} other time series data object in other formats
   * @return {CJTSD}       a new CJTSD object, or null if unable to do the conversion
   */
  function fromAny(other){
    if (other === null || typeof other === 'undefined' ){
      return null;
    }

    if (typeof other === 'object'){
      var keys = Object.keys(other);
      if (keys.length === 0){
        return null;
      }

      if (keys.length === 1 && keys[0] == "result"){
        return fromAny (other[keys[0]]);
      }

      if (keys[0].match(/[0-9]{12}-[0-9]{12}/) && typeof other[keys[0]] === 'number'){
        return fromFromToStringNumber(other, keys);
      }
    }

    return null;
  }

  /**
   * Create a new CJTSD object from time series data object in format like:
   * 	{
   *   "201506010000-201506020000": 1237523,
   *   "201506020000-201506030000": 660283,
   *   "201506030000-201506040000": 1027534
   *  }
   * @param  {[type]} other [description]
   * @param  {[type]} keys  [description]
   * @return {[type]}       [description]
   */
  function fromFromToStringNumber(other, keys){
    var result = {
      // this is the default "u": "m",
      "t": [],
      "d": [],
      "n": []
    };
    var t = result.t;
    var d = result.d;
    var n = result.n;
    var i = 0;
    var lastDuration;
    for (var key in other){
      try{
        var startTime = Date.UTC(key.substring(0, 4), key.substring(4, 6)-1, key.substring(6, 8),
          key.substring(8, 10), key.substring(10, 12));
        var endTime = Date.UTC(key.substring(13, 17), key.substring(17, 19)-1, key.substring(19, 21),
          key.substring(21, 23), key.substring(23, 25));
        //console.log(key + " ==> " + startTime + " - " + endTime);
        t[i] = Math.floor(startTime / 60000);
        var duration = Math.floor((endTime - startTime) / 60000);
        if (duration != lastDuration){
          d[i] = duration;
          lastDuration = duration;
        }else{
          d[i] = duration >= 100 ? -1 : duration;
        }
        n[i] =other[key];
        i ++;
     }catch(err){
       if (console && console.log){
         console.log("Unable to convert to CJTSD: " + err);
       }
      }
    }

    return result;
  }

  /**
   * Create a merged object by overriding the properties of an object with those from another.
   * The typical use case is for overriding default configuration JSON object with a custom one.
   * @param  {[type]} original the original object
   * @param  {[type]} override the object containing properties to override the originals
   * @return {[type]}  a new object as the result of merting override to original
   */
  function merged(original, override) {
    var mergedJSON = Object.create(original); // Copying Source2 to a new Object
    for (var attrname in override) {
      if (mergedJSON.hasOwnProperty(attrname)) {
        if (override[attrname] !== null && override[attrname].constructor == Object) {
          /*
           * Recursive call if the property is an object,
           * Iterate the object and set all properties of the inner object.
           */
          mergedJSON[attrname] = merged(override[attrname], mergedJSON[attrname]);
        }
      } else { //else copy the property from source1
        mergedJSON[attrname] = override[attrname];
      }
    }
    return mergedJSON;
  }

  exports.getFormattedTimestamps = getFormattedTimestamps;
  exports.from = fromAny;
  exports.mergeJSON = merged; // this is exposed as a utility function just in case someone needs it.

})(typeof exports === 'undefined' ? this.cjtsd = {} : exports);
