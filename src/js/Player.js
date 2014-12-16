/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

;(function (MP) {
    
    'use strict';
    
    var Player = function (options) {
        if(!(this instanceof Player)){
			return new Player(options);
		}
        this.options = t.combine(Player.defaultOptions, options);
        this.playList = this.options['playList'];
        if(!(this.playList instanceof window.zpPlayList)) {
            new Error('PlayList  not known');
        }
        this.provider = null;
        this._volume = 100;
        return this;
    };
    
    Player.prototype = {
        
        constructor : Player,
        
        options: {},
        
        playList : null,
        
        provider : null,
        /**
         * 
         * @return {Player}
         */
        play : function () {
            if(this.provider !== this.playList.currentTrack.provider) {
                this.provider = this.playList.currentTrack.provider;
            }
            this.provider.play();
            return this;
        },
        /**
         * 
         * @return {Player}
         */
        pause : function () {
            this.provider.pause();
            
            return this;
        },
        /**
         * 
         * @return {Player}
         */
        toggle : function () {
            if(this.provider === null){
                return this.play();
            }
            if(this.provider.paused){
                this.play();
            }
            else{
                this.pause();
            }
            return this;
        },
        /**
         * @param {Boolean} mute
         * @return {Player}
         */
        mute : function (mute) {
            
            return this;
        },
        /**
         * @param {Number} value
         * @return {Player}
         */
        setVolume : function (value) {
            this._volume = value;
            this.playList.currentTrack.provider.setVolume(value);
            return this;
        },
        /**
         * 
         * @return {Player}
         */
        nextPlay : function () {
            this.provider = null;
            this.playList.currentTrack.stop();
            console.log(this.playList.nextTrack);
            this.playList.currentTrack = this.playList.nextTrack;
            this.play();
            return this;
        },
        /**
         * 
         * @return {Player}
         */
        prevPlay : function () {
            this.provider = null;
            this.playList.currentTrack.stop();
            this.playList.currentTrack = this.playList.prevTrack;
            this.play();
            return this;
        },
        /**
         * 
         * @return {Player}
         */
        looped : function () {
            
            return this;
        },
        appendTo : function () {
            
        }
    };
    
    Player.defaultOptions = {
        autoPlayNextTrack : true,
		autoPlayFirstTrack : false,
        playList : null
    };
    
    window.zpPlayer = Player;
})(window.MP);
