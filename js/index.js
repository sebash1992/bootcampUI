$( document ).ready(function() {
		$.get({
		  url: "http://localhost/",
		  success: function (data) {
		    console.log("Success");
		  },
		  dataType: "json"
		});
});