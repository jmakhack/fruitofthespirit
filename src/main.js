import $ from 'jquery';

require("./style.less");
require("static?!./favicon.ico?output=favicon.ico");

$(document).ready(function() {

    var versesJson = require("./verses.json");
    var tabOpen = null;
    var curText = $('.title');
    var fadeSpeed = 800;
    var interval;
    var switchSpeed = 12000;
    var curVerse;

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
            curVerse = null;
            tabOpen.animate({left: "-=200"}, fadeSpeed, function() {});
            tabOpen = null;
            curText.fadeOut(fadeSpeed);
            curText = $('.title');
            curText.fadeIn(fadeSpeed);
        }
    });

    $('.verse').click(function() {
        var ref = curVerse.reference;
        var colon = ref.indexOf(':');
        var hyphen = ref.indexOf('-');
        var chapter = ref.substring(0, colon);
        var verse = ref.substring(colon + 1, hyphen != -1 ? hyphen : ref.length);
        window.open('http://nasb.literalword.com/?h=' + verse + '&q=' + chapter, '_blank');
    });

    function changeText(fruit) {
        var id = curText.selector === '#v1' ? $('#v2') : $('#v1');
        curVerse = getVerse(fruit);
        id.html(curVerse.text + '<div class="reference">' + curVerse.reference + '</div>');
        curText.fadeOut(fadeSpeed);
        curText = id;
        curText.fadeIn(fadeSpeed);
    }

    function getVerse(fruit) {
        var verses = getFruit(fruit).verses;
        var verse;
        var tries = 0;
        do {
            verse = verses[Math.floor(Math.random() * verses.length)];
            tries++;
        } while(verse === curVerse && tries < 3);
        return verse;
    }

    function getFruit(fruit) {
        for(var i = 0; i < versesJson.length; i++)
            if(versesJson[i].fruit === fruit)
                return versesJson[i];
        return null;
    }
});

