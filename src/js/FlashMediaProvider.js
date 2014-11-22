
;(function (window,MP,document) {
    
    'use strict';
     
    var addSwfobject = function (options,callBack) {
        var flashvars = {
		};
		var params = {
			menu: "false",
			scale: "noScale",
			allowFullscreen: "true",
			allowScriptAccess: "always",
			bgcolor: "",
			wmode: "direct"
		};
		var attributes = {
			id:"MediaPlayer-" + t.uniqueId()
		};
		swfobject.embedSWF(
			options.pathToFlash, 
			"altContent", "0%", "0%", "10.0.0",
			"expressInstall.swf", 
			flashvars, params, attributes,embedHandler);
        function embedHandler (e) {
             var id = setInterval(function (){
                if(e.ref.PercentLoaded() === 100){
                    clearInterval(id);
                    callBack(e);
                }
            },60);
        }
    },
    events = {};
    
    
    var FlashMediaProvider = function (options) {
        
        if(!(this instanceof FlashMediaProvider)){
			return new FlashMediaProvider(options);
		}
        this.options = t.combine(FlashMediaProvider.defaultOptions, options);
        addSwfobject(this.options, function (e) {
            this.element = e.ref;
            this.load();
            if(this.options['autoplay'] === true){
                this.play();
            }
        }.bind(this));
        return this;
    };
    
    FlashMediaProvider.prototype = {
        
        constructor : FlashMediaProvider,
        
        /**
		* 
		*@returns {Boolean}
		*/
		get played () {
			return !this.element.paused();
		},
        /**
		*
		*@returns {Boolean}
		*/
		get paused () {
			return this.element.paused();
		},
		/**
		*
		*@returns {Boolean}
		*/
		get ended () {
			return this.element.ended();
		},
		/**
		*
		*@return {Number} volume value
		*/
		get volume () {
			return this.element.volume() * 100;
		},
        /**
		* Get current time
		*@return {Number} current time
		*/
		get time () {
			return this.element.time();
		},
		/**
		* Get duration video
		*@return {Number} current time
		*/
		get duration () {
			return this.element.duration();
		},
		/**
		* Get progress download in percent
		*@return {Number} 
		**/
		get progressLoad () {
			return this.element.progressLoad();
		},
		/**
		* Get progress lost in percent
		*@returns {Number}
		**/
		get progress () {
			return this.element.progress();		
		},
        /**
		* Set status mute
		*@param {Boolean} muted 
		*@return {FlashMediaProvider}
		*/
		setMuted : function (muted) {
			this.element.setMuted(muted);
			return this;
		},
		/**
		* Rewind the video
		*@param {Number} time
		*@return {FlashMediaProvider}
		*/
		setTime  : function (time) {					
			this.element.setTime(time);			
			return this;
		},
        /**
		*
		*@param {Number} value
		*@return {FlashMediaProvider}
		*/
		setVolume : function  (value) {
			this.element.setVolume(value / 100);
			return this;
		},
        /**
		* Play video
		*@return {FlashMediaProvider}
		*/
		play : function () {
			this.element.play();						
			return this;
		},
		/**
		*
		* Pause 
		*@return {FlashMediaProvider}
		*/
		pause : function () {
			this.element.pause();			
			return this;
		},
        /**
		*
		* Load source
		*@return {FlashMediaProvider}
		*/		
        load : function () {
            console.log(this.element);
            this.element.load(this.options['source'][0].src);
            return this;
        },
        on : function (event, func) {
            events[event] = func;
            this.element.on(event, '');
        }
        
    };
    FlashMediaProvider.eventHandler = function (type) {
        if(events[type]) {
            events[type]();
        }
    };
    FlashMediaProvider.defaultOptions = {
        loop : false,
        autoplay : false,
        preload : false,
        autobuffer : false,
        volume : 100,
        controls : false,
        type : MP.constants.AUDIO,
        source : [],
        pathToFlash : 'flash/MediaPlayer/bin/MediaPlayer.swf'
    };
    MP.FlashProvider = FlashMediaProvider;
    
})(window,window.MP,document);