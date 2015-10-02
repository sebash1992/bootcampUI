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
	        templateUrl : 'home.html',
	        controller  : 'TrendDetailsCtrl'
	    })
});

finalApp.controller('TimelineCtrl', function($scope, $http) {

		
		$scope.saved = localStorage.getItem('blockUsers');
		$scope.blocks = (localStorage.getItem('blockUsers')!==null) ? JSON.parse($scope.saved) : [];
		localStorage.setItem('blockUsers', JSON.stringify($scope.blocks));

		    $http.get('http://localhost:3000/timeline?count=10')
		    .success(function(response) {
		    	$scope.twits=response;
		    	localStorage.setItem('twits-ls', JSON.stringify($scope.twits));

		    });
		 $scope.BlockUser = function(twitId) {
			var user = $scope.twits[twitId].user;
			console.log(user);
			$scope.blocks.push({user});
			localStorage.setItem('blockUsers', JSON.stringify($scope.blocks));
				    	
		    };
});
finalApp.controller('TrendDetailsCtrl', ['$scope','$http', '$routeParams', function ($scope, $http, $routeParams) {
		var str = $routeParams.trend;
		var res = str.replace("#", "%23");

		$scope.blockUsers=[{}];

		$http.get('http://localhost:3000/search?q='+res)
		    .success(function(response) {
		    	$scope.twits=response.statuses;
		    });
		$scope.BlockUser = function(twitId) {
			var user = $scope.twits[twitId].user;
			console.log(user);

	
		};
}]);

finalApp.controller('TwitDetailsCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
		var twits = JSON.parse(localStorage.getItem('twits-ls'));
    	$scope.twit = twits[$routeParams.tiwtId];
}]);

finalApp.controller('BlockUsersCtrl', function($scope, $http) {
		$scope.saved = localStorage.getItem('blockUsers');
		$scope.blocks = (localStorage.getItem('blockUsers')!==null) ? JSON.parse($scope.saved) : [];
		console.log($scope.blocks[0].user.name);
		localStorage.setItem('blockUsers', JSON.stringify($scope.blocks));

		$scope.NoBlockUser = function(userId) {
			$scope.blocks.splice(userId,1);
        	localStorage.setItem('blockUsers', JSON.stringify($scope.blocks));
		}
});

finalApp.controller('TrendTopicCtrl', function($scope, $http) {
		   $http.get('http://localhost:3000/trends?id=23424747')
		    .success(function(response) {
		    	$scope.trends=response[0].trends;
		    });
});