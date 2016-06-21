(function () {
  'use strict';

  angular.module('app').run(['$rootScope', '$state', '$stateParams', 'Auth', function($rootScope, $state, $stateParams, Auth) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
      $rootScope.dashboard = false;
      $rootScope.hideSpin = false;
      var requireLogin = toState.data.requireLogin;

      if (requireLogin && typeof Auth.getUser() === 'undefined') {
        event.preventDefault();
        $state.go('core.login');
      }

      event.targetScope.$watch('$viewContentLoaded', function () {
        angular.element('html, body, #content').animate({ scrollTop: 0 }, 200);
        setTimeout(function () {
          angular.element('#wrap').css('visibility','visible');
          if (!angular.element('.dropdown').hasClass('open')) {
            angular.element('.dropdown').find('>ul').slideUp();
          }
        }, 200);
      });

      $rootScope.containerClass = toState.containerClass;
    });

    firebaseINI();

    function firebaseINI() {
      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyBTo7di2KvJ2HEBMqF1fJ6MQBVNEbI5tlA",
        authDomain: "udacitythree.firebaseapp.com",
        databaseURL: "https://udacitythree.firebaseio.com",
        storageBucket: "",
      };
      firebase.initializeApp(config);
    }
  }]);
})();
