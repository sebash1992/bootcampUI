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

finalApp.controller('TimelineCtrl', function($scope, $http,$location,addBlockedUser,timeDiff,$sanitize,convertHTML) {

		$scope.blocks=addBlockedUser;
		    $http.get('http://localhost:3000/timeline?count=50')
		    .success(function(response) {
		    	$scope.twitsWithBlocs=response;
		    	$scope.twits=[];
		    	for(var i = 0; i < $scope.twitsWithBlocs.length; i++) {
		    		if(!isBlock($scope.twitsWithBlocs[i].user.screen_name)){

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
		    	}
		    	localStorage.setItem('twits-ls', JSON.stringify($scope.twits));

		    });
		    $scope.go = function ( index,path ) {
		    	var path2=path + '/'+index
			  $location.path( path2 );
			};

		    function isBlock(userId){
		    	var userName = "@"+userId;
		    	for(var i = 0; i < $scope.blocks.length; i++) {
          
	                if($scope.blocks[i].name==userName){
	                	return true;
	                }
            	}
            	return false;
        
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
		    		if(!isBlock($scope.twitsWithBlocs[i].user.screen_name)){
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
		    	}
		    	localStorage.setItem('twits-ls', JSON.stringify($scope.twits));

		    });
		  	
		$scope.BlockUser = function(twitId) {
			var user = $scope.twits[twitId].user.screen_name;
			var userName = '@'+user;
			addBlockedUser.addUser(userName);
				    	
		};

		function isBlock(userId){
		    	var userName = "@"+userId;
		    	for(var i = 0; i < blocks.length; i++) {
          
	                if(blocks[i].name==userName){
	                	return true;
	                }
            	}
            	return false;
        
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
		     	console.log(index);
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
		        return '<a href="' + url + '">' + url + '</a>';
		    })
		},

		getHashs: function(text) {  
		  	return text.replace(/[#]+[A-Za-z0-9-_]+/g, function(e) { 
		    	var tag = e.replace("#","%23");
		    	//return e.link(urlServer+"search?q="+tag); 
		    	return '<a href="http://localhost:8080/#/trends/'+tag + '" >' + e + '</a>';

		  	});
		},		

        getUsers: function(text) {  
		  	return text.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) { 
		    	var user = u.replace("@","");
		    	//return u.link("http://twitter.com/"+user); 
		    	  return u.link("http://twitter.com/"+user);
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
		   	//console.log('La diferencia es de ' + dias + ' dias, o '+hrs+' horas, o ' +min+ ' min, o '+ seg + ' segundos. Tiempo: '+tiempo);
		   	return tiempo;
        }
    };
});