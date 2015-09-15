function Movie () {
            this.attributes = {};
            this.attributes["title"]=" ";
            this.attributes["duration"]=" ";
            this.observers = new Observer();
        };

        Movie.prototype = (function(){

            return{
                play:function ()  {
                 var observerCount = this.observers.count();
                  for(var i=0; i < observerCount; i++){
                    this.observers.get(i).update( this.attributes["title"] + "is Playing" );
                  }
                },
                stop:function ()  {
                    var observerCount = this.observers.count();
                      for(var i=0; i < observerCount; i++){
                        this.observers.get(i).update( this.attributes["title"] + "is stopped" );
                    }
                },
                set:function (attr,value)  {
                    var oldValue = this.attributes[attr];
                    this.attributes[attr]=value;
                    console.log(attr+" " + oldValue + " renamed by " + this.attributes[attr]);
                },
                get:function (attr)  {
                    return this.attributes[attr];
                },
                addObserver : function( observer ){
                    this.observers.add( observer );
                },
                removeObserver : function( observer ){
                 this.observers.removeAt( this.observers.indexOf( observer, 0 ) );
                },
            };
        })();
        

         function inheritPrototype(childObject, parentObject) {
            var copyOfParent = Object.create(parentObject.prototype);
            copyOfParent.constructor = childObject;
            childObject.prototype = copyOfParent;
}

        function DownloadableMovie () {
            Movie.call(this);
        }

         DownloadableMovie.prototype = (function(){
            return{
             download:function ()  {
                            console.log("Downloading");
            },
        }
        })();

        inheritPrototype(DownloadableMovie,Movie);
       
        DownloadableMovie.prototype.download = function () {
             console.log('Downloading movie');      
        };

        mix(Movie,Social);