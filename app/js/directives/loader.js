(function(){
  'use strict';
  angular.module('app').directive('resolveLoader', function($rootScope, $timeout) {

  return {
    restrict: 'E',
    replace: true,
    template: '<div id="spin-load"><div class="load-font">Food Review</div><div id"pe" class="jar"><div class="mouth"></div><div class="neck"></div><div class="base"><div class="liquid"> </div><div class="wave"></div><div class="bubble"></div><div class="bubble"></div></div><div class="bubble"></div><div class="bubble"></div></div></div>',
    // template: '<div id="spin-load" class="ng-hide"><h1>Food Review<h1/><div class="loading spin-1"><div class="loading spin-2"><div class="loading spin-3"><div class="loading spin-4"><div class="loading spin-5"><div class="loading spin-6"></div></div></div></div></div></div></div>',
    link: function(scope, element) {

      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        // if (previousRoute) return;

        $timeout(function() {
          element.removeClass('ng-hide');
        });
      });

      $rootScope.$on('$stateChangeSuccess', function() {
        element.addClass('ng-hide');
      });
    }
  };
});
})();
