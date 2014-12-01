$(document).ready(function() {
	$.getJSON('verses.json', function(json) {

		var tabOpen = null;
		var curText = $('.title');
		var fadeSpeed = 800;
		var interval;
		var switchSpeed = 12000;
		var prevVerse;

		$('.fruit').hover(function() {
			if(parseInt($(this).css('left')) === -200)
				$(this).animate({left: "+=10"}, 0, function() {}); 
		}, function() {
			if(parseInt($(this).css('left')) === -190) 
				$(this).animate({left: "-=10"}, 0, function() {}); 
		});

		$('.fruit').click(function() {
			if(parseInt($(this).css('left')) === -190) {
				if(tabOpen != null) {
					tabOpen.animate({left: "-=200"}, fadeSpeed, function() {});
					clearInterval(interval);
				}
				$(this).animate({left: "+=190"}, fadeSpeed, function() {});
				tabOpen = $(this);
				changeText(tabOpen.attr('id'));
				interval = setInterval(function() { changeText(tabOpen.attr('id')); }, switchSpeed);
			} else if(parseInt($(this).css('left')) === 0) {
				clearInterval(interval);
				tabOpen.animate({left: "-=200"}, fadeSpeed, function() {});
				tabOpen = null;
				curText.fadeOut(fadeSpeed);
				curText = $('.title');
				curText.fadeIn(fadeSpeed);
			}
		});
		
		function changeText(fruit) {
			curText.fadeOut(fadeSpeed);
			var id = curText.selector === '#v1' ? $('#v2') : $('#v1');
			var verse = getVerse(fruit);
			id.html(verse.text+'<div class="reference">'+verse.reference+'</div>');
			curText = id;
			curText.fadeIn(fadeSpeed);
		}

		function getVerse(fruit) {
			var verses = getFruit(fruit).verses;
			if(verses.length === 0) {
				return {text: "", reference: ""};
			}
			var verse;
			do {
				verse = verses[Math.floor(Math.random()*verses.length)];
			} while(verse === prevVerse);
			prevVerse = verse;
			return verse;
		}

		function getFruit(fruit) {
			for(var i = 0; i < json.length; i++)
    		if(json[i].fruit === fruit)
    			return json[i];
    		return null
		}
	});
});