/***
* TEQ JS
* PLUGINS Number
*
*
*
**/


(function () {
	
	'use strict';
	
	var TeqNumber = {
		
		random : function (min,max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		},
		between : function (number, start, finish,equals) {
			number = Number(number);
			start = Number(start);
			finish = Number(finish);
			if(!equals) {
				return (start < finish) && (number  > start  && number  < finish);
			}
			else{
				return (start < finish) && (number  >= start  && number  <= finish);
			}
				
		}
	};
	t.number = TeqNumber;
}());