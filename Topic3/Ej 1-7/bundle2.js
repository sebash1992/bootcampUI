(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./movie":2}],2:[function(require,module,exports){
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
},{"./movie":2}],3:[function(require,module,exports){
var Movie = require('./movie');
var Director = require('./director');

var alien = new Movie();
var ridleyScott = new Director("Ridley Scott");
ridleyScott.set('quotes', ['Cast is everything.', 'Do what ...']);
alien.set('director', ridleyScott);
alien.get('director').speak();
},{"./director":1,"./movie":2}]},{},[3]);
