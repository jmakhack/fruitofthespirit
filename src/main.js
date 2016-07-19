'use strict';

import $ from 'jquery';
require("./style.less");

$(document).ready(function() {

    var versesJson  = require("./verses.json");
    var tabOpen     = null;
    var curText     = $('.title');
    var switchSpeed = 12000;
    var fadeSpeed   = 800;

    var tabWidth;
    var interval;
    var curVerse;
    var curFruit;

    new vUnit({
        CSSMap: {
            '.vh_height'      : { property: 'height'    , reference: 'vh'   },
            '.vh_width'       : { property: 'width'     , reference: 'vh'   },
            '.vmin_font-size' : { property: 'font-size' , reference: 'vmin' },
            '.vh_bottom'      : { property: 'bottom'    , reference: 'vh'   },
            '.vh_top'         : { property: 'top'       , reference: 'vh'   },
            '.vw_right'       : { property: 'right'     , reference: 'vw'   },
            '.vw_left'        : { property: 'left'      , reference: 'vw'   },
            '.vh_left'        : { property: 'left'      , reference: 'vh'   }
        },
        onResize: onResize
    }).init();

    $('.fruit').hover(function() {
        if(!$(this).hasClass('active'))
            $(this).animate({left: tabWidth * -23/32}, 0);
    }, function() {
        if(!$(this).hasClass('active'))
            $(this).animate({left: tabWidth * -3/4}, 0);
    });

    $('.fruit').click(function() {
        if(!$(this).hasClass('active')) {
            $(this).addClass('active');
            if(tabOpen != null) {
                tabOpen.removeClass('active');
                tabOpen.animate({left: tabWidth * -3/4}, fadeSpeed);
                clearInterval(interval);
            }
            $(this).animate({left: 0}, fadeSpeed);
            tabOpen = $(this);
            changeText(tabOpen.attr('id'));
            interval = setInterval(function() { changeText(tabOpen.attr('id')); }, switchSpeed);
        } else if($(this).hasClass('active')) {
            $(this).removeClass('active');
            clearInterval(interval);
            curVerse = null;
            tabOpen.animate({left: tabWidth * -3/4}, fadeSpeed);
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
        var id = curText[0].id === 'v1' ? $('#v2') : $('#v1');
        curVerse = getVerse(fruit);
        id.html(curVerse.text + '<div class="reference vmin_font-size2 vw_right8 vh_top76">' + curVerse.reference + '</div>');
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

    function onResize() {
        tabWidth = $(window).height() * 0.16;
        for(var i = 0; i < versesJson.length; i++) {
            var fruit = '#' + versesJson[i].fruit;
            if (!$(fruit).hasClass('active')) {
                $(fruit).css('left', tabWidth * -3/4);
            }
        }
        $('.fruit').css('border-top-right-radius', tabWidth/45);
        $('.fruit').css('border-bottom-right-radius', tabWidth/45);
        $('.fruit').css('border-width', tabWidth/100);
        $('.label').css('font-size', tabWidth/12);
    }
});

