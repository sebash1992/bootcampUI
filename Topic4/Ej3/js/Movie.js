 var Movie = Backbone.Model.extend({
             initialize: function(){
                 console.log("Peli creade");
              },
          });

  var Video = Backbone.Collection.extend({
       localStorage : new Backbone.LocalStorage("Video"),
       model: Movie
  });

var MovieView = Backbone.View.extend({
            model:Movie,
            el: "#movieView",            
            template: '',
            
            initialize: function() {
              this.template = _.template($('#template-movie').html());
              this.render();
            },
            render: function() {
            this.$el.append(this.template(this.model.attributes));
              return this;
            },
            
        });

var VideoView = Backbone.View.extend({
            model:Video,
            el: "#movieView",            
            template: '',
             events:
            {
              'click #btnRemove':'deleteMovie',

            },
            modelUpdated: function() {
                this.render();
            },
            initialize: function() {
              this.listenTo(this.model, "add", this.modelUpdated);
              this.listenTo(this.model, "remove", this.modelUpdated);
              this.template = _.template($('#template-movie').html());
              this.render();
            },
            deleteMovie: function(ev){
                  var mov = this.model.get($(ev.target).attr("value"));
                  mov.destroy();
                  this.model.remove(mov);


            },
            render: function() {
             $( "#movieView").empty();

                  for(var i = 0; i < this.model.length; ++i) {
                      var movieView = new MovieView({model: this.model.at(i)});        
                  } 
              return this;
            }
        });


