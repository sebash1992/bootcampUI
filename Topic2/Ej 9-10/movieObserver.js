 function Observer(){
              this.MovieObserver = [];
            }

            Observer.prototype = {
                add : function( obj ){
                    return this.MovieObserver.push( obj );
                },
                count : function(){
                  return this.MovieObserver.length;
                },
                get : function( index ){
                  if( index > -1 && index < this.MovieObserver.length ){
                    return this.MovieObserver[ index ];
                  }
                },
                indexOf : function( obj, startIndex ){
                  var i = startIndex;
                 
                  while( i < this.MovieObserver.length ){
                    if( this.MovieObserver[i] === obj ){
                      return i;
                    }
                    i++;
                  }
                 
                  return -1;
                },
                removeAt : function( index ){
                  this.MovieObserver.splice( index, 1 );
                },

            }

 function MovieObserver (){
         
         }

        MovieObserver.prototype= {
            constructor:Observer,
            update : function( context ){
                console.log(context);
            }
        }