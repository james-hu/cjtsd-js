(function(exports) {

  // your code goes here

  function drawVarWidthColumnChartWithD3() {

  }

  /**
   * Create a new CJTSD object from time series data object in other formats
   * @param  {[type]} other time series data object in other formats
   * @return {CJTSD}       a new CJTSD object, or null if unable to do the conversion
   */
  function fromAny(other){
    if (other === null || typeof other === 'undefined' ){
      return null;
    }

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
    var result = {"u": "m", "t": [], "d": [], "n": []};
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
        console && console.log("Unable to convert to CJTSD: " + err);
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
        if (override[attrname] != null && override[attrname].constructor == Object) {
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

  exports.drawVarWidthColumnChartWithD3 = drawVarWidthColumnChartWithD3; // draw variable width column chart with D3 library
  exports.from = fromAny;
  exports.mergeJSON = merged; // this is exposed as a utility function just in case someone needs it.

})(typeof exports === 'undefined' ? this['cjtsd'] = {} : exports);
