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