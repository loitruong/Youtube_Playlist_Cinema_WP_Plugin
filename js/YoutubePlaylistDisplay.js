/* Youtube Playlist Cinema 1.0
 * http://loitruong.us/
 *
 * Copyright 2015 Loi Truong;
 * Licensed under the MIT license 
 */
 $("document").ready(function(){
 	youtubePlaylistCinema();
 });
function youtubePlaylistCinema(){
		/* initialize data start here */
		var playlistID = $("#youtube-playlist-cinema").attr("playlistId");		
		var playlistTitle = 'Planet Earth';
		var YoutubeAPIKey = $("#youtube-playlist-cinema").attr("api-key");
		var nextButton = '<i class="fa fa-chevron-right"></i>';
		var prevButton = '<i class="fa fa-chevron-left"></i>';
		var preloadersvg = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 500 500" xml:space="preserve" enable-background="new 0 0 500 500"><path d="M250 0c14 0 24 10 24 24v94c0 14-10 25-24 25s-25-11-25-25V24C225 10 236 0 250 0z" fill="#010002"/><path d="M137 53l55 76c12 16 0 39-20 39 -8 0-14-3-19-10L98 82c-8-11-6-26 5-34S129 42 137 53z" fill="#010002"/><path d="M28 204c-13-4-20-18-16-31s18-20 31-16l89 29c13 4 20 18 16 31 -3 10-14 17-24 17 -3 0-4-1-7-2L28 204z" fill="#010002"/><path d="M148 283c4 13-3 27-16 31l-89 29c-3 1-5 1-8 1 -10 0-20-7-23-17 -4-13 3-27 16-31l89-29C130 263 144 270 148 283z" fill="#010002"/><path d="M187 337c11 8 13 23 5 34l-55 76c-5 7-12 10-20 10 -20 0-31-23-19-39l55-76C161 331 176 329 187 337z" fill="#010002"/><path d="M250 357c14 0 24 11 24 25v93c0 14-10 25-24 25s-25-11-25-25v-93C225 368 236 357 250 357z" fill="#010002"/><path d="M347 342l55 76c12 16 0 39-20 39 -8 0-14-3-19-10l-55-76c-8-11-6-26 5-34S339 331 347 342z" fill="#010002"/><path d="M472 296c13 4 20 18 16 31 -3 10-14 17-24 17 -3 0-4 0-7-1l-89-29c-13-4-20-18-16-31s18-20 31-16L472 296z" fill="#010002"/><path d="M352 217c-4-13 3-27 16-31l89-29c13-4 27 3 31 16s-3 27-16 31l-89 28c-3 1-5 2-8 2C365 234 355 227 352 217z" fill="#010002"/><path d="M327 168c-20 0-31-23-19-39l55-76c8-11 23-13 34-5s13 23 5 34l-55 76C342 165 335 168 327 168z" fill="#010002"/></svg>';
		var mainurl = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId='+ playlistID +'&key=' + YoutubeAPIKey;
		//Slider Initial
		var numberImage, numberShowImage, currentImage, gutterBetweenImages, eachImageSize, startPosition, endPosition;
		var nextPageToken;
		var resizeReady;
		$("#youtube-playlist-cinema .playlist-trigger").on("click", function(){
			$("html, body").css("overflow", "hidden");
			$("#youtube-playlist-cinema").append("<div class='loiModal'><div class='preloader'>"+ preloadersvg +"</div><div class='content'><div class='video'><div class='video-title'>"+ playlistTitle +"</div><div class='video-container'></div></div><div class='video-comment'><div class='comment-title'>Comments</div><div class='comments'></div></div><div class='video-list'><div class='list-track'></div><div class='prev'>"+ prevButton+"</div><div class='next'>"+ nextButton +"</div></div></div><div class='layoutbackground'></div><div class='close'>X</div></div>");
			$("#youtube-playlist-cinema .loiModal").animate({
				left: 0
			},500,function(){
				$("#youtube-playlist-cinema .loiModal").css("left", "0px");
			});
			videoRecursive(mainurl);
		});
		function videoRecursive($url){
			$.ajax({
				method: "GET",
			  	url: $url,
			}).done(function( data ) {
				if(data.nextPageToken != null && data.nextPageToken != undefined && nextPageToken != data.nextPageToken){
					for (var i = 0; i < data.items.length; i++) {
						try{
							$("#youtube-playlist-cinema .list-track").append("<div class='image' title='"+ data.items[i].snippet.title +"' videoID='"+ data.items[i].snippet.resourceId.videoId +"' style='background-image: url(\""+ data.items[i].snippet.thumbnails.high.url +"\");' ></div>");
						}catch(e){
							$("#youtube-playlist-cinema .list-track").append("<div class='image' title='"+ data.items[i].snippet.title +"' videoID='"+ data.items[i].snippet.resourceId.videoId +"' style='background-image: url(\"http://placehold.it/350?text=Not+Available\");' ></div>");
						}
					};
					var url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId='+ playlistID +'&key=' + YoutubeAPIKey + '&pageToken=' + data.nextPageToken;
					nextPageToken = data.nextPageToken;
					videoRecursive(url);
				}else{
					for (var i = 0; i < data.items.length; i++) {
						try{
							$("#youtube-playlist-cinema .list-track").append("<div class='image' title='"+ data.items[i].snippet.title +"' videoID='"+ data.items[i].snippet.resourceId.videoId +"' style='background-image: url(\""+ data.items[i].snippet.thumbnails.high.url +"\");' ></div>");
						}catch(e){
							$("#youtube-playlist-cinema .list-track").append("<div class='image' title='"+ data.items[i].snippet.title +"' videoID='"+ data.items[i].snippet.resourceId.videoId +"' style='background-image: url(\"http://placehold.it/350?text=Not+Available\");' ></div>");
					 	}
					};
					sliderInitial();
				}
		  		
		    }).error(function(error){
		    	if(error.status == 403){
		    		$("#youtube-playlist-cinema .loiModal").remove();
		    		$("#youtube-playlist-cinema").empty();
		    		$("#youtube-playlist-cinema").append("<span style='color: red'>Please check your youtube api key</span>");
		    	}
		    });
		}
		function commentRecursive($url, $videoID){
			$.ajax({
				method: "GET",
			  	url: $url,
			}).done(function( data ) {
				$("#youtube-playlist-cinema .comments .loadMoreComment").remove();
				for (var i = 0; i < data.items.length; i++) {
					var authorName = data.items[i].snippet.topLevelComment.snippet.authorDisplayName;
					var comment = data.items[i].snippet.topLevelComment.snippet.textDisplay;
					var totalReply = '';
					if(data.items[i].snippet.totalReplyCount > 0){
						if(data.items[i].snippet.totalReplyCount == 1){
						totalReply = "<a class='loadMoreReply' parentId='"+ data.items[i].id +"'>("+ data.items[i].snippet.totalReplyCount +") reply </a>";
						}else{
						totalReply = "<a class='loadMoreReply' parentId='"+ data.items[i].id +"'>("+ data.items[i].snippet.totalReplyCount +") replies </a>";
						}
					}
					$("#youtube-playlist-cinema .comments").append("<div class='eachComment'><div class='author'>"+ authorName +"</div><div class='text'>" + comment + "<br>" + totalReply +"<div class='replies'></div></div></div>");
				};
				if(data.nextPageToken != null && data.nextPageToken != undefined && data.nextPageToken != ''){
					$("#youtube-playlist-cinema .comments").append("<div class='loadMoreComment' videoId='"+ $videoID +"' nextPageToken='"+ data.nextPageToken +"'>Load More Comments</div>");
				}
		    }).error(function(error){
		    	console.log(error);
		    });
		}
		function commentReplies($url, $replies){
			$.ajax({
				method: "GET",
			  	url: $url,
			}).done(function( data ) {
				for (var i = 0; i < data.items.length; i++) {
					var authorName = data.items[i].snippet.authorDisplayName;
					var comment = data.items[i].snippet.textDisplay;
					$replies.append("<div class='eachReply'><div class='author'>"+ authorName +"</div><div class='text'>" + comment + "</div></div>");
				};
				$replies.siblings(".loadMoreReply").remove();
		    }).error(function(error){
		    	console.log(error);
		    });
		}
		function sliderInitial(){
			numberImage = $("#youtube-playlist-cinema .list-track .image").length;
			numberShowImage = responsive();
			currentImage = numberShowImage;
			gutterBetweenImages= 10;
			eachImageSize = ($("#youtube-playlist-cinema .video-list").width() - (gutterBetweenImages*numberShowImage))/numberShowImage + gutterBetweenImages;
			 startPosition = -(eachImageSize * numberShowImage) + 10;
			$("#youtube-playlist-cinema .list-track .image").css({
			  "width" : eachImageSize - gutterBetweenImages,
			  "margin-right" : gutterBetweenImages,
			  "height" : $("#youtube-playlist-cinema .video-list").height(),
			});
			$("#youtube-playlist-cinema .loiModal .layoutbackground").css("z-index", "1");
			$("#youtube-playlist-cinema .preloader").remove();
			endPosition = -(numberImage)*eachImageSize + 10;
			var afterInsertCount = 0;
			$("#youtube-playlist-cinema .list-track .image").each(function(index){
			  $(this).addClass("slick-item");
			  if(index == 0){
			  	$(this).addClass("playing");
			  	$('#youtube-playlist-cinema .video-container').append('<iframe allowfullscreen="allowfullscreen" width="420" height="315" src="http://www.youtube.com/embed/'+ $(this).attr("videoID") +'?autoplay=1"></iframe>');
			  	var height = $('#youtube-playlist-cinema .video').height() - $('#youtube-playlist-cinema .video-title').height() - 10;
			  	$('#youtube-playlist-cinema .video-container, #youtube-playlist-cinema .comments').css("height", height);
			  	var urlComment= 'https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=20&order=relevance&textFormat=plainText&videoId='+ $(this).attr("videoID") +'&key=' + YoutubeAPIKey;
			  	commentRecursive(urlComment, $(this).attr("videoID"));
			  }
			  if(index < numberShowImage){
			    $("#youtube-playlist-cinema .list-track").append($(this).clone().addClass("clone-item"));
			  }
			  if(index >= numberImage - numberShowImage){
			    $("#youtube-playlist-cinema .list-track .image").eq(afterInsertCount).before($(this).clone().addClass("clone-item"));
			    afterInsertCount++;
			  };
			});
			$('#youtube-playlist-cinema .list-track').css("left", startPosition );
		}
		function responsive(){
			if($(window).width() < 1300 && $(window).width() > 991){
				return 4;
			}
			if($(window).width() < 992 && $(window).width() > 550){
				return 3;
			}
			if($(window).width() < 551 ){
				return 2;
			}
			return 5;
		}
/*
		Windows Resize Event
*/
		var resizeTimer;

		$(window).on('resize', function(e) {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function() {
				initialAgain();
			}, 250);

		});
		function initialAgain(){
			$("#youtube-playlist-cinema .list-track .clone-item").remove();
			numberImage = $("#youtube-playlist-cinema .list-track .image").length;
			numberShowImage = responsive();
			currentImage = numberShowImage;
			gutterBetweenImages= 10;
			eachImageSize = ($("#youtube-playlist-cinema .video-list").width() - (gutterBetweenImages*numberShowImage))/numberShowImage + gutterBetweenImages;
			 startPosition = -(eachImageSize * numberShowImage) + 10;
			$("#youtube-playlist-cinema .list-track .image").css({
			  "width" : eachImageSize - gutterBetweenImages,
			  "margin-right" : gutterBetweenImages,
			  "height" : $("#youtube-playlist-cinema .video-list").height(),
			});
			endPosition = -(numberImage)*eachImageSize + 10;
			var afterInsertCount = 0;

			$("#youtube-playlist-cinema .list-track .image").each(function(index){
			  $(this).addClass("slick-item");
			  
			  if(index < numberShowImage){
			    $("#youtube-playlist-cinema .list-track").append($(this).clone().addClass("clone-item"));
			  }
			  if(index >= numberImage - numberShowImage){
			    $("#youtube-playlist-cinema .list-track .image").eq(afterInsertCount).before($(this).clone().addClass("clone-item"));
			    afterInsertCount++;
			  };
			});
			$('#youtube-playlist-cinema .list-track').css("left", startPosition );
			var height = $('#youtube-playlist-cinema .video').height() - $('#youtube-playlist-cinema .video-title').height() - 10;
			$('#youtube-playlist-cinema .video-container, #youtube-playlist-cinema .comments').css("height", height);
		}

/*


		CLICK EVENTS


*/
		$("#youtube-playlist-cinema").on("click",".next",function(){
		  var thisButton = $(this);
		  if(thisButton.attr('clickEvent') != "disabled"){
		     thisButton.attr('clickEvent', 'disabled');
		    if(currentImage > numberImage - numberShowImage && currentImage != numberImage){
		        var position =  parseInt($('#youtube-playlist-cinema .list-track').css("left")) - (eachImageSize * (numberImage%numberShowImage));
		        $('#youtube-playlist-cinema .list-track').animate({
		          left: position,
		        },500, function(){
		          $('#youtube-playlist-cinema .list-track').css("left", position );
		          thisButton.removeAttr('clickEvent');
		        });
		        currentImage += numberImage%numberShowImage;
		    }else if(currentImage == numberImage){
		      var position = parseInt($('#youtube-playlist-cinema .list-track').css("left")) - $("#youtube-playlist-cinema .video-list").width();
		      $('#youtube-playlist-cinema .list-track').animate({
		        left: position,
		      },500, function(){
		        $('#youtube-playlist-cinema .list-track').css("left", startPosition );
		        thisButton.removeAttr('clickEvent');
		      });
		      currentImage = numberShowImage;
		    }else{
		     var position = parseInt($('#youtube-playlist-cinema .list-track').css("left")) - $("#youtube-playlist-cinema .video-list").width();
		      $('#youtube-playlist-cinema .list-track').animate({
		        left: position,
		      },500, function(){
		        $('#youtube-playlist-cinema .list-track').css("left", position );
		        thisButton.removeAttr('clickEvent');
		      });
		       currentImage += numberShowImage;
		    }
		  }
		});
		$("#youtube-playlist-cinema").on("click",".prev",function(){
		  var thisButton = $(this);
		  if(thisButton.attr('clickEvent') != "disabled"){
		     thisButton.attr('clickEvent', 'disabled');
		    if(currentImage - numberShowImage < numberShowImage && currentImage != numberShowImage){
		        var position =  parseInt($('#youtube-playlist-cinema .list-track').css("left")) + (eachImageSize * (numberImage%numberShowImage));
		        $('#youtube-playlist-cinema .list-track').animate({
		          left: position,
		        },500, function(){
		          $('#youtube-playlist-cinema .list-track').css("left", position );
		          thisButton.removeAttr('clickEvent');
		        });
		        currentImage = numberShowImage;
		    }else if(currentImage == numberShowImage){
		      var position = parseInt($('#youtube-playlist-cinema .list-track').css("left")) + $("#youtube-playlist-cinema .video-list").width();
		      $('#youtube-playlist-cinema .list-track').animate({
		        left: position,
		      },500, function(){
		        $('#youtube-playlist-cinema .list-track').css("left", endPosition );
		        thisButton.removeAttr('clickEvent');
		      });
		      currentImage = numberImage;
		    }else{
		     var position = parseInt($('#youtube-playlist-cinema .list-track').css("left")) + $("#youtube-playlist-cinema .video-list").width();
		      $('#youtube-playlist-cinema .list-track').animate({
		        left: position,
		      },500, function(){
		        $('#youtube-playlist-cinema .list-track').css("left", position );
		        thisButton.removeAttr('clickEvent');
		      });
		      currentImage -= numberShowImage;
		    }
		  }
		});

		$("#youtube-playlist-cinema").on("click", ".loiModal .close", function(){
			$("html, body").css("overflow", "auto");
			$("#youtube-playlist-cinema .loiModal").animate({
				left: '100%'
			},500, function(){
				$("#youtube-playlist-cinema .loiModal").remove();
			});
		});

		$("#youtube-playlist-cinema").on("click", ".image",function(){
			$('#youtube-playlist-cinema .video-container').empty();
			$('#youtube-playlist-cinema .comments').empty();
			$("#youtube-playlist-cinema .image").removeClass("playing");
			$(this).addClass("playing");
			$('#youtube-playlist-cinema .video-container').append('<iframe allowfullscreen="allowfullscreen" width="420" height="315" src="http://www.youtube.com/embed/'+ $(this).attr("videoID") +'?autoplay=1"></iframe>');
			var urlComment= 'https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=20&order=relevance&textFormat=plainText&videoId='+ $(this).attr("videoID") +'&key=' + YoutubeAPIKey;
			commentRecursive(urlComment, $(this).attr("videoID"));
		});

		$("#youtube-playlist-cinema").on("click", ".loadMoreReply", function(){
			var url = "https://www.googleapis.com/youtube/v3/comments?part=snippet&maxResults=100&parentId="+ $(this).attr("parentId") +"&textFormat=plainText&key=" + YoutubeAPIKey;
			commentReplies(url,$(this).siblings(".replies"));
		});
		$("#youtube-playlist-cinema").on("click", ".loadMoreComment", function(){
			var url = "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&order=relevance&pageToken="+ $(this).attr("nextPageToken") +"&textFormat=plainText&videoId="+ $(this).attr("videoId") +"&key=" +YoutubeAPIKey ;
			commentRecursive(url, $(this).attr("videoId"));
		});
};