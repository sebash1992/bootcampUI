$( document ).ready(function() {
		var num = Math.floor((Math.random() * 4) + 1);
		var col = 'rgb(' + (Math.floor((256-199)*Math.random()) + 200) + ','
                     + (Math.floor((256-199)*Math.random()) + 200) + ','
                     + (Math.floor((256-199)*Math.random()) + 200) + ')';
		var c = document.getElementById("myCanvas");
		var context = c.getContext("2d");
		switch(num) {
		    case 1: //circle
		         var centerX = c.width / 2;
			      var centerY = c.height / 2;
			      var radius = 70;

			      context.beginPath();
			      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
			      context.fillStyle = 'green';
			      context.fill();
			      context.lineWidth = 5;
			      context.strokeStyle = '#003300';
			      context.stroke();
		    	  break;
		    case 2: //line
		       	  context.beginPath();
			      context.moveTo(100, 150);
			      context.lineTo(450, 50);
			      context.lineWidth = 10;

			      // set line color
			      context.strokeStyle = '#ff0000';
			      context.stroke();
		        break;
		    case 3: //rectangle
			   	  context.beginPath();
			      context.rect(188, 50, 200, 100);
			      context.fillStyle = 'yellow';
			      context.fill();
			      context.lineWidth = 7;
			      context.strokeStyle = 'black';
			  	  context.stroke();
		      	  break;
		    case 4:   	
		         context.beginPath();
			      context.arc(288, 75, 70, 0, Math.PI, false);
			      context.closePath();
			      context.lineWidth = 5;
			      context.fillStyle = 'red';
			      context.fill();
			      context.strokeStyle = '#550000';
			      context.stroke();
				  break;
		    
		}
});