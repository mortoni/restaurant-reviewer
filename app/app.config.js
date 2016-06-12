(function () {
  'use strict';

  angular.module('app').run(['$rootScope', '$state', '$stateParams', 'Auth', function($rootScope, $state, $stateParams, Auth) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$on('$stateChangeSuccess', function(event, toState) {

      if(!$rootScope.user)
        $state.go('login');

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

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      if (!Auth.isLoggedIn()) {
            console.log('DENY');
            event.preventDefault();
            $state.go('login');
      }
      else {
          $location.path('app.dashboard');
      }
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

    // function teste() {
    //   firebase.auth().getRedirectResult().then(function(result) {
    //     if (result.credential) {
    //       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    //       var token = result.credential.accessToken;
    //       // ...
    //     }
    //     // The signed-in user info.
    //     $rootScope.user = result.user;
    //
    //   }).catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // The email of the user's account used.
    //     var email = error.email;
    //     // The firebase.auth.AuthCredential type that was used.
    //     var credential = error.credential;
    //     // ...
    //   });
    // }
  }]);

})();
