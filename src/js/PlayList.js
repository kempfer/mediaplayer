/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
;(function () {
    
    'use strict';

    
    var playList = function (tracks) {
        if(!(this instanceof playList)){
			return new playList(tracks);
		}
        this._tracks = [];
        this.push(tracks);
        this._currentTrack = this._tracks[0];
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
        
        set currentTrack (track) {
            this._currentTrack = track;
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
         * @returns {Track}
         */
        get prevTrack () {
            var index, prevTrack;
			index = this._currentTrack.index;					
			prevTrack = this._tracks[index - 1 ];			
			if(!prevTrack){								
				prevTrack = this._tracks[this._currentTrack.length - 1];				
			}
			return prevTrack;
        },
        /**
         * 
         * @returns {Track}
         */
		get latsTrack () {
			return this._tracks[this._tracks.length - 1];
		},
        /**
         * 
         * @param {Mixed} track
         * @returns {playList}
         */
        push : function (track){
            var i,resurse,
                tracks = track;
            if(!t.isArray(track)) {
                tracks = [track];
            }
            for(i = 0; i <  tracks.length; i++){
                resurse = tracks[i];
                resurse.index = this._tracks.length;
                this._tracks.push(
                    new window.zpTrack(resurse)
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
                new window.zpTrack(track)
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
        on : function (event, func) {
            
            return this;
        }
        
    };
    
    window.zpPlayList = playList;
    
})();


;(function (window) {
    
    'use strict';
    
    var Track = function (options) {
        if(!(this instanceof Track)){
			return new Track(options);
		}
        this.options = options;
        this.id = t.uniqueId();
        this.index = this.options['index'];
        this.init(100);
        return this;
    };
    Track.prototype = {
        
        id : null,
        
        provider : null,
        
        constructor : Track,
        
        index : 0,
        
        init : function (volume,autoplay) {
            autoplay = autoplay || false;
            this.provider = new window.MP({
                source : this.options['source'],
                autoplay : autoplay,
                use : window.MP.constants.HTML5,
                volume : volume
            });
        },
        play : function (volume) {
            if(this.provider instanceof window.MP){
                this.provider.play();
            }
            else{
                this.init(volume,true);
            }
            return this;
        },
        pause : function () {
            if(this.provider instanceof window.MP){
                this.provider.pause();
            }
            return this;
        },
        stop : function () {
            if(this.provider instanceof window.MP){
                this.provider.destroy();
            }
            this.provider = null;
            this.init();
            return this;
        }
    };
    
    window.zpTrack = Track;
})(window);