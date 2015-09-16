var movie = require('./movie');
function Movie () {
            this.attributes = {};
            this.attributes["title"]=" ";
            this.attributes["duration"]=" ";
            this.attributes["director"]="";
        };

        Movie.prototype = (function(){

            return{
                play:function ()  {
                 
                },
                stop:function ()  {
                  
                },
                set:function (attr,value)  {
                    var oldValue = this.attributes[attr];
                    this.attributes[attr]=value;
                    console.log(attr+" " + oldValue + " renamed by " + this.attributes[attr]);
                },
                get:function (attr)  {
                    return this.attributes[attr];
                },
            };
        })();

        module.exports = Movie;