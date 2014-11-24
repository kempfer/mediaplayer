package 
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.external.ExternalInterface;
	
	/**
	 * ...
	 * @author zotov_mv@groupbwt.com
	 */
	public class Main extends Sprite 
	{
		private var provider:AudioProvider;
		private var jsEvents:Array;
		
		public function Main():void 
		{
			
			if (stage) init();
			else addEventListener(Event.ADDED_TO_STAGE, init);
		}
		
		private function init(e:Event = null):void 
		{
			this.provider = new AudioProvider();
			this.provider.addEventListener(AudioProvider.EventList.ON_PROGRESS, this.eventHandler);
			this.provider.addEventListener(AudioProvider.EventList.ON_LOADSTARR, this.eventHandler);
			this.provider.addEventListener(AudioProvider.EventList.ON_PLAY, this.eventHandler);
			this.provider.addEventListener(AudioProvider.EventList.ON_PAUSE, this.eventHandler);
			this.provider.addEventListener(AudioProvider.EventList.ON_ERROR, this.eventHandler);
			removeEventListener(Event.ADDED_TO_STAGE, init);
			if (ExternalInterface.available) {
				try {
					ExternalInterface.addCallback('load', this.load);
					ExternalInterface.addCallback('play', this.play);
					ExternalInterface.addCallback('pause', this.pause);
					ExternalInterface.addCallback('toggle', this.toggle);
					ExternalInterface.addCallback('setMuted', this.setMuted);
					ExternalInterface.addCallback('setTime', this.setTime);
					ExternalInterface.addCallback('setVolume', this.setVolume);
					ExternalInterface.addCallback('played', this.played);
					ExternalInterface.addCallback('paused', this.paused);
					ExternalInterface.addCallback('ended', this.ended);
					ExternalInterface.addCallback('volume', this.volume);
					ExternalInterface.addCallback('duration', this.duration);
					ExternalInterface.addCallback('progressLoad', this.progressLoad);
					ExternalInterface.addCallback('time', this.currentTime);
					ExternalInterface.addCallback('progress', this.progress);
					ExternalInterface.addCallback('autobuffer', this.autobuffer);
					ExternalInterface.addCallback('autoplay', this.autoplay);
					ExternalInterface.addCallback('frequencyData', this.frequencyData);
					//
					ExternalInterface.addCallback('memoryUse', this.getMemoryUse);
					ExternalInterface.addCallback('on', this.on);
				}
				catch (error:SecurityError) {
					trace(error.message);
				}
				catch (error2:Error) {
                    trace(error2.message);
                }
			}
		}
		/**
		 * 
		 * @param	event
		 */
		private function eventHandler (event:Event):void {
			ExternalInterface.call("MP.FlashProvider.eventHandler",event.type);
		}
		/**
		 * 
		 * @return
		 */
		private function progress ():Number {
			return this.provider.progress;
		}
		/**
		 * 
		 * @param	time
		 */
		private function play (time:Number = 0):void {
			this.provider.play(time);
		}
		/**
		 * 
		 */
		private function pause ():void {
			this.provider.pause();
		}
		/**
		 * 
		 * @return
		 */
		private function currentTime ():Number {
			return this.provider.currentTime; 
		}
		/**
		 * 
		 */
		private function toggle ():void {
			this.provider.toggle();
		}
		/**
		 * 
		 * @return 
		 */
		private function played ():Boolean  {
			return this.provider.played;
		}
		/**
		 * 
		 * @return
		 */
		private function paused ():Boolean {
			return this.provider.paused;
		}
		/**
		 * 
		 * @return
		 */
		private function ended ():Boolean {
			return this.provider.ended;
		}
		/**
		 * 
		 * @return
		 */
		private function volume ():Number {
			return this.provider.volume;
		}
		/**
		 * 
		 * @return
		 */
		private function duration ():Number {
			return this.provider.duration;
		}
		/**
		 * 
		 * @return
		 */
		private function progressLoad ():Number {
			return this.provider.progressLoad;
		}
		/**
		 * 
		 * @param	mute
		 */
		private function setMuted (mute:Boolean):void {
			this.provider.mute = mute;
		}
		/**
		 * 
		 * @param	time
		 */
		private function setTime (time:Number):void {
			this.provider.currentTime = time;
		}
		/**
		 * 
		 * @param	volume
		 */
		private function setVolume (volume:Number):void {
			this.provider.volume = volume;
		}
		/**
		 * 
		 * @param	source
		 */
		private function load (source:String):void {
			this.provider.load(source);
		}
		/**
		 * 
		 * @return
		 */
		private function getMemoryUse ():String {
			return this.provider.getMemoryUse();
		}
		/**
		 * 
		 * @param	autobuffer
		 */
		private function autobuffer (autobuffer:Boolean):void {
			this.provider.autobuffer = autobuffer;
		}
		/**
		 * 
		 * @param	autoplay
		 */
		private function autoplay (autoplay:Boolean):void {
			this.provider.autoplay = autoplay;
		}
		/**
		 * 
		 * @param	event
		 * @param	func
		 */
		private function on (event:String):void {
			try {
				this.jsEvents.push(event);
			}
			catch (error:Error) {
				ExternalInterface.call('console.log',error.message);
			}
			
		}
		/**
		 * 
		 * @return
		 */
		private function frequencyData ():Array {
			var frequencyData:Array = this.provider.frequencyData;
			ExternalInterface.call('console.log',frequencyData);
			return frequencyData;
		}
	}
	
}