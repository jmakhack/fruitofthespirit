'use strict';

angular.module('fruitsofthespiritApp')
  .controller('MainCtrl', function ($scope, $http) {

    $http.get('/api/fruits').success(function(fruits) {
      $scope.fruits = fruits;
    });

    $(document).ready(function() {
		var tabOpen = null;
		var curText = $('.title');
		var speed = 800;

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
					tabOpen.animate({left: "-=200"}, speed, function() {});
				}
				$(this).animate({left: "+=190"}, speed, function() {});
				tabOpen = $(this);
			} else if(parseInt($(this).css('left')) === 0) {
				tabOpen.animate({left: "-=200"}, speed, function() {});
				tabOpen = null;
			}
		});
	});
  });

