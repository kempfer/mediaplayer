/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
;(function () {
    
    'use strict';

    
    var playList = function (options) {
        if(!(this instanceof playList)){
			return new playList(options);
		}
        this._tracks = [];
        this._current = null;
        return this;
    };
    
    playList.prototype = {
        
        constructor : playList,
        
        _tracks : [],
        
        _current : null,
        /**
		*
		*
		*@return Object
		*/
		get currentTrack () {
			return this._currentTrack;
		},
        /**
		*
		*Returns the number of tracks
		*@return integer
		*/	
		get count () {
			return this._tracks.length;
		},
        /**
		*
		*
		*@return Object
		*/
		get nextTrack () {
			var index, nextTrack;
			index = this._currentTrack.index;					
			nextTrack = this._tracks[index + 1 ];			
			if(!nextTrack){								
				nextTrack = this._tracks[0];				
			}
			return nextTrack;
		},
		/**
		*
		*
		*@return Object
		*/
		get latsTrack () {
			return this._tracks[this._tracks.length - 1];
		},
        /**
         * 
         * @returns {playList}
         */
        playNext : function () {
            
        },
        /**
         * 
         * @returns {playList}
         */
        playPrev : function () {
            
        },
        /**
         * 
         * @param {Number} index
         * @returns {playList}
         */
        play : function (index) {
            
        },
        /**
         * 
         * @param {Mixed} track
         * @returns {playList}
         */
        push : function (track){
            var i,
                tracks = track;
            if(!t.isArray(track)) {
                tracks = [track];
            }
            for(i = 0; i <  tracks.length; i++){
                this._tracks.push(
                    new window.PlayList.track(tracks[i])
                );
            }
        },
        /**
         * 
         * @param {Object} track
         * @returns {playList}
         */
        unshift : function (track) {
            this._tracks.unshift(
                new window.PlayList.track(track)
            );
        },
        /**
         * 
         * @return {playList}
         */
        mix : function () {
            
        },
        /**
         * 
         * @param {Number} index
         * @returns {playList}
         */
        removeTrack : function (index) {
            
        },
        on : function () {
            
        }
        
    };
    
    window.PlayList = playList;
    
})();


;(function (PL) {
    
    'use strict';
    
    var track = function (options) {
        if(!(this instanceof track)){
			return new track(options);
		}
        this.options = options;
        this.id = t.uniqueId();
        return this;
    };
    track.prototype = {
        
        id : null,
        
        provider : null,
        
        constructor : track,
        
        init : function () {
            
        },
        stop : function () {
            
        }
    };
    
    PL.track = track;
})(window.PlayList);