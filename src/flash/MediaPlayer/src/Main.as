package 
{
	import flash.display.Sprite;
	import flash.events.Event;
	
	/**
	 * ...
	 * @author zotov_mv@groupbwt.com
	 */
	public class Main extends Sprite 
	{
		
		public function Main():void 
		{
			
			if (stage) init();
			else addEventListener(Event.ADDED_TO_STAGE, init);
		}
		
		private function init(e:Event = null):void 
		{
			var a:AudioProvider = new AudioProvider();
			a.addEventListener(AudioProvider.EventList.ON_PROGRESS, this.eventHandler);
			removeEventListener(Event.ADDED_TO_STAGE, init);
			// entry point
		}
		
		private function eventHandler (event:Event):void {
			trace("main fire event");
		}
		
	}
	
}