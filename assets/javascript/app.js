$(document).ready(function() {

	// Initialized array of topics
	var topics = [
	"animals riding other animals", 
	"failed goals", "Wittgenstein", 
	"recursion", 
	"la chancla", 
	"Conways Game of Life", 
	"fractals",
	"doge"];

	var topic = "";

	$("#add-topics").on("click", "#topic-button", function() {
		$("#topics").append("<button>"+$("#topic").val()+"</button>");
	});

	for(i = 0 ; i < topics.length; i++) {
		$("#topics").append("<button class='topic-buttonwww'>"+topics[i]+"</button>");
	}

	$("body").on("click","button", function() {
		topic = $(this).text();
		var queryURL = "https://crossorigin.me/http://api.giphy.com/v1/gifs/search?q="+topic+"&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
			$("#images").html("<table><tr class='row-1'>")
			var counter = 0;
			var rowCounter = 1;
			for(i = 0; i < response.data.length; i++) {
				counter++;
				$(".row-"+rowCounter).append("<td><figure><figcaption>Rating: "+response.data[i].rating+"</figcaption><img src='"+response.data[i].images.fixed_width_still.url+"' data-urlmove='"+response.data[i].images.fixed_width.url+"' data-urlfixed='"+response.data[i].images.fixed_width_still.url+"'></figure></tr>");
				if(counter == 3) {
					rowCounter++;
					$("table").append("<tr class='row-"+rowCounter+"'>");
					counter = 0;
				}
			}
			rowCounter = 1;
			var toggle = true;
			$("#images").on("click", "img",function() {
				var imageMove = $($(this)[0]).data("urlmove");
				var imageFixed = $($(this)[0]).data("urlfixed");
				if(toggle) {
					$(this).attr("src", imageMove);
				} else {
					$(this).attr("src", imageFixed);
				}
				toggle = !toggle;
			});
		});
	});

});