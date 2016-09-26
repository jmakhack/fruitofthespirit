'use strict';

import $ from 'jquery';
require("./style.less");

$(document).ready(function() {

    const titleSpeed     = 20000;
    const switchSpeed    = 16000;
    const fadeSpeed      = 800;

    const versesJson     = require("./verses.json");
    const changeInterval = createNewInterval('random', titleSpeed);
    const sumLogVerses   = versesJson.reduce((x,y) => x + Math.log(y.verses.length), 0);

    let curText          = $('.title');
    let tabWidth         = $(window).height() * 0.16;

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
            let fruit = $(this).attr('id');
            changeText(fruit);
            changeInterval(fruit, switchSpeed);
        } else if ($(this).hasClass('active')) {
            openTab(null);
            changeInterval('random', titleSpeed);
            fadeIn($('.title'));
        }
    });

    $('.verse').click(function() {
        const ref = $(this).find('.reference').text();
        const colon = ref.indexOf(':');
        const hyphen = ref.indexOf('-');
        const chapter = ref.substring(0, colon);
        const verse = ref.substring(colon + 1, hyphen != -1 ? hyphen : ref.length);
        window.open(`http://nasb.literalword.com/?h=${verse}&q=${chapter}`, '_blank');
    });

    $('#subtitle').click(function() {
        window.open('http://nasb.literalword.com/?q=galations+5%3A22-23', '_blank');
    });

    function changeText(fruit) {
        changeInterval(fruit, switchSpeed);
        if (fruit === 'random') {
            fruit = getRandomFruit();
        }
        const id = curText[0].id === 'v1' ? $('#v2') : $('#v1');
        const curVerse = getVerse(fruit, curText[0].id);
        id.html(`${curVerse.text}<div class="reference vmin_font-size2 vw_right8 vh_top76">${curVerse.reference}</div>`);
        openTab(fruit);
        fadeIn(id);
    }

    function getRandomFruit() {
        let rand = Math.random();
        let logPercentage;
        for (let i = 0; i < versesJson.length; i++) {
            logPercentage = Math.log(versesJson[i].verses.length) / sumLogVerses;
            if (rand < logPercentage) {
                return versesJson[i].fruit;
            }
            rand -= logPercentage;
        }
        return null;
    }

    function getVerse(fruit, id) {
        const verses = versesJson.find(f => f.fruit === fruit).verses;
        let tries = 0;
        let verse;
        do {
            verse = verses[Math.floor(Math.random() * verses.length)];
        } while (verse.reference === $(`#${id}`).find('.reference').text() && tries++ < 10);
        return verse;
    }

    function openTab(fruit) {
        let tab;
        for (let i = 0; i < versesJson.length; i++) {
            tab = $(`#${versesJson[i].fruit}`);
            if (tab.hasClass('active') && versesJson[i].fruit != fruit) {
                tab.removeClass('active');
                tab.animate({left: tabWidth * -3/4}, fadeSpeed);
            }
        }
        tab = $(`#${fruit}`);
        if (fruit != null && !tab.hasClass('active')) {
            tab.addClass('active');
            tab.animate({left: 0}, fadeSpeed);
        }
    }

    function createNewInterval(fruit, speed) {
        let interval = setInterval(() => changeText(fruit), speed);
        return function(f, s) {
            if (!(fruit == f && speed == s)) {
                fruit = f, speed = s;
                clearInterval(interval);
                interval = setInterval(() => changeText(f), s);
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
        let fruit;
        for (let i = 0; i < versesJson.length; i++) {
            fruit = `#${versesJson[i].fruit}`;
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

