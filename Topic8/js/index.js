var finalApp = angular.module('finalApp', ['ngRoute','ngSanitize']);

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
				$scope.title = "Trendng Topics";
				path_to_compare = ($location.path()).replace($location.path(), '/TT');
			}
			else{
				$scope.title = "Home";
				path_to_compare = ($location.path()).replace($location.path(), '/');
			}
		}
	
		if (path_to_compare === path) {
			return 'active';
		} else {
			return '';
		}
	}
	
	
}]);

finalApp.controller('TimelineCtrl', function($scope, $http,$location,addBlockedUser,timeDiff,$sanitize,convertHTML) {

		var blocks=addBlockedUser;
		    $http.get('http://localhost:3000/timeline?count=50')
		    .success(function(response) {
		    	$scope.twitsWithBlocs=response;
		    	$scope.twits=[];
		    	for(var i = 0; i < $scope.twitsWithBlocs.length; i++) {
		    		

		    			var tiempo = timeDiff.getTimeDiff($scope.twitsWithBlocs[i].created_at), date = new Date($scope.twitsWithBlocs[i].created_at);						

						var textoWithURL = convertHTML.getURLs($scope.twitsWithBlocs[i].text);
						var textoWithURLUSERS = convertHTML.getUsers(textoWithURL);
						var textoWithURLUSERSHASH = convertHTML.getHashs(textoWithURLUSERS);						 

						var toSend = $sanitize(textoWithURLUSERSHASH);
						var newTwit = {
							text: toSend, 
							created_at: date.getTime(),
							timeDiff: tiempo,
							retweet_count: $scope.twitsWithBlocs[i].retweet_count,
							favorite_count: $scope.twitsWithBlocs[i].favorite_count, 
							user: $scope.twitsWithBlocs[i].user, 
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
		    	var userName = "@"+userId.user.screen_name;
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
			addBlockedUser.addUser(userName);
				    	
		};

});
finalApp.controller('TrendDetailsCtrl', ['$scope','$http', '$routeParams','$location','addBlockedUser','timeDiff','$sanitize','convertHTML', function ($scope, $http, $routeParams,$location,addBlockedUser,timeDiff,$sanitize,convertHTML) {
		var blocks=addBlockedUser;
		var str = $routeParams.trend;
		var res = str.replace("#", "%23");

		$http.get('http://localhost:3000/search?q='+res)
		    .success(function(response) {
		    	$scope.twitsWithBlocs=response.statuses;
		    	$scope.twits=[];
		    	for(var i = 0; i < $scope.twitsWithBlocs.length; i++) {
		    			var tiempo = timeDiff.getTimeDiff($scope.twitsWithBlocs[i].created_at), date = new Date($scope.twitsWithBlocs[i].created_at);						

						var textoWithURL = convertHTML.getURLs($scope.twitsWithBlocs[i].text);
						var textoWithURLUSERS = convertHTML.getUsers(textoWithURL);
						var textoWithURLUSERSHASH = convertHTML.getHashs(textoWithURLUSERS);						 

						 var toSend = $sanitize(textoWithURLUSERSHASH);
						var newTwit = {
							text: toSend, 
							created_at: date.getTime(),
							timeDiff: tiempo,
							retweet_count: $scope.twitsWithBlocs[i].retweet_count,
							favorite_count: $scope.twitsWithBlocs[i].favorite_count, 
							user: $scope.twitsWithBlocs[i].user, 
						};
		    			$scope.twits.push(newTwit);
		    	}
		    	localStorage.setItem('twits-ls', JSON.stringify($scope.twits));

		    });
		  	
		$scope.BlockUser = function(twitId) {
			var user = $scope.twits[twitId].user.screen_name;
			var userName = '@'+user;
			addBlockedUser.addUser(userName);
				    	
		};

		
	    $scope.isBlock = function(userId){
	    	var userName = "@"+userId.user.screen_name;
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

finalApp.controller('TwitDetailsCtrl', ['$scope', '$routeParams','addBlockedUser', function ($scope, $routeParams,addBlockedUser) {

		var twits = JSON.parse(localStorage.getItem('twits-ls'));
    	$scope.twit = twits[$routeParams.tiwtId];

    	$scope.BlockUser = function(user) {
			var userName = '@'+user;			
			addBlockedUser.addUser(userName);
				    	
		};
}]);

finalApp.controller('TrendTwitDetailsCtrl', ['$scope', '$routeParams','addBlockedUser', function ($scope, $routeParams,addBlockedUser) {

		var twits = JSON.parse(localStorage.getItem('twits-ls'));
    	$scope.twit = twits[$routeParams.tiwtId];

    	$scope.BlockUser = function(user) {
			var userName = '@'+user;			
			addBlockedUser.addUser(userName);
				    	
		};
}]);

finalApp.controller('BlockUsersCtrl', function($scope, $http , addBlockedUser) {

		$scope.blocks=addBlockedUser;

		$scope.NoBlockUser = function(userId) {
			$scope.blocks.splice(userId,1);
        	localStorage.setItem('blockUsers', JSON.stringify($scope.blocks));
		}

		 $scope.BlockUser = function (user) {
		 	if(!isBlock(user)){	
				addBlockedUser.addUser(user.name);
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
		        return '<a  href="' + url + '" ng-click="$event.stopPropagation();" >' + url + '</a>';
		    })
		},

		getHashs: function(text) {  
		  	return text.replace(/[#]+[A-Za-z0-9-_]+/g, function(e) { 
		    	var tag = e.replace("#","%23");
		    	//return e.link(urlServer+"search?q="+tag); 
		    	return '<a href="#/trendDetails/'+tag + '" ng-click="$event.stopPropagation();">' + e + '</a>';

		  	});
		},		

        getUsers: function(text) {  
		  	return text.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) { 
		    	var user = u.replace("@","");
		    	//return u.link("http://twitter.com/"+user); 
		    	 return '<a href="' + "http://twitter.com/"+user + ' >@' + user + ' ng-click="$event.stopPropagation();" </a>';
			});
		},
    };
});

finalApp.factory("addBlockedUser", function() {

  	var userList;

	if(localStorage.getItem('blockUsers')!==null){
		userList = JSON.parse(localStorage.getItem('blockUsers'))
	}
	else{
		userList = [];
		localStorage.setItem('blockUsers', JSON.stringify(userList));
	}

	userList.addUser = function(screen_name){
		userList.push({
			name: screen_name,
		});
		localStorage.setItem('blockUsers', JSON.stringify(userList));
	};

	return userList;
});

finalApp.factory('timeDiff', function () {
    
    return {
        getTimeDiff: function(start) {
        	
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



finalApp.directive('isActiveNav', [ '$location', function($location) {
return {
 restrict: 'A',
 link: function(scope, element) {
   scope.location = $location;
   scope.$watch('location.path()', function(currentPath) {
     if('/#' + currentPath === element[0].attributes['href'].nodeValue) {
       element.parent().addClass('active');
     } else {
       element.parent().removeClass('active');
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
}]);
