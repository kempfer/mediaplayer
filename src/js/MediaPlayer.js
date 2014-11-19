;(function (window) {
	
	'use strict';
	
    var eventList = [
		'loadstart','progress','suspend','abort','error','emptied','stalled','loadedmetadata','loadeddata',
		'canplay','canplaythrough','playing','waiting','seeking','seeked','ended','durationchange','timeupdate',
		'play','pause','ratechange','resize','volumechange'
	],
    
    createProvider = function createProvider (options) {
        var provider;
        if( options['use'] === MediaPlayer.constants.HTML5){
            provider = new window.MP.HTML5Provider({
                type : options['type'],
                source : options['source'],
                autoplay :  options['autoplay'],
                loop : options['loop'],
                preload : options['preload'],
                autobuffer : options['autobuffer'],
                volume : options['volume']
            });
        }
        provider.on(eventList.join(' '), function (e) {
            console.log(e.type);
        });
        return provider;
    };
    
	var MediaPlayer = function (options) {
		if(!(this instanceof MediaPlayer)){
			return new MediaPlayer(options);
		}
        
        this.options = t.combine(MediaPlayer.defaultOptions, options);
        this.provider = createProvider(this.options);
        return this;
	};
    
    MediaPlayer.prototype = {
        
        constructor : MediaPlayer,
        
        type : null,
        
        use : null,
        
        provider : null,
        
        /**
		* 
		*@returns {Boolean}
		*/
		get played () {
			return this.provider.paused;
		},
        /**
		*
		*@returns {Boolean}
		*/
		get paused () {
			return this.provider.paused;
		},
		/**
		*
		*@returns {Boolean}
		*/
		get ended () {
			return this.provider.ended;
		},
		/**
		*
		*@returns {Number} volume value
		*/
		get volume () {
			return this.provider.volume;
		},
        /**
		* Get current time
		*@returns {Number} current time
		*/
		get time () {
			return this.provider.time;
		},
		/**
		* Get duration video
		*@return {Number} current time
		*/
		get duration () {
			return this.provider.duration;
		},
        /**
         * @return {Boolean} description
         */
        get progress () {
            return this.provider.progress;
        },
        /**
         * 
         * @returns {Boolean}
         */
        get progressLoad () {
            return this.provider.progressLoad;
        },
        
        /**
         * 
         * @param {Mixed} key
         * @param {Mixed} value
         * @returns {MediaPlayer}
         */
        set : function (key, value) {
            var k;
            if(t.isObject(key)){
                for(k in key) {
                    if( this.options.hasOwnProperty(k)){
                        this.options[k] = key[k];
                    }
                }
            }
            else if(this.options.hasOwnProperty(key)){
                this.options[key] = value;
            }
            return this;
        },
        /**
         * 
         * @param {Mixed} key
         * @returns {Mixed}
         */
        get : function (key) {
            return this.options[key];
        },
        /**
         * 
         * @param {Mixed} selector
         * @returns {MediaPlayer}
         */
        appendTo : function (selector) {
            t.dom(selector).append(this.provider.element);
            return this;
        },
        /**
		*
		* Toggle playback
		*@return {MediaPlayer}
		*/
		toggle : function () {
			if(this.provider.played){
				this.provider.pause();
			}
			else{
				this.provider.play();
			}
			return this;
		},
        /**
         * 
         * @returns {MediaPlayer}
         */
        play : function () {
            this.provider.play();
            return this;
        },
        /**
         * 
         * @returns {MediaPlayer}
         */
        pause : function () {
            this.provider.pause();
            return this;
        },
        /**
         * 
         * @returns {MediaPlayer}
         */
        stop : function () {
            this.provider.setTime(0);
            this.provider.pause();
            return this;
        }, 
        /**
         * 
         * @returns {MediaPlayer}
         */
        load : function () {
            this.provider.load();
            return this;
        },
        /**
         * @param {Boolean} muted
         * @returns {MediaPlayer}
         */
        setMuted : function (muted) {
            return this.provider.setMuted(muted);
            return this;
        },
        /**
		*
		*@param {Number} value
		*@return {MediaPlayer}
		*/
		setVolume : function  (value) {
			this.provider.setVolume(value);
			return this;
		}
    };
    
    MediaPlayer.constants = {
        HTML5 : 1,
        AUDIO : 2,
        VIDEO : 3,
        FLASH : 4
    };
    
	MediaPlayer.defaultOptions = {
		type : MediaPlayer.constants.AUDIO,
		use : MediaPlayer.constants.HTML5,
        loop : false,
        autoplay : false,
        preload : false,
        autobuffer : false,
        volume : 100,
        controls : false,
        source : []
	};
    
   
    
    MediaPlayer.supportAudioHTML5 = function supportAudioHTML5() {
        return (!window.HTMLAudioElement) ? false : true;
    };
    
    MediaPlayer.supportVideoHTML5 = function supportVideoHTML5 () {
        return (!window.HTMLVideoElement) ? false : true;
    };
    
    window.MP = MediaPlayer;
	 
})(window);