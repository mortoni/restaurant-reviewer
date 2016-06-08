(function(){
  'use strict';
  angular.module('app').directive('resolveLoader', function($rootScope, $timeout) {

  return {
    restrict: 'E',
    replace: true,
    template: '<div class="ng-hide"><strong>Welcome!</strong> Content is loading, please hold.</div> asdaf',
    link: function(scope, element) {

      $rootScope.$on('$routeChangeStart', function(event, currentRoute, previousRoute) {
        if (previousRoute) return;

        $timeout(function() {
          element.removeClass('ng-hide');
        });
      });

      $rootScope.$on('$routeChangeSuccess', function() {
        element.addClass('ng-hide');
      });
    }
  };
});
})();
