(function(exports){

    // your code goes here
	
	function showLineChartWithC3(){
		
	}
	
	function showVarWidthBarChartWithD3(){
		
	}

	function mergeJSON(source1,source2){
	    /*
	     * Properties from the Souce1 object will be copied to Source2 Object.
	     * Note: This method will return a new merged object, Source1 and Source2 original values will not be replaced.
	     * */
	    var mergedJSON = Object.create(source2);// Copying Source2 to a new Object

	    for (var attrname in source1) {
	        if(mergedJSON.hasOwnProperty(attrname)) {
	          if ( source1[attrname]!=null && source1[attrname].constructor==Object ) {
	              /*
	               * Recursive call if the property is an object,
	               * Iterate the object and set all properties of the inner object.
	              */
	              mergedJSON[attrname] = mergeJSON(source1[attrname], mergedJSON[attrname]);
	          } 

	        } else {//else copy the property from source1
	            mergedJSON[attrname] = source1[attrname];

	        }
	      }

	      return mergedJSON;
	}
	
   exports.cjtsd = function(){
	   "showLineChartWithC3" : showLineChartWithC3,		// show line chart with C3+D3 library
	   "showVarWidthBarChartWithD3" : showVarWidthBarChartWithD3, 	// show variable width bar chart with D3 library
       "mergeJSON" : mergeJSON		// this is exposed as a utility function just in case someone needs it.
    };

})(typeof exports === 'undefined'? this['cjtsd']={}: exports);