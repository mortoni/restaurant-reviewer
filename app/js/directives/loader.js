(function(){
  'use strict';
  angular.module('app').directive('resolveLoader', function($rootScope, $timeout) {

  return {
    restrict: 'E',
    replace: false,
    templateUrl: '../views/spin-loader.html',
    link: function(scope, element) {

      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        // if (previousRoute) return;

        $timeout(function() {
          element.removeClass('ng-hide');
        });
      });

      $rootScope.$on('$stateChangeSuccess', function() {
        element.addClass('ng-hide');
        // $timeout(element.addClass('ng-hide'), 2000);
      });
    }
  };
});
})();
