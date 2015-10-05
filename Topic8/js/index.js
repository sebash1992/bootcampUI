var finalApp = angular.module('finalApp', ['ngRoute','ngMessages']);

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
	        templateUrl : 'home.html',
	        controller  : 'TrendDetailsCtrl'
	    })
});

finalApp.controller('TimelineCtrl', function($scope, $http,$location) {

		
		$scope.saved = localStorage.getItem('blockUsers');
		$scope.blocks = (localStorage.getItem('blockUsers')!==null) ? JSON.parse($scope.saved) : [{name:"sebastian"},{name:"pedro"},{name:"joaquin"}];
		localStorage.setItem('blockUsers', JSON.stringify($scope.blocks));

		    $http.get('http://localhost:3000/timeline?count=10')
		    .success(function(response) {
		    	$scope.twitsWithBlocs=response;
		    	$scope.twits=[];
		    	for(var i = 0; i < $scope.twitsWithBlocs.length; i++) {
		    		if(!isBlock($scope.twitsWithBlocs[i].user.screen_name)){
		    			$scope.twits.push($scope.twitsWithBlocs[i]);
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
			$scope.blocks.push({name:userName});
			localStorage.setItem('blockUsers', JSON.stringify($scope.blocks));
				    	
		};
});
finalApp.controller('TrendDetailsCtrl', ['$scope','$http', '$routeParams','$location', function ($scope, $http, $routeParams,$location) {
		$scope.saved = localStorage.getItem('blockUsers');
		$scope.blocks = (localStorage.getItem('blockUsers')!==null) ? JSON.parse($scope.saved) : [{name:"sebastian"},{name:"pedro"},{name:"joaquin"}];
		localStorage.setItem('blockUsers', JSON.stringify($scope.blocks));

		var str = $routeParams.trend;
		var res = str.replace("#", "%23");

		$http.get('http://localhost:3000/search?q='+res)
		    .success(function(response) {
		    	$scope.twitsWithBlocs=response.statuses;
		    	$scope.twits=[];
		    	for(var i = 0; i < $scope.twitsWithBlocs.length; i++) {
		    		if(!isBlock($scope.twitsWithBlocs[i].user.screen_name)){
		    			$scope.twits.push($scope.twitsWithBlocs[i]);
		    		}
		    	}
		    	localStorage.setItem('twits-ls', JSON.stringify($scope.twits));

		    });
		$scope.BlockUser = function(twitId) {
			var user = $scope.twits[twitId].user.screen_name;
			var userName = '@'+user;
			$scope.blocks.push({name:userName});
			localStorage.setItem('blockUsers', JSON.stringify($scope.blocks));
				    	
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
		 $scope.go = function ( index,path ) {
		    	var path2=path + '/'+index
			  $location.path( path2 );
			};
}]);

finalApp.controller('TwitDetailsCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
		var twits = JSON.parse(localStorage.getItem('twits-ls'));
    	$scope.twit = twits[$routeParams.tiwtId];
}]);

finalApp.controller('BlockUsersCtrl', function($scope, $http) {
		$scope.saved = localStorage.getItem('blockUsers');
		$scope.blocks = (localStorage.getItem('blockUsers')!==null) ? JSON.parse($scope.saved) : [];
		localStorage.setItem('blockUsers', JSON.stringify($scope.blocks));

		$scope.NoBlockUser = function(userId) {
			$scope.blocks.splice(userId,1);
        	localStorage.setItem('blockUsers', JSON.stringify($scope.blocks));
		}

		 $scope.BlockUser = function (user) {
		 	if(!isBlock(user)){		 		
		  		$scope.blocks.push({name:user.name});
		  		localStorage.setItem('blockUsers', JSON.stringify($scope.blocks));
		  		user.name="";
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

finalApp.controller('TrendTopicCtrl', function($scope, $http) {
		   $http.get('http://localhost:3000/trends?id=23424747')
		    .success(function(response) {
		    	$scope.trends=response[0].trends;
		    });
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
