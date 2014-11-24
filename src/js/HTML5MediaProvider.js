;(function (window, MP,document) {
    
    'use strict';
    
    var propertys = ['loop','preload','autobuffer','autoplay'],
    
    addSourceToMedia = function addSourceToVideo (element, sources) {
		var i,source;
		for(i = 0; i < sources.length; i++){			
			source = t.dom.create('source',{
				src : sources[i].src,
				type : sources[i].type
			});
			t.dom(element).append(source);
		}		
	};
    
    var HTML5MediaProvider = function (options) {
        
        if(!(this instanceof HTML5MediaProvider)){
			return new HTML5MediaProvider(options);
		}
        this.options = t.combine(HTML5MediaProvider.defaultOptions,options);
        if(this.options['type'] === MP.constants.AUDIO) {
            this.element = document.createElement('audio');
        }
        else{
            this.element = document.createElement('video');
        }
        propertys.forEach(function (name) {
			if(this.options[name] === true){
				window.t.dom(this.element).attr(name,'');
			}
		}.bind(this));
        addSourceToMedia(this.element,this.options['source']);
        return this;
    };
    
    HTML5MediaProvider.prototype = {
        
        constructor : HTML5MediaProvider,
        
        /**
		* 
		*@returns {Boolean}
		*/
		get played () {
			return !this.element.paused;
		},
        /**
		*
		*@returns {Boolean}
		*/
		get paused () {
			return this.element.paused;
		},
		/**
		*
		*@returns {Boolean}
		*/
		get ended () {
			return this.element.ended;
		},
		/**
		*
		*@return {Number} volume value
		*/
		get volume () {
			return this.element.volume * 100;
		},
        /**
		* Get current time
		*@return {Number} current time
		*/
		get time () {
			return this.element.currentTime;
		},
		/**
		* Get duration video
		*@return {Number} current time
		*/
		get duration () {
			return this.element.duration;
		},
		/**
		* Get progress download in percent
		*@return {Number} 
		**/
		get progressLoad () {
			if(this.element.buffered.length > 0){
				return (this.element.buffered.end(0) / this.element.duration) * 100;				
			}
			else{
				return 0;
			}
		},
		/**
		* Get progress lost in percent
		*@returns {Number}
		**/
		get progress () {
			return  (100 / this.element.duration) * this.element.currentTime;		
		},
		/**
		* Set status mute
		*@param {Boolean} muted 
		*@return {HTML5MediaProvider}
		*/
		setMuted : function (muted) {
			return this.element.muted = muted;
			return this;
		},
		/**
		* Rewind the video
		*@param {Number} time
		*@return {HTML5MediaProvider}
		*/
		setTime  : function (time) {					
			this.element.currentTime = time;			
			return this;
		},
        /**
		*
		*@param {Number} value
		*@return {HTML5MediaProvider}
		*/
		setVolume : function  (value) {
			this.element.volume = value / 100;
			return this;
		},
        /**
		* Play video
		*@return {HTML5MediaProvider}
		*/
		play : function () {
			if(this.played){
				return;
			}							
			this.element.play();						
			return this;
		},
		/**
		*
		* Pause 
		*@return {HTML5MediaProvider}
		*/
		pause : function () {
			this.element.pause();			
			return this;
		},
        /**
		*
		* Load source
		*@return {HTML5MediaProvider}
		*/		
        load : function () {
            this.element.load();
            return this;
        },
        on : function (event, callback ) {
            t.dom(this.element).bind(event,callback);
        }
    };
    
    HTML5MediaProvider.defaultOptions = {
        loop : false,
        autoplay : false,
        preload : false,
        autobuffer : false,
        volume : 100,
        controls : false,
        type : MP.constants.AUDIO,
        source : []
    };
    
    /**
    * 
    * @param {String} type
    * @param {String} source
    * @returns {Boolean}
    */
    HTML5MediaProvider.canPlayType = function (type,source) {
            var provider;
            if(type === MP.constants.AUDIO) {
                provider = document.createElement('audio');
            }
            else{
                provider = document.createElement('video');
            }
            return !!(provider.canPlayType && provider.canPlayType(source).replace(/no/, ''));
        },
    
    MP.HTML5Provider = HTML5MediaProvider;
})(window,window.MP,document);