finalApp.controller('MenuCtrl', ['$scope', '$location', function ($scope, $location) {
	
	$scope.title = "Home";
	$scope.getPath = function (path) {

		var userRegex = /^\/block/, trendRegex = /^\/TT/, path_to_compare = "";

		if(($location.path()).search(userRegex) != -1){
			$scope.title = "Blocked Users";
			path_to_compare = ($location.path()).replace($location.path(), '/block');
		}
		else{
			if(($location.path()).search(trendRegex) != -1){
				$scope.title = "Trending Topics";
				path_to_compare = ($location.path()).replace($location.path(), '/TT');
			}
			else{
				$scope.title = "Home";
				path_to_compare = ($location.path()).replace($location.path(), '/');
			}
		}
	}
	
	
}]);

finalApp.controller('TimelineCtrl', function($scope, $http,$location,UserBlocked,DiffBetweenTimes,convertHTML) {

		var blocks=UserBlocked;
		    $http.get('http://localhost:3000/timeline?count=50')
		    .success(function(response) {
		    	$scope.twitsWithBlocs=response;
		    	$scope.twits=[];
		    	for(var i = 0; i < $scope.twitsWithBlocs.length; i++) {

						if($scope.twitsWithBlocs[i].retweeted_status !=undefined){
		    				var twitText = $scope.twitsWithBlocs[i].retweeted_status.text;
		    				var retweetedBy= '<i class="fa fa-retweet"></i>' + '   '+$scope.twitsWithBlocs[i].user.name +' retweeted';
		    				var twittedBy= $scope.twitsWithBlocs[i].retweeted_status.user ;					
		    				var retweets = $scope.twitsWithBlocs[i].retweeted_status.retweet_count;
		    				var favourites = $scope.twitsWithBlocs[i].retweeted_status.favorite_count;

		    				if($scope.twitsWithBlocs[i].extended_entities!=undefined){

			    				var media = '<img  class="twitPhoto" src="'+ $scope.twitsWithBlocs[i].retweeted_status.extended_entities.media[0].media_url+'">';
			    			}else{
			    				var media = "";
			    			}

			    				if(navigator.userAgent.search("MSIE") !=-1 || navigator.appVersion.search("Trident")!=-1 ){	  
			    					var timeToConvert =  $scope.twitsWithBlocs[i].retweeted_status.created_at; 					
							    	var timeconverted = timeToConvert.replace("+0000", "GMT+0000");		
							    	var tiempo = DiffBetweenTimes.getDiffBetweenTimes(timeconverted), date = new Date(timeconverted);							
								}else{
								 	var tiempo = DiffBetweenTimes.getDiffBetweenTimes($scope.twitsWithBlocs[i].retweeted_status.created_at), date = new Date($scope.twitsWithBlocs[i].retweeted_status.created_at);	
								
								}
		    			}else{
		    				var twitText = $scope.twitsWithBlocs[i].text;
		    				var retweetedBy="";
		    				var twittedBy= $scope.twitsWithBlocs[i].user;
		    				var retweets= $scope.twitsWithBlocs[i].retweet_count;
							var favourites = $scope.twitsWithBlocs[i].favorite_count; 

							if($scope.twitsWithBlocs[i].extended_entities!=undefined){

			    				var media = '<img class="twitPhoto" src="'+$scope.twitsWithBlocs[i].extended_entities.media[0].media_url+'">';
			    			}else{
			    				var media = "";
			    			}
			    			if(navigator.userAgent.search("MSIE") !=-1 || navigator.appVersion.search("Trident")!=-1 ){	  
			    					var timeToConvert =  $scope.twitsWithBlocs[i].created_at;			
							    	var timeconverted = timeToConvert.replace("+0000", "GMT+0000");		
							    	var tiempo = DiffBetweenTimes.getDiffBetweenTimes(timeconverted), date = new Date(timeconverted);							
								}else{
								 	var tiempo = DiffBetweenTimes.getDiffBetweenTimes($scope.twitsWithBlocs[i].created_at), date = new Date($scope.twitsWithBlocs[i].created_at);						
		    					
								
								}
		    			}
		    			

						var textoWithURL = convertHTML.getURLs(twitText);
						var textoWithURLUSERS = convertHTML.getUsers(textoWithURL);
						var textoWithURLUSERSHASH = convertHTML.getHashs(textoWithURLUSERS);		

						var newTwit = {
							photo:media,
							owner:$scope.twitsWithBlocs[i].user,
							rt:retweetedBy,
							text: textoWithURLUSERSHASH, 
							created_at: date.getTime(),
							DiffBetweenTimes: tiempo,
							retweet_count: retweets,
							favorite_count: favourites, 
							user: twittedBy, 
						};
		    			$scope.twits.push(newTwit);
		    		
		    	}
		    	localStorage.setItem('twits-ls', JSON.stringify($scope.twits));

		    });
		    $scope.go = function ( index,path ) {
		    	var path2=path + '/'+index
			  $location.path( path2 );
			};

		     $scope.isBlock = function(userId){
		    	var userName = "@"+userId.owner.screen_name;
		    	for(var i = 0; i < blocks.length; i++) {
          
	                if(blocks[i].name==userName){
	                	return false;
	                }
            	}
            	return true;        
		    }
			$scope.BlockUser = function(twitId) {
				var user = $scope.twits[twitId].user.screen_name;
				var userName = '@'+user;
				UserBlocked.addUser(userName);
					    	
			};

});
finalApp.controller('TrendDetailsCtrl', ['$scope','$http', '$routeParams','$location','UserBlocked','DiffBetweenTimes','convertHTML', function ($scope, $http, $routeParams,$location,UserBlocked,DiffBetweenTimes,convertHTML) {
		var blocks=UserBlocked;
		var str = $routeParams.trend;
		var res = str.replace("#", "%23");

		$http.get('http://localhost:3000/search?q='+res)
		    .success(function(response) {
		    	$scope.twitsWithBlocs=response.statuses;
		    	$scope.twits=[];
		    	for(var i = 0; i < $scope.twitsWithBlocs.length; i++) {

		    			if($scope.twitsWithBlocs[i].retweeted_status !=undefined){
		    				var twitText = $scope.twitsWithBlocs[i].retweeted_status.text;
		    				var retweetedBy= '<i class="fa fa-retweet"></i>' + '   '+$scope.twitsWithBlocs[i].user.name +' retweeted';
		    				var twittedBy= $scope.twitsWithBlocs[i].retweeted_status.user ;
		    				var tiempo = DiffBetweenTimes.getDiffBetweenTimes($scope.twitsWithBlocs[i].retweeted_status.created_at), date = new Date($scope.twitsWithBlocs[i].retweeted_status.created_at);						
		    				var retweets = $scope.twitsWithBlocs[i].retweeted_status.retweet_count;
		    				var favourites = $scope.twitsWithBlocs[i].retweeted_status.favorite_count;
		    				if($scope.twitsWithBlocs[i].retweeted_status.entities.media!=undefined){
		    					var media = '<img class="twitPhoto" src="'+$scope.twitsWithBlocs[i].retweeted_status.entities.media[0].media_url+'">';
			    			}else{
			    				var media = "";
			    			}
		    			}else{
		    				var tiempo = DiffBetweenTimes.getDiffBetweenTimes($scope.twitsWithBlocs[i].created_at), date = new Date($scope.twitsWithBlocs[i].created_at);						
		    				var twitText = $scope.twitsWithBlocs[i].text;
		    				var retweetedBy="";
		    				var twittedBy= $scope.twitsWithBlocs[i].user;
		    				var retweets= $scope.twitsWithBlocs[i].retweet_count;
							var favourites = $scope.twitsWithBlocs[i].favorite_count; 

							if($scope.twitsWithBlocs[i].entities.media!=undefined){
								var media = '<img class="twitPhoto" src="'+$scope.twitsWithBlocs[i].entities.media[0].media_url+'">';
			    			}else{
			    				var media = "";
			    			}
		    			}
		    			

						var textoWithURL = convertHTML.getURLs(twitText);
						var textoWithURLUSERS = convertHTML.getUsers(textoWithURL);
						var textoWithURLUSERSHASH = convertHTML.getHashs(textoWithURLUSERS);		

						var newTwit = {
							photo:media,
							owner:$scope.twitsWithBlocs[i].user,
							rt:retweetedBy,
							text: textoWithURLUSERSHASH, 
							created_at: date.getTime(),
							DiffBetweenTimes: tiempo,
							retweet_count: retweets,
							favorite_count: favourites, 
							user: twittedBy, 
						};
		    			$scope.twits.push(newTwit);
		    	}
		    	localStorage.setItem('twits-ls', JSON.stringify($scope.twits));

		    });
		  	
		$scope.BlockUser = function(twitId) {
			var user = $scope.twits[twitId].user.screen_name;
			var userName = '@'+user;
			UserBlocked.addUser(userName);
				    	
		};

		
	    $scope.isBlock = function(userId){
	    	var userName = "@"+userId.owner.screen_name;
	    	for(var i = 0; i <blocks.length; i++) {
      
                if(blocks[i].name==userName){
                	return false;
                }
        	}
        	return true;        
	    }

		 $scope.go = function ( index,path ) {
		    	var path2=path + '/'+index
			  $location.path( path2 );
			};
}]);

finalApp.controller('TwitDetailsCtrl', ['$scope', '$routeParams','UserBlocked', function ($scope, $routeParams,UserBlocked) {

		var twits = JSON.parse(localStorage.getItem('twits-ls'));
    	$scope.twit = twits[$routeParams.tiwtId];

    	$scope.BlockUser = function(user) {
			var userName = '@'+user;			
			UserBlocked.addUser(userName);
				    	
		};
}]);

finalApp.controller('TrendTwitDetailsCtrl', ['$scope', '$routeParams','UserBlocked', function ($scope, $routeParams,UserBlocked) {

		var twits = JSON.parse(localStorage.getItem('twits-ls'));
    	$scope.twit = twits[$routeParams.tiwtId];

    	$scope.BlockUser = function(user) {
			var userName = '@'+user;			
			UserBlocked.addUser(userName);
				    	
		};
}]);

finalApp.controller('BlockUsersCtrl', function($scope, $http , UserBlocked) {

		$scope.blocks=UserBlocked;

		$scope.NoBlockUser = function(userId) {
			$scope.blocks.splice(userId,1);
        	localStorage.setItem('blockUsers', JSON.stringify($scope.blocks));
		}

		 $scope.BlockUser = function (user) {
		 	if(!isBlock(user)){	
				UserBlocked.addUser(user.name);
		 	}else{
		 		alert("el usuario existe");
		 	}
		  	
  };

  		function isBlock(userId){
		    	var userName =userId.name;
		    	for(var i = 0; i < $scope.blocks.length; i++) {          
	                if($scope.blocks[i].name==userName){
	                	return true;
	                }
            	}
            	return false;        
		    }


});

finalApp.controller('TrendTopicCtrl', function($scope, $http, $location) {
		   $http.get('http://localhost:3000/trends?id=23424747')
		    .success(function(response) {
		    	$scope.trends=response[0].trends;
		    });

		     $scope.go = function ( index,path ) {
		    	var path2=path + '/'+index
			  $location.path( path2 );
			};
});