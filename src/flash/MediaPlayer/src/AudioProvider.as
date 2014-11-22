package  
{
	import flash.events.*;	
	import flash.external.*;
	import flash.media.Sound;
	import flash.media.SoundChannel;
	import flash.media.SoundMixer;	
	import flash.media.SoundTransform;	
	import flash.utils.ByteArray;
	import flash.net.URLRequest;
	import flash.system.*;
	import flash.display.Sprite;	
	import flash.media.SoundLoaderContext;
	import flash.events.IOErrorEvent;
	import flash.external.ExternalInterface;
	/**
	 * ...
	 * @author zotov_mv@groupbwt.com
	 */
	
	public class AudioProvider extends Sprite
	{
		public static const EventList:Object = {
			ON_PROGRESS : 'progress'
		};
		
		private var sound:Sound;
		
		public var source:String;
		
		private var soundChannel:SoundChannel;
		
		private var byteFrequencyData:ByteArray;
		
		private var arrayFrequencyData:Array;
		
		private var isPlaying:Boolean;
		
		private var trans:SoundTransform;
		
		private var _currentTime:Number;
		
		private var _volume:Number = 1;
		
		private var _mute:Boolean;
		
		private var _loop:Boolean;
		
		private var _autoplay:Boolean;
		
		private var _autobuffer:Boolean;
		
		private var _duration:Number;
		
		private var _lastVolume:Number;
		
		private var _ended:Boolean;
		

		
		/**
		 * 
		 */
		public function AudioProvider() {
			this.sound = new Sound();
			this.soundChannel = new SoundChannel();
			this.byteFrequencyData = new ByteArray();
			this.arrayFrequencyData = new Array();
			this.trans = new SoundTransform(1, 0);
			this.isPlaying = false;
			this._ended = false;
		}
		
		/**
		 * 
		 */
		public function get paused ():Boolean {
			return 	!this.isPlaying;
		}
		/**
		 * 
		 */
		public function get played ():Boolean {
			return this.isPlaying;
		}
		/**
		 * 
		 */
		public function get duration ():Number {
			return this._duration;
		}
		/**
		 * 
		 */
		public function get canplay ():Boolean {
			//TODO  реалтзовать функционал
			return true;
		}
		
		/**
		 * 
		 */
		public function get progress ():Number {
			return (this.currentTime / this.duration) * 100;
			
		}
		/**
		 * 
		 */
		public function get progressLoad ():Number {
			return (this.sound.bytesLoaded / this.sound.bytesTotal) * 100;
		}
		
		/**
		 * 
		 */		
		public function get currentTime ():Number {
			return soundChannel.position;
		}
		/**
		 * 
		 * @param	time
		 */
		public function set currentTime (time:Number):void {
			this._currentTime = time;
		}
		
		public function get volume ():Number {
			return this._volume;
		}
		/**
		 * 
		 * @param	volume
		 */
		public function set volume (volume:Number):void {
			//TODO  реалтзовать функционал
			this._volume = volume;
			this.trans.volume = this._volume;
			this.soundChannel.soundTransform = this.trans;
		}
		/**
		 * 
		 */
		public function get mute ():Boolean {
			return this._mute;
		}
		/**
		 * 
		  * @param	mute 
		 */
		public function set mute (mute:Boolean):void {
			//TODO  реалтзовать функционал
			this._mute = mute;
			if (this._mute === true) {
				this._lastVolume = this.volume;
				this.volume = 0;
			}
			else {
				this.volume = this._lastVolume;
			}
		}
		/**
		 * 
		 */
		public function get loop ():Boolean {
			return this._loop;
		}
		/**
		 * 
		  * @param	loop 
		 */
		public function set loop (loop:Boolean):void {
			//TODO  реалтзовать функционал
			this._loop = loop;
		}
		/**
		 * 
		 */
		public function get autoplay ():Boolean {
			return this._autoplay;
		}
		/**
		 * 
		  * @param	autoplay 
		 */
		public function set autoplay (autoplay:Boolean):void {
			//TODO  реалтзовать функционал
			this._autoplay = autoplay;
		}
		/**
		 * 
		 */
		public function get autobuffer ():Boolean {
			return this._autobuffer;
		}
		/**
		 * 
		  * @param	autobuffer 
		 */
		public function set autobuffer (autobuffer:Boolean):void {
			//TODO  реалтзовать функционал
			this._autobuffer = autobuffer;
		}
		/**
		 * 
		 */
		public function get ended ():Boolean {
			//TODO  реалтзовать функционал
			return this._ended;
		}
		/**
		 * 
		 */
		public function get frequencyData () :Array {
			SoundMixer.computeSpectrum(this.byteFrequencyData , false, 0);		
			this.arrayFrequencyData = [];
			var _local1:int;
			var _local2:int = this.byteFrequencyData.length/4;
			while (_local1 < _local2) {
				this.arrayFrequencyData.push(int(this.byteFrequencyData.readFloat() * 1000));
				_local1++;
			}
			return this.arrayFrequencyData;
		}
		
		/**
		 * 
		 * @param	source
		 */
		public function load (source:String):AudioProvider {
			if (this.source == source) {
				return this;
			}
			this.source = source;
			var req:URLRequest = new URLRequest(this.source);
			this.sound.addEventListener(Event.OPEN, this.onOpen);
			this.sound.addEventListener(SampleDataEvent.SAMPLE_DATA, this.onSampleData);
			this.sound.addEventListener(Event.ID3, this.onLoadMetaData);
			this.sound.addEventListener(Event.COMPLETE, this.onLoadCompLete);
			this.sound.addEventListener(ProgressEvent.PROGRESS, this.onProgressLoad);	
			this.sound.addEventListener(IOErrorEvent.IO_ERROR, this.errorHandler);
			this.sound.load(req);
		//	this.play(0);
			return this;
		}
		/**
		 * 
		 * @param	time
		 */
		public function play (time:Number = 0):AudioProvider {
			try {
				if (this.isPlaying == true) {
					return this;
				}
				this.pause();
				this.soundChannel = this.sound.play(time,0,this.trans);	
				this.trans.volume = this._volume;			
				this.soundChannel.soundTransform = this.trans;			
				//this.addEventListener(Event.ENTER_FRAME, this.onEnterFrame);
				this.soundChannel.addEventListener(Event.SOUND_COMPLETE, this.onPlaybackComplete);	
				this.isPlaying = true;
				trace('play');
			}
			catch (error:Error) {
				trace(error.message);
			}
			return this;
			
		}
		/**
		 * 
		 *
		 */
		public function pause ():AudioProvider {
			if (!this.isPlaying) {
				return this;
			}
			this.soundChannel.stop();
			this.isPlaying = false;
			this.removeEventListener(Event.ENTER_FRAME, this.onEnterFrame);
			this.soundChannel.addEventListener(Event.SOUND_COMPLETE, this.onPlaybackComplete);	
			trace('pause');
			return this;
		}
		
		/**
		 * 
		 *
		 */
		public function stop (): AudioProvider {
			this._currentTime = 0;
			this.soundChannel.stop();
			this.isPlaying = false;
			this.removeEventListener(Event.ENTER_FRAME, this.onEnterFrame);
			this.soundChannel.addEventListener(Event.SOUND_COMPLETE, this.onPlaybackComplete);
			trace('stop');
			return this;
		}
		/**
		 * 
		 *
		 */
		public function toggle ():AudioProvider {
			if (this.isPlaying) {
				this.pause();
			}
			else {
				this.play();
			}
			return this;
		}
		/**
		 * 
		 * @return String
		 */
		public function getMemoryUse():String {
			return System.totalMemory.toString();
		}
		/**
		 * 
		 *
		 */
		private function onLoadMetaData (event:Event):void {
			//TODO  реалтзовать функционал
			this.sound.removeEventListener(Event.ID3, this.onLoadMetaData);
			trace("Album: " + this.sound.id3.album);
			trace("Artist: " + this.sound.id3.artist);
			trace("Comment: " + this.sound.id3.comment);
			trace("Genre: " + this.sound.id3.genre);
			trace("songName: " + this.sound.id3.songName);
			trace("Track: " + this.sound.id3.track);
			trace("Year: " + this.sound.id3.year);
			trace("Year: " + this.sound.id3.TFLT);
			
			//mySound.id3.TFLT;
			trace('onLoadMetaData');
		}
		/**
		 * 
		 *
		 */
		private function onLoadCompLete (event:Event):void {
			//TODO  реалтзовать функционал
			this.sound.removeEventListener(ProgressEvent.PROGRESS, this.onProgressLoad);
			this.sound.removeEventListener(IOErrorEvent.IO_ERROR, this.errorHandler);
			this.sound.removeEventListener(SampleDataEvent.SAMPLE_DATA, this.onSampleData);
			trace('onLoadCompLete');
		}
		/**
		 * 
		 *
		 */
		private function onProgressLoad (event:ProgressEvent):void {
			//TODO  реалтзовать функционал
			//trace(this.sound.bytesLoaded);
			//trace('progressLoad');
			//trace(this.progressLoad);
			//trace(this._duration )
			if (this.sound && this.sound.length > 0) {
				this._duration = (this.sound.bytesTotal / (this.sound.bytesLoaded / this.sound.length));
			}
			this.dispatchEvent(new Event(AudioProvider.EventList.ON_PROGRESS));
		}
		
		/**
		 * 
		 * @param	event
		 */
		private function onPlaybackComplete (event:Event):void {
			//TODO  реалтзовать функционал
			this.removeEventListener(Event.ENTER_FRAME, this.onEnterFrame);
			this.isPlaying = false;
			this._ended = true;
			trace("PlaybackComplete");
		}
		/**
		 * 
		 * @param	event
		 */
		private function errorHandler (event:IOErrorEvent):void {
			trace(event.text);
		}
		
		/**
		 * 
		 * @param	event
		 */
		private function onEnterFrame (event:Event):void {
			SoundMixer.computeSpectrum(this.byteFrequencyData , false, 0);		
			this._currentTime = soundChannel.position;
			this.arrayFrequencyData = [];
			var _local1:int;
			var _local2:int = this.byteFrequencyData.length/4;
			while (_local1 < _local2) {
				this.arrayFrequencyData.push(int(this.byteFrequencyData.readFloat() * 1000));
				_local1++;
			}
			this.getCurrentTime();
			//trace(this.currentTime);
		}
		
		
		/**
		 * 
		 * @param	event
		 */
		private function onOpen (event:Event) :void {
			//TODO  реалтзовать функционал
			trace('onOpen');
			trace(this._duration)
		}
		
		/**
		 * 
		 * @param	event
		 */
		private function onSampleData (event:SampleDataEvent):void {
			trace('onSampleData');
		}
		
		public function getCurrentTime ():Number {
			//ExternalInterface.call('console.log', c);
			trace(this._currentTime);
			return soundChannel.position;
		}

	}

}