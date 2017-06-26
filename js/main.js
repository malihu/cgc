/*var player,playerReady,videoList='To5oBOMAte8,0zsh2Qx2bbQ,sAspme4mzfg,W_lDC3VmgJs,RKFoT6dVRiA,HuBO4QdZPmY,fEUAsuF2XkY,fFs_SS6LcEo',videos=videoList.split(","),
	player1stVideo,player1stVideoList,restAPI_pages_ready,restAPI_videoList_ready;*/
var player,playerReady,videoList,videos,player1stVideo,player1stVideoList,restAPI_pages_ready,restAPI_videoList_ready;

(function($){
	
	
	
})(jQuery);

(function($){
	
	$(function(){
		
		//rest api -----
		$.ajax({
			url:"https://cms.malihu.com/cgc/wp-json/wp/v2/pages", 
			crossDomain:true,
			type:"GET",
			success:function(data){
				$.each(data,function(){
					//console.log( this.title ,this.content);
					//console.log( this.slug );
					if(this.slug==="home"){
						var _l=this.acf.videos.map(function(elem){
							return elem.video_id;
						}).join(",");
						//console.log( _l );
						videoList=_l;
						videos=videoList.split(",");
						
						// -----
						//auto-create video list
						var videoListMarkup="";
						for(var i=0; i<videos.length; i++){
							//console.log(videos[i]);
							var val=videos[i],
								videoList_i=$.grep(videos,function(value){
									return value!=val;
								});
							//console.log(videoList_i);
							videoListMarkup +="<li><a href='https://www.youtube.com/embed/"+val+"?enablejsapi=1&amp;playlist="+videoList_i.join(",")+"&amp;rel=0&amp;controls=1&amp;showinfo=0&amp;autoplay=1' data-yt-video='"+val+"' target='video-player'><img src='https://img.youtube.com/vi/"+val+"/mqdefault.jpg' /></a></li>";
							if(!player1stVideo){
								player1stVideo=val;
								player1stVideoList=videoList_i.join(",");
								//console.log(player1stVideo, player1stVideoList);
							}
						}
						//console.log(videoListMarkup);
						$("#video-nav").html(videoListMarkup);
						restAPI_videoList_ready=1;
						// -----
						
					}
					if(this.slug==="about"){
						$("#about-content").html(this.content.rendered);
					}
				});
				restAPI_pages_ready=1;
			},
			cache:false
		});
		// -----
		
		$("#video-nav").on("click","li a",function(e){
			e.preventDefault();
			player.playVideoAt($(this).parent().index());
		});
		
		$("#site-nav a, a[href='#top']").mPageScroll2id({
			live:false,
			scrollSpeed:700
		});
		
	});
	
	$(window).on("load scroll",function(){
		//suspend bg video when scrolled to the content
		//console.log($(this).scrollTop());
		var scrolledToContent=$("#site-nav .mPS2id-highlight").length,mainVideo=$("#video");
		if(scrolledToContent){
			if(playerReady) player.pauseVideo();
			mainVideo.addClass("suspend");
		}else{
			mainVideo.removeClass("suspend");
		}
	});

})(jQuery);

function onYouTubeIframeAPIReady() {
	//console.log( YT.loaded );
	var checkYT = setInterval(function () {
		//console.log( "YT api loaded: "+YT.loaded );
    	if(YT.loaded && restAPI_pages_ready && restAPI_videoList_ready){
			player = new YT.Player('video-player', {
				width: 600,
				height: 400,
				videoId: player1stVideo,
				playerVars: {
					color: 'white',
					showinfo: 0,
					//autoplay: 1,
					rel: 0,
					//0zsh2Qx2bbQ,sAspme4mzfg,Nln_ONLzehI,TF_32PYY-RM,1MgQ7K_1Fng,W_lDC3VmgJs,EFvLvmyv1iM,ohSMsnz0Qe4,RKFoT6dVRiA,HuBO4QdZPmY,fEUAsuF2XkY,fFs_SS6LcEo,T5EXH-r0738,Nfy18lvADOA,1LZeV1gAizg,HzjOogDeZss
					//'0zsh2Qx2bbQ,sAspme4mzfg,W_lDC3VmgJs,RKFoT6dVRiA,HuBO4QdZPmY,fEUAsuF2XkY,fFs_SS6LcEo'
					playlist: player1stVideoList
				},
				events: {
					onReady: onPlayerReady,
					onStateChange: onPlayerStateChange
				}
			});
			clearInterval(checkYT);
		}
	},100);
}

function onPlayerReady(event){
	//console.log(event);
	playerReady=1;
}

function onPlayerStateChange(event){
	switch (event.data){
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