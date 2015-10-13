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
            console.log(date);
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