(function(){
  'use strict';
  angular.module('app').directive('myCard', function($rootScope, $timeout) {

    return {
      restrict: 'A',
      replace: true,
      // templateUrl: '../views/spin-loader.html',
      link: function(scope, element) {
        var cards = document.querySelectorAll(".card:hover .back");
        for ( var i  = 0, len = cards.length; i < len; i++ ) {
          var card = cards[i];
          clickListener( card );
        }

        function clickListener(card) {
          card.addEventListener( "click", function() {
            var c = this.classList;
            c.contains("flipped") === true ? c.remove("flipped") : c.add("flipped");
          });
        }
      }
    };
  });
})();
