var player;

(function($){
	
	$(function(){
		
		$("#video-nav li a").on("click",function(e){
			e.preventDefault();
			player.playVideoAt($(this).parent().index());
		});
		
	});

})(jQuery);

function onYouTubeIframeAPIReady() {
	//console.log( YT.loaded );
	var checkYT = setInterval(function () {
		console.log( "YT api loaded: "+YT.loaded );
    	if(YT.loaded){
			player = new YT.Player('video-player', {
				width: 600,
				height: 400,
				videoId: 'To5oBOMAte8',
				playerVars: {
					color: 'white',
					showinfo: 0,
					autoplay: 1,
					rel: 0,
					playlist: '0zsh2Qx2bbQ,sAspme4mzfg,Nln_ONLzehI,TF_32PYY-RM,1MgQ7K_1Fng,W_lDC3VmgJs,EFvLvmyv1iM,ohSMsnz0Qe4,RKFoT6dVRiA,HuBO4QdZPmY,fEUAsuF2XkY,fFs_SS6LcEo,T5EXH-r0738,Nfy18lvADOA,1LZeV1gAizg,HzjOogDeZss'
				},
				events: {
					//onReady: initialize,
					onStateChange: onPlayerStateChange
				}
			});
			clearInterval(checkYT);
		}
	},100);
}

function onPlayerStateChange(event) {
	switch (event.data) {
		case -1:
			//console.log('unstarted');
			break;
		case 0:
			//console.log('ended');
			break;
		case 1:
			//console.log( player.getVideoData()['video_id'] );
			$("#video-nav .current").removeClass("current");
			$("#video-nav [data-yt-video='"+player.getVideoData()['video_id']+"']").addClass("current");
			break;
		case 2:
			//console.log('paused');
			break;
		case 3:
			//console.log('buffering');
			break;
		case 5:
			//console.log('video cued');
			break;
	}
}