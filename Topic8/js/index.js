var finalApp = angular.module('finalApp', ['ngRoute']);

finalApp.config(function($routeProvider) {
	$routeProvider
	    .when('/', {
	        templateUrl : 'home.html',
	        controller  : 'TimelineCtrl'
	    })
	     .when('/block', {
	        templateUrl : 'blockUsers.html',
	        controller  : 'BlockUsersCtrl'
	    })
	      .when('/TT', {
	        templateUrl : 'trendingTopic.html',
	        controller  : 'TrendTopicCtrl'
	    })
	      .when('/twitDetails/:tiwtId', {
	        templateUrl : 'twitDetails.html',
	        controller  : 'TwitDetailsCtrl'
	    })
	      .when('/trendDetails/:trend', {
	        templateUrl : 'trendDetailTwitList.html',
	        controller  : 'TrendDetailsCtrl'
	    })
	      .when('/trendingTwitDetails/:tiwtId', {
	        templateUrl : 'trendingTwitDetails.html',
	        controller  : 'TrendTwitDetailsCtrl'
	    }) 

});

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
		    				var tiempo = DiffBetweenTimes.getDiffBetweenTimes($scope.twitsWithBlocs[i].retweeted_status.created_at), date = new Date($scope.twitsWithBlocs[i].retweeted_status.created_at);						
		    				var retweets = $scope.twitsWithBlocs[i].retweeted_status.retweet_count;
		    				var favourites = $scope.twitsWithBlocs[i].retweeted_status.favorite_count;

		    				if($scope.twitsWithBlocs[i].extended_entities!=undefined){

			    				var media = '<img  class="twitPhoto" src="'+ $scope.twitsWithBlocs[i].retweeted_status.extended_entities.media[0].media_url+'">';
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

							if($scope.twitsWithBlocs[i].extended_entities!=undefined){

			    				var media = '<img class="twitPhoto" src="'+$scope.twitsWithBlocs[i].extended_entities.media[0].media_url+'">';
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

finalApp.directive('twitterValidate', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {

                scope.pwdValidLength = (viewValue && viewValue[0] == '@' ? 'valid' : undefined);

                if(scope.pwdValidLength) {
                    ctrl.$setValidity('pwd', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('pwd', false);                    
                    return undefined;
                }

            });
        }
    };
});



finalApp.factory('convertHTML', function () {
    
    return {       

        getURLs: function(text) {
		    var urlRegex = /(https?:\/\/[^\s]+)/g;
		    return text.replace(urlRegex, function(url) {
		        return '<a  href="' + url + '" ng-click="$event.stopPropagation()" >' + url + '</a>';
		    })
		},

		getHashs: function(text) {  
		  	return text.replace(/[#]+[A-Za-z0-9-_]+/g, function(e) { 
		    	var tag = e.replace("#","%23");
		    	//return e.link(urlServer+"search?q="+tag); 
		    	return '<a href="#/trendDetails/'+tag + '" ng-click="$event.stopPropagation()">' + e + '</a>';

		  	});
		},		

        getUsers: function(text) {  
		  	return text.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) { 
		    	var user = u.replace("@","");
		    	 return '<a href="' + "http://twitter.com/"+user + ' >@' + user + ' ng-click="$event.stopPropagation()" </a>';
			});
		},
    };
});



finalApp.factory('DiffBetweenTimes', function () {
    
    return {
        getDiffBetweenTimes: function(start) {
        	
            var date = new Date(start), dateNow = new Date();
			var diferencia = dateNow.getTime() - date.getTime();
		   	var dias = Math.floor(diferencia / (1000 * 60 * 60 * 24)), 
		   	hrs = Math.floor(diferencia / (1000 * 60 * 60)), 
		   	min = Math.floor(diferencia / (1000 * 60)), 
		   	seg = Math.floor(diferencia / 1000);
		   	if(dias > 0){
		   		tiempo = dias+ 'd';
		   	}
		   	else{
		   		if(hrs>0){
		   			tiempo = hrs+ 'h';
		   		}
		   		else{
		   			if(min > 0){
		   				tiempo = min+'m';
		   			}
		   			else{
		   				tiempo = seg+'s';
		   			}
		   		}
		   	}
		   	return tiempo;
        }
    };
});

finalApp.factory("UserBlocked", function() {

  	var UserBlockedList;

	if(localStorage.getItem('blockUsers')!==null){
		UserBlockedList = JSON.parse(localStorage.getItem('blockUsers'))
	}
	else{
		UserBlockedList = [];
		localStorage.setItem('blockUsers', JSON.stringify(UserBlockedList));
	}

	UserBlockedList.addUser = function(screen_name){
		UserBlockedList.push({
			name: screen_name,
		});
		localStorage.setItem('blockUsers', JSON.stringify(UserBlockedList));
	};

	return UserBlockedList;
});

finalApp.directive('isActiveNav', [ '$location', function($location) {
return {
 restrict: 'A',
 link: function(scope, element) {
   scope.location = $location;
   scope.$watch('location.path()', function(currentPath) {
     if('#' + currentPath === element[0].attributes['href'].nodeValue) {
       element.addClass('active');
     } else {
       element.removeClass('active');
     }
   });
 }
 };
}]);

finalApp.directive('compile', ['$compile', function ($compile) {
    return function(scope, element, attrs) {
        scope.$watch(
            function(scope) {
                // watch the 'compile' expression for changes
                return scope.$eval(attrs.compile);
            },
            function(value) {
                // when the 'compile' expression changes
                // assign it into the current DOM
                element.html(value);

                // compile the new DOM and link it to the current
                // scope.
                // NOTE: we only compile .childNodes so that
                // we don't get into infinite loop compiling ourselves
                $compile(element.contents())(scope);
            }
        );
    };
}])