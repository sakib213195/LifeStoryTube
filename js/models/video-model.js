app = app || {};

app.models.Video=Backbone.Model.extend({
	defaults: {
		'ID': '',
		'videoname' : '',
		'tag' : '',
		'link' : '',
		'autobiography' : ''
	},

	initialize: function(){
		var self = this;
		if (this.get('autobiography') !== ''){
			self.set('type', 'biography');
		} else {
			self.set('type', 'autobiography');
		}
	}

});



app.collections.Videos = Backbone.Collection.extend({
	model:app.models.Video,

	comparator: function(video){
		return video.get('videoname');
	}
});


