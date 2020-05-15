app = app || {};

app.views.Video = Backbone.View.extend({
	tagName: 'li',

	attributes: function(){
		return {
			class: 'video' + this.model.get('type')
		};
	},

	events: {
		'click .list-header': 'showDetails'
	},



	template: _.template($('#video-template').html()),

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},


	showDetails: function(e){
		$(e.target).toggleClass('active');
		$(e.target).siblings('.details').slideToggle('fast');
	}



});


app.views.Videos = Backbone.View.extend({

	el: '#wrapper',

	initialize: function (data){
		this.collection = new app.collections.Videos(data);
		this.render();

		this.on('change:searchFilter',this.filterBySearch, this);

	this.collection.on('reset',this.render, this);
	},

	events: {
		'keyup #searchBox': 'searchFilter'
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
	},

	searchFilter: function(e){
		this.searchFilter = e.target.value;
		this.trigger('change:searchFilter');
	},

	filterBySearch: function() {
		this.collection.reset(content, {silent: true});
		var filterString = this.searchFilter,
			filtered = _.filter(this.collection.models, function(item){
				return item.get('videoname').toLowerCase().indexOf(filterString.toLowerCase()) !== -1;
			});
			 this.collection.reset(filtered);
	}


});