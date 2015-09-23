var myApp = angular.module('myApp', ['ngRoute']);


myApp.config(function($routeProvider) {

$routeProvider
    .when('/', {
        templateUrl : 'home.html',
        controller  : 'MoviesCtrl'
    })
     .when('/details', {
            templateUrl : 'details.html',
            controller  : 'DetailCtrl'
        })
    .otherwise({
        redirectTo: '/'
    });
});

myApp.controller('MoviesCtrl', ['$scope', function ($scope) {
   

    $scope.saved = localStorage.getItem('movies-ls');
    $scope.movies =(localStorage.getItem('movies-ls')!==null) ? JSON.parse($scope.saved) : [
    		{title:'Shrek', duration:115, rate: 5}, 
    		{title:'Shrek 2', duration:120, rate: 4},    
			{title:'Shrek 3', duration:100, rate: 5}, 
    ];

	localStorage.setItem('movies-ls', JSON.stringify($scope.movies));

     $scope.addMovie = function () {
		    $scope.movies.push({title:$scope.formTitleText, duration:$scope.formDurationText,rate:$scope.formRateText});
		    $scope.formTitleText="";
		    $scope.formDurationText="";
		    $scope.formRateText="";
		    localStorage.setItem('movies-ls', JSON.stringify($scope.movies));
  };

  	$scope.removeMovie = function(index) {
        $scope.movies.splice(index,1);
        localStorage.setItem('movies-ls', JSON.stringify($scope.movies));
	};

	$scope.editMovie = function(index) {
		localStorage.setItem('movies-ls', JSON.stringify($scope.movies));
	}	
    
}]);

	myApp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});

myApp.controller('DetailCtrl', ['$scope', function ($scope) {

	 $scope.message = 'Aca van los detalles!';
}]);
