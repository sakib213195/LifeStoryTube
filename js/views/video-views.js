app = app || {};

app.views.Video = Backbone.View.extend({
	tagName: 'li',

	attributes: function(){
		return {
			class: 'video' + this.model.get('type')
		};
	},



	template: _.template($('#video-template').html()),

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}

});


app.views.Videos = Backbone.View.extend({

	el: '#wrapper',

	initialize: function (data){
		this.collection = new app.collections.Videos(data);
		this.render();
	},

	render: function(){
		var self = this;
		$('#listing').empty();
		_.each(this.collection.models, function(video){
			self.renderVideo(video);
		}, this);
	},

	renderVideo: function(video){
		var newvideo = new app.views.Video({
			model: video
		});
		$('#listing').append(newvideo.render().el);
	}


});