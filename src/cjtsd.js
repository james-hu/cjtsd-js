(function(exports) {
  "use strict";

  if ('undefined' == typeof require) {
    var moment = window.moment;
  } else {
    var moment = require('moment');
  }

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
   * Calculate the averages from summaries and counts
   * @param  {CJTSD object} cjtsdObj the CJTSD object
   * @return {void}
   */
  function calculateAverages(cjtsdObj) {
    var avgs = new Array(cjtsdObj.t.length);
    for (var i = 0; i < avgs.length; i ++){
      avgs[i] = cjtsdObj.s[i] / cjtsdObj.c[i];
    }
    cjtsdObj.a = avgs;
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

      if (keys[0].match(/[0-9]{8,12}-[0-9]{8,12}/)){
        var kl = (keys[0].length - 1)/2;
        var result = fromFromToStringNumber(other, keys, kl);
        if (typeof other[keys[0]] === 'object'){
          extractFromN(result);
        }
        return result;
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
   *  or
   * 	{
   *   "2015060100-2015060200": 1237523,
   *   "2015060200-2015060300": 660283,
   *   "2015060300-2015060400": 1027534
   *  }
   *  or
   * 	{
   *   "20150601-20150602": 1237523,
   *   "20150602-20150603": 660283,
   *   "20150603-20150604": 1027534
   *  }
   * @param  {object} other an object
   * @param  {array of strings} keys  array of keys of the other object
   * @param  {number} key length - the length of start or end time keys. It can be 8, 10, or 12. 12 is the default value
   * @return {CJTSD object}       the equivalent CJTSD object
   */
  function fromFromToStringNumber(other, keys, kl){
    var result = {
      // this is the default: "u": "m",
      "t": new Array(keys.length),
      "d": new Array(keys.length),
      "n": new Array(keys.length)
    };
    var t = result.t;
    var d = result.d;
    var n = result.n;
    var i = 0;
    var lastDuration;
    if (!kl){
      kl = 12;
    }
    for (var key in other){
      try{
        var startTime = Date.UTC(key.substring(0, 4), key.substring(4, 6)-1, key.substring(6, 8),
          kl >= 10 ? key.substring(8, 10) : 0, kl >= 12 ? key.substring(10, 12) : 0);
        var endTime = Date.UTC(key.substring(1+kl, 5+kl), key.substring(5+kl, 7+kl)-1, key.substring(7+kl, 9+kl),
          kl >= 10 ? key.substring(9+kl, 11+kl) : 0, kl >= 12 ? key.substring(11+kl, 13+kl) : 0);
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

    removeRepeatingTrailing(d);
    return result;
  }

  function removeRepeatingTrailing(arr){
    if (!arr || arr.length === 0){
      return;
    }

    // keep only one from the trailing repeating sequence
    var last = arr[arr.length - 1];
    var i;
    for (i = arr.length - 2; i >= 0; i --){
      if (arr[i] !== last){
        break;
      }
    }
    if (i > 0){
      arr.length = i + 2;
    }

    // if the last is -1, remove it
    if (arr.length >= 2 && arr[arr.length - 1] === -1){
      arr.length = arr.length - 1;
    }
  }

  function extractFromN(data){
    if (!data || !(data.n) || data.n.constructor !== Array || data.n.length === 0 || !isNaN(data.n[0])){
      return;
    }

    for (var i = 0; i < data.n.length; i ++){
      var o = data.n[i];
      if (!o){
        break;
      }
      var avg = o.avg || o.Avg || o.average || o.Average || undefined;
      var count = o.count || o.Count || undefined;
      var sum = o.sum || o.Sum || o.summary || o.Summary || o.total || o.Total || undefined;
      var min = o.min || o.Min || o.minimum || o.Minimum || undefined;
      var max = o.max || o.Max || o.maximum || o.Maximum || undefined;

      if ('undefined' != typeof avg){
        if (!data.a){
          data.a = new Array(data.n.length);
        }
        data.a[i] = avg;
      }
      if ('undefined' != typeof count){
        if (!data.c){
          data.c = new Array(data.n.length);
        }
        data.c[i] = count;
      }
      if ('undefined' != typeof sum){
        if (!data.s){
          data.s = new Array(data.n.length);
        }
        data.s[i] = sum;
      }
      if ('undefined' != typeof min){
        if (!data.m){
          data.m = new Array(data.n.length);
        }
        data.m[i] = min;
      }
      if ('undefined' != typeof max){
        if (!data.x){
          data.x = new Array(data.n.length);
        }
        data.x[i] = min;
      }
    }

    delete data.n;
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

  exports.getTimestamps = getTimestamps;
  exports.getFormattedTimestamps = getFormattedTimestamps;
  exports.calculateAverages = calculateAverages;
  exports.from = fromAny;
  exports.mergeJSON = merged; // this is exposed as a utility function just in case someone needs it.

})(typeof exports === 'undefined' ? this.cjtsd = {} : exports);
