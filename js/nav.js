$('a#portfolio_link').click(function() {
  $('#portfolio').slideToggle('slow', function() {
    // Animation complete.
  });
});
$('#portfolio #close_x').click(function() {
  $('#portfolio').slideToggle('slow', function() {
    // Animation complete.
  });
});

//Gets 20 most recent photos from flickr when document is ready
$(document).ready(function(){					
						   
	// Our very special jQuery JSON fucntion call to Flickr, gets details of the most recent 20 images			   
	$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?id=20699411@N00&lang=en-us&format=json&jsoncallback=?", displayImages);
	
	function displayImages(data) {																																   
		// Randomly choose where to start. A random number between 0 and the number of photos we grabbed (20) minus 9 (we are displaying 9 photos).
		var iStart = 0;	
		
		// Reset our counter to 0
		var iCount = 0;								
		
		// Start putting together the HTML string
		$('<ul id="image_ul"></ul>').appendTo("#images");
		
		// Now start cycling through our array of Flickr photo details
		$.each(data.items, function(i,item){
									
			// Let's only display 9 photos (a 3x3 grid), starting from a random point in the feed (here, 0)					
			if (iCount > iStart && iCount < (iStart + 8)) {
				// I only want the ickle square thumbnails
				var sourceSquare = (item.media.m).replace("_m.jpg", "_s.jpg");
				var sourceLarge = (item.media.m).replace("_m.jpg", "_b.jpg");		
				
				// Here's where we piece together the HTML
				$('<li><a href="' + sourceLarge + '"><img src="' + sourceSquare + '" alt="' + item.title + '" title="' + item.title + '"/></a></li>').appendTo("#image_ul");
			}
			// Increase our counter by 1
			iCount++;
		});		
		var images_link = $('#images_link').attr('href');
		$('a#images_link').attr("href","#");
		$('<a href="'+ images_link + '" target="_blank">view more at flickr</a>').appendTo("#images");
		
		$('#image_ul a').attr('class', 'zoom');
		$('#image_ul a').attr('rel','gallery')
		// Weird scope issue -- the fancy box call is out of scope outside the function... many function call happens after everything outside of this?
		$('#image_ul a.zoom').fancybox();
	// Close down the JSON function call
	}
	$('a#images_link').click(function() {
	  $('#images').slideToggle('slow', function() {
	    // Animation complete.
	  });
	});
// The end of our jQuery function
});

$(document).ready(function(){
	$(".zoom").fancybox();
});