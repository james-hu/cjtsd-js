# Global





* * *

### getTimestamps(cjtsdObj) 

Get an array of timestamps from the `t` property of an CJTSD object referring its `u` property.

**Parameters**

**cjtsdObj**: `CJTSD`, the CJTSD object

**Returns**: `Array.&lt;Number&gt;`, array of timestamps as numbers representing
                  							milliseconds since local Epoch


### getFormattedTimestamps(cjtsdObj, formatPattern, head) 

Get an array of formatted timestamps from the `t` property of an CJTSD object referring its `u` property.

**Parameters**

**cjtsdObj**: `CJTSD`, the CJTSD object

**formatPattern**: `string`, format pattern as defined by moment

**head**: `Object | undefined`, optional head element that if present will be prepended as the first element of the returned array

**Returns**: `Array.&lt;Object&gt;`, array of formatted strings, optionally with the additional head element as specified


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
```
	{
  "201506010000-201506020000": 1237523,
  "201506020000-201506030000": 660283,
  "201506030000-201506040000": 1027534
 }
 ```
 or
 ```
	{
  "2015060100-2015060200": 1237523,
  "2015060200-2015060300": 660283,
  "2015060300-2015060400": 1027534
 }
 ```
 or
 ```
	{
  "20150601-20150602": 1237523,
  "20150602-20150603": 660283,
  "20150603-20150604": 1027534
 }
 ```
* EmbeddedSingleResult:
 ```
	{
  "result": {ANY SUPPORTED FORMAT},
 }
 ```

**Parameters**

**other**: `Object`, time series data object in other format

**Returns**: `CJTSD`, a new CJTSD object, or null if unable to do the conversion


### merged(original, override) 

Create a merged object by overriding the properties of an object with those from another.
The typical use case is for overriding default configuration JSON object with a custom one.

**Parameters**

**original**: `Object`, the original object which will not be altered in this function

**override**: `Object`, the object containing properties to override the originals

**Returns**: `Object`, a new object as the result of merting override to original



* * *










