# Global





* * *

### getTimestamps(cjtsdObj)

Get an array of timestamps from the `t` property of an CJTSD object referring its `u` property.

**Parameters**

**cjtsdObj**: `CJTSD`, the CJTSD object

**Returns**: `Array`, array of timestamps as numbers representing
                  							milliseconds since local Epoch


### getFormattedTimestamps(cjtsdObj, formatPattern, head)

Get an array of formatted timestamps from the `t` property of an CJTSD object referring its `u` property.

**Parameters**

**cjtsdObj**: `CJTSD`, the CJTSD object

**formatPattern**: `string`, format pattern as defined by moment

**head**: `Object | undefined`, optional head element that if present will be prepended as the first element of the returned array

**Returns**: `Array`, array of formatted strings, optionally with the additional head element as specified


### mergeTimestamps(varArgs)

Merge multiple timestamp arrays into one.

**Parameters**

**varArgs**: `Array.&lt;number&gt;`, multiple arrays representing timestamps as numbers, arrays must all be sorted.
                                Arrays can be null or empty.

**Returns**: `Array.&lt;number&gt;`, merged array of timestamps. It is sorted, and contains distinct elements from the input arrays.
                          			The result may be empty but never null.


### alignByTimestamps(timestamps, dataTimestamps, data)

Align data by timestamps

**Parameters**

**timestamps**: `Array.&lt;number&gt;`, array of timestamps that the data will be aligned to, it must be sorted

**dataTimestamps**: `Array.&lt;number&gt;`, array of timestamps corresponding to the data array, it must be sorted

**data**: `Array.&lt;Object&gt;`, array of the data, the length must be the same as dataTimestamps's

**Returns**: `Array.&lt;Object&gt;`, a new data array that has the same length as timestamps
                                  that is the result of aligning the data with to the timestamps.
                                  Null is used for non-existing data points.


### calculateAverages(cjtsdObj)

Calculate the averages from summaries and counts.
The averages will be put into the `a` property of the CJTSD object.

**Parameters**

**cjtsdObj**: `CJTSD`, the CJTSD object



### prepend(arr, head)

Construct a new array with a head element prepended

**Parameters**

**arr**: `Array`, the original array which will not be altered in this function.

**head**: `Object`, the head element to append

**Returns**: `Array`, a new array with the head element prepended


### setDataTableColumn(table, arr, col, row)

Set the values in a column of Google DataTable.
If the DataTable currently does not have enough rows, empty new rows will be addd in this method.

**Parameters**

**table**: `DataTable`, the Google DataTable

**arr**: `Array`, Array of values for the specified column

**col**: `Number`, Index of the column, 0 for the first column

**row**: `Number | 0`, Index of the row offset, 0 for the first row. If not specified, 0 will be used.



### setDataTableTimestampColumn(table, cjtsdObj, col, formatPattern, offset, row)

Set the values in a timestamp column of Google DataTable.
If the DataTable currently does not have enough rows, empty new rows will be addd in this method.

**Parameters**

**table**: `DataTable`, the Google DataTable

**cjtsdObj**: `CJTSD`, the data

**col**: `Number`, Index of the column, 0 for the first column

**formatPattern**: `string`, format pattern as defined by moment

**offset**: `Number | 0`, optional timezone offset in milliseconds to be added to
                               the original timestamp value when creating the Date object.
                               If not specified, 0 will by used.

**row**: `Number | 0`, Index of the row offset, 0 for the first row. If not specified, 0 will be used.



### from(other)

Create a new CJTSD object from time series data object in other formats.

Supported formats are:
* FromToStringNumber:
```json
	{
  "201506010000-201506020000": 1237523,
  "201506020000-201506030000": 660283,
  "201506030000-201506040000": 1027534
 }
 ```
 or
 ```json
	{
  "2015060100-2015060200": 1237523,
  "2015060200-2015060300": 660283,
  "2015060300-2015060400": 1027534
 }
 ```
 or
 ```json
	{
  "20150601-20150602": 1237523,
  "20150602-20150603": 660283,
  "20150603-20150604": 1027534
 }
 ```
* EmbeddedSingleResult:
 ```json
	{
  "result": {ANY SUPPORTED FORMAT}
 }
 ```

**Parameters**

**other**: `Object`, time series data object in other format

**Returns**: `CJTSD`, a new CJTSD object, or null if unable to do the conversion


### add(array1, array2) 

Add two arrays as vectors (return array1 + array2).
The two input arrays must not be null and must have the same number of elements.

**Parameters**

**array1**: `Array.&lt;number&gt;`, the array to be added with the other

**array2**: `Array.&lt;number&gt;`, the array to be added with the other

**Returns**: , a new arrray that each element is the result of adding elements at the same position in the input arrays


### substract(array1, array2)

Substract one arrays by another as vectors (return array1 - array2)
The two input arrays must not be null and must have the same number of elements.

**Parameters**

**array1**: `Array.&lt;number&gt;`, the array containing values that will be removed from

**array2**: `Array.&lt;number&gt;`, the array containing values that will be removed

**Returns**: , a new arrray that each element is the result of substracting elements at the same position in the input arrays


### merge(func, array1, array2)

Merge two arrays with a custom function
The two input arrays must not be null and must have the same number of elements.

**Parameters**

**func**: `function`, the function to merge elements from two arrays. parameters to this function may be null.

**array1**: `Array.&lt;number&gt;`, the array to be merged with the other

**array2**: `Array.&lt;number&gt;`, the array to be merged with the other

**Returns**: , a new arrray that each element is the result of merging elements at the same position in the input arrays



* * *
