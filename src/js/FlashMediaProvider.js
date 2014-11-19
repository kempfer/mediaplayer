
;(function (window,MP,document) {
    
    'use strict';
    
    var FlashMediaProvider = function (options) {
        
        if(!(this instanceof FlashMediaProvider)){
			return new FlashMediaProvider(options);
		}
        this.options = t.combine(FlashMediaProvider.defaultOptions, options);
        
        return this;
    };
    
    FlashMediaProvider.prototype = {
        
        constructor : FlashMediaProvider
        
    };
    
    FlashMediaProvider.defaultOptions = {
        loop : false,
        autoplay : false,
        preload : false,
        autobuffer : false,
        volume : 100,
        controls : false,
        type : MP.constants.AUDIO,
        source : []
    };
    
})(window,window.MP,document);