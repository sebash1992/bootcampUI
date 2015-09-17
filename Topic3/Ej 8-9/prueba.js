var Movie = require('./movie');
var Director = require('./director');
var jQuery = require('./jquery-2.1.4.min');

var alien = new Movie();
alien.set("title","alien");
var ridleyScott = new Director("Ridley Scott");
ridleyScott.set('quotes', ['Cast is everything.', 'Do what ...']);
alien.set('director', ridleyScott);
var quotes = alien.get('director').speak();

var sayquotes = "";
jQuery.each(quotes, function(index, value){
	sayquotes += '\''+value+'\' ';
});
console.log(sayquotes);