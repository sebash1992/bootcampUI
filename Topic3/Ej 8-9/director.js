var movie = require('./movie');

function director (name) {
            this.attributes = {};
            this.attributes["name"]=name;
            this.attributes["quotes"]= [];

        };

director.prototype = (function(){

    return{
     
        set:function (attr,value)  {
          	if(attr=="quotes"){
          		var quotesCount = this.attributes["quotes"].length;
          		

          		
					this.attributes["quotes"][quotesCount]=value;
          		
          	}else{
          		this.attributes[attr]==value;
          	}
        },

        speak : function(){
        	return this.attributes["quotes"];	
                
        },

        getMovies:function(){
            return this.attributes.quotes;
        },
    };
})();

module.exports = director;