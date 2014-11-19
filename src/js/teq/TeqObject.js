/***
* TEQ JS
* PLUGINS Object
*
*
*
**/
'use strict';

(function () {

	var TeqObject = {
		is : t.isObject,
		
		isEmpty : t.isEmpty,
		
		count : function (object){
			return Object.keys(object).length
		},
		max : function (object,comparisonFn) {
			var max = null,
				property,item;
			for(property in object){
				item = object[property];
				if(max == null){
					max = item;
				}
				if(comparisonFn){
					if (comparisonFn(max, item) === -1) {
						max = item;
					}
				}				
				else{
					if (item > max) {
						max = item;
					}
				}
			}
			return max;
		},
		min : function (object,comparisonFn) {
			var min = null,
				property,item;
			for(property in object){
				item = object[property];
				if(min == null){
					min = item;
				}
				if(comparisonFn){
					if (comparisonFn(min, item) === 1) {
						min = item;
					}
				}				
				else{
					if (item < min) {
						min = item;
					}
				}
			}
			return min;		
		},
		sum : function (object) {
			var result = 0,
				property;
			for(property in object){
				result += object[property];
			}
			return result;
		},
		/**
		 * Gets all values of the given object as an array.
		 *
		 * @param {Object} object
		 * @return {Array} An array of values from the object
		 */
		values : function (object) {
			var values = [],
				property;
			for (property in object) {
				if (object.hasOwnProperty(property)) {
					values.push(object[property]);
				}
			}
			return values;
		},
		/**
		 * Returns the first matching key corresponding to the given value.
		 * If no matching value is found, null is returned.
		 * @param {Object} object
		 * @param {Object} value The value to find
		 */
		getKey : function (object,value) {
			for (var property in object) {
				if (object.hasOwnProperty(property) && object[property] === value) {
					return property;
				}
			}
			return null;
		},
		first : function (object) {
			return t.object.values(object)[0];
		},
		last : function (object) {
			return t.object.values(object)[t.object.count(object) - 1];
		},
		/**
		 * Iterates through an object and invokes the given callback function for each iteration.
		 * The iteration can be stopped by returning `false` in the callback function. For example:
		 *
		 * @param {Object} object The object to iterate
		 * @param {Function} fn The callback function.
		 * @param {Object} [scope] The execution scope (`this`) of the callback function
		 */ 
		each : function (object,fn,scope) {
			for (var property in object) {
				if (object.hasOwnProperty(property)) {
					if (fn.call(scope || object, object[property], property, object) === false) {
						return;
					}
				}
			}
		},
		clone : function (object) {
			
		}
	};	
	t.object = TeqObject;
}());
