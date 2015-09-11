(function(exports) {

  // your code goes here

  function drawVarWidthColumnChartWithD3() {

  }

  /**
   * Create a new CJTSD object from time series data object in other formats
   * @param  {[type]} other time series data object in other formats
   * @return {CJTSD}       a new CJTSD object, or null if unable to do the conversion
   */
  function from(other){

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
  exports.from = from;
  exports.mergeJSON = merged; // this is exposed as a utility function just in case someone needs it.

})(typeof exports === 'undefined' ? this['cjtsd'] = {} : exports);
