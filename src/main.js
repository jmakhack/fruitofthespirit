'use strict';

import $ from 'jquery';
require("./style.less");

$(document).ready(function() {

    var versesJson     = require("./verses.json");
    var curText        = $('.title');
    var titleSpeed     = 20000;
    var switchSpeed    = 16000;
    var fadeSpeed      = 800;
    var changeInterval = createNewInterval('random', titleSpeed);
    var numVerses      = versesJson.reduce(function(x,y) { return x + y.verses.length; }, 0);
    var tabWidth       = $(window).height() * 0.16;

    new vUnit({
        CSSMap: {
            '.vh_height'      : { property: 'height'    , reference: 'vh'   },
            '.vh_width'       : { property: 'width'     , reference: 'vh'   },
            '.vmin_font-size' : { property: 'font-size' , reference: 'vmin' },
            '.vh_top'         : { property: 'top'       , reference: 'vh'   },
            '.vh_bottom'      : { property: 'bottom'    , reference: 'vh'   },
            '.vw_right'       : { property: 'right'     , reference: 'vw'   },
            '.vw_left'        : { property: 'left'      , reference: 'vw'   },
            '.vh_left'        : { property: 'left'      , reference: 'vh'   }
        },
        onResize: onResize
    }).init();

    $('.fruit').hover(function() {
        if (!$(this).hasClass('active')) {
            $(this).animate({left: tabWidth * -23/32}, 0);
        }
    }, function() {
        if (!$(this).hasClass('active')) {
            $(this).animate({left: tabWidth * -3/4}, 0);
        }
    });

    $('.fruit').click(function() {
        if (!$(this).hasClass('active')) {
            var fruit = $(this).attr('id');
            openTab(fruit);
            changeText(fruit);
            changeInterval(fruit, switchSpeed);
        } else if ($(this).hasClass('active')) {
            openTab(null);
            changeInterval('random', titleSpeed);
            fadeIn($('.title'));
        }
    });

    $('.verse').click(function() {
        var ref = $(this).find('.reference').text();
        var colon = ref.indexOf(':');
        var hyphen = ref.indexOf('-');
        var chapter = ref.substring(0, colon);
        var verse = ref.substring(colon + 1, hyphen != -1 ? hyphen : ref.length);
        window.open('http://nasb.literalword.com/?h=' + verse + '&q=' + chapter, '_blank');
    });

    function changeText(fruit) {
        var id = curText[0].id === 'v1' ? $('#v2') : $('#v1');
        var curVerse = getVerse(fruit, curText[0].id);
        id.html(curVerse.text + '<div class="reference vmin_font-size2 vw_right8 vh_top76">' + curVerse.reference + '</div>');
        fadeIn(id);
    }

    function getVerse(fruit, id) {
        var verse;
        var tries = 0;
        do {
            verse = getRandomVerse(fruit);
        } while (verse.reference === $(id).find('.reference').text() && tries++ < 10);
        return verse;
    }

    function getRandomVerse(fruit) {
        if (fruit === 'random') {
            changeInterval('random', switchSpeed);
            var index = Math.floor(Math.random() * numVerses);
            for (var i = 0; i < versesJson.length; i++) {
                if (index < versesJson[i].verses.length) {
                    openTab(versesJson[i].fruit);
                    return versesJson[i].verses[index];
                }
                index -= versesJson[i].verses.length;
            }
        } else {
            var verses = getFruit(fruit).verses;
            return verses[Math.floor(Math.random() * verses.length)];
        }
        return null;
    }

    function getFruit(fruit) {
        for (var i = 0; i < versesJson.length; i++) {
            if (versesJson[i].fruit === fruit) {
                return versesJson[i];
            }
        }
        return null;
    }

    function openTab(fruit) {
        for (var i = 0; i < versesJson.length; i++) {
            var tab = $('#' + versesJson[i].fruit);
            if (tab.hasClass('active') && versesJson[i].fruit != fruit) {
                tab.removeClass('active');
                tab.animate({left: tabWidth * -3/4}, fadeSpeed);
            }
        }
        tab = $('#' + fruit);
        if (fruit != null && !tab.hasClass('active')) {
            tab.addClass('active');
            tab.animate({left: 0}, fadeSpeed);
        }
    }

    function createNewInterval(fruit, speed) {
        var interval = setInterval(function() { changeText(fruit); }, speed);
        return function(f, s) {
            if (!(fruit == f && speed == s)) {
                fruit = f, speed = s;
                clearInterval(interval);
                interval = setInterval(function() { changeText(f); }, s);
            }
        }
    }

    function fadeIn(text) {
        curText.fadeOut(fadeSpeed);
        curText = text;
        curText.fadeIn(fadeSpeed);
    }

    function onResize() {
        tabWidth = $(window).height() * 0.16;
        for (var i = 0; i < versesJson.length; i++) {
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

