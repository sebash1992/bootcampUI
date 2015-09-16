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
          		var quotesToAdd = value.length;

          		for(var i=0; i < quotesToAdd; i++){
					this.attributes["quotes"][quotesCount++]=value[i];
          		}
          	}else{
          		this.attributes[attr]==value;
          	}
        },

        speak : function(){
        	var quotesCount = this.attributes["quotes"].length;
                  for(var i=0; i < quotesCount; i++){
                    console.log(this.attributes["quotes"][i]);	
                }
        },

        getMovies:function(){
            return this.attributes.quotes;
        },
    };
})();

module.exports = director;