// herro-collage


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var maxImages = 20
var urlHash = window.location.hash.substring(1)
var imageIds = urlHash.split("-")

var herroApp = new Vue({

	el: "#herro-collage-app",

	data: {
		images: []
	},

	methods: {

		addImage: function(event) {
			var that = this

			if (event.keyCode == 13) {

				if (that.images.length >= maxImages) {
					that.search = "No more images for you Jack..."
					return
				}

				var searchUrl = 'http://api.giphy.com/v1/gifs/search?q=' + this.search + '&api_key=dc6zaTOxFJmzC'
				
				$.get(searchUrl, function(res) {
					
					if (res.data.length > 0) {
						var imageId = res.data[getRandomInt(0, res.data.length - 1)].id
						that.addImageWithId(imageId).buildUrl()
						return	 
					}

					// Didn't find anything Jack
					that.search = "No luck Jack..."
				})
			}
		},

		removeImage: function(image) {
			this.images.$remove(image)
			this.buildUrl()
		},

		addImageWithId: function(imageId) {
			this.images.push({
				imageId: imageId
			})
			return this
		},

		buildUrl: function() {
			var url = ""
			$.each(this.images, function(i, image) {
				if (i > 0) {
					url += "-"
				}
				url += image.imageId
			})

			window.location.hash = url
		}


	}
})


// Check the hash, and add any image id:s
if (imageIds.length) {
	$.each(imageIds, function(i, imageId) {
		if (imageId.length && i < maxImages) {
			herroApp.addImageWithId(imageId)	
		}
	})
}

