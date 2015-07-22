//Loads and fades in background image

//Changes hexagon text
$(document).ready(function(){
	$("#hex1").hover(function(){
	    $("#history").text("Seven years ago, I picked up a camera and took a photo of a nearby flower in bloom. I haven't put it down since.");
	}, function() {
	    $("#history").text("HISTORY");
	});
	$("#hex2").hover(function(){
	    $("#equipment").text("I alternatively shoot with a Canon SX280 HS and Canon ElPH 110 HS.");
	}, function() {
	    $("#equipment").text("EQUIPMENT");
	});
	$("#hex3").hover(function(){
	    $("#travels").text("My strange obsession with botanical photography has followed me to Seattle, Denver, Phoenix, and Vietnam.");
	}, function() {
	    $("#travels").text("TRAVELS");
	});
	$("#hex4").hover(function(){
	    $("#why").text("Every plant has a story.");
	}, function() {
	    $("#why").text("WHY");
	});
});
