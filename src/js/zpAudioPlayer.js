/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

;(function (MP) {
    
    'use strict';
    
    var zpAudioPlayer = function (options) {
        if(!(this instanceof zpAudioPlayer)){
			return new zpAudioPlayer(options);
		}
        this.provider = new MP({
            source : [
                
            ]
            
        });
        return this;
    };
    
    zpAudioPlayer.prototype = {
        
        constructor : zpAudioPlayer,
        
        provider : null,
        /**
         * 
         * @return {zpAudioPlayer}
         */
        play : function () {
            
            return this;
        },
        /**
         * 
         * @return {zpAudioPlayer}
         */
        pause : function () {
            
            return this;
        },
        /**
         * 
         * @return {zpAudioPlayer}
         */
        toggle : function () {
            
            return this;
        },
        /**
         * @param {Boolean} mute
         * @return {zpAudioPlayer}
         */
        mute : function (mute) {
            
            return this;
        },
        /**
         * @param {Number} value
         * @return {zpAudioPlayer}
         */
        setVolume : function (value) {
            
            return this;
        },
        /**
         * 
         * @return {zpAudioPlayer}
         */
        nextTrack : function () {
            
            return this;
        },
        /**
         * 
         * @return {zpAudioPlayer}
         */
        prevTrack : function () {
            
            return this;
        },
        /**
         * 
         * @return {zpAudioPlayer}
         */
        looped : function () {
            
            return this;
        }
    };
    
    zpAudioPlayer.defaultOptions = {
        
    };
    
    
})(window.MP);
