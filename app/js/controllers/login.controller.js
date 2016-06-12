(function () {
    'use strict';

    angular.module('app').controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$rootScope', '$state'];

    function LoginCtrl($scope, $rootScope, $state) {
      var vm = this;
      var user;

      vm.doFacebookLogin = doFacebookLogin;

      var provider = new firebase.auth.FacebookAuthProvider();

      activate();

      function activate() {

      }

      function doFacebookLogin() {

        // firebase.auth().signInWithPopup(provider).then(function(result) {
        //   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        //   var token = result.credential.accessToken;
        //   // The signed-in user info.
        //   $rootScope.user = result.user;
        //   $state.go('app.dashboard');
        //   // ...
        // }).catch(function(error) {
        //   // Handle Errors here.
        //   var errorCode = error.code;
        //   var errorMessage = error.message;
        //   // The email of the user's account used.
        //   var email = error.email;
        //   // The firebase.auth.AuthCredential type that was used.
        //   var credential = error.credential;
        //   // ...
        // });

        // firebase.auth().signInWithRedirect(provider);

        firebase.auth().signInWithPopup(provider).then(function(result) {
           // User signed in!
           $rootScope.user = result.user;
           if($rootScope.user)
             $state.go('app.dashboard');
        }).catch(function(error) {
          // An error occurred
        });

      }

      $rootScope.$watch("user", function handleUser() {
        if($rootScope.user)
          var teste = 1;
          //$state.go('app.dashboard');
      });

      // firebase.auth().signInWithPopup(provider).then(function(result) {
      //    // User signed in!
      //    $rootScope.user = result.user;
      //    if($rootScope.user)
      //      $state.go('app.dashboard');
      // }).catch(function(error) {
      //   // An error occurred
      // });

      // firebase.auth().getRedirectResult().then(function(result) {
      //   if (result.credential) {
      //     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      //     var token = result.credential.accessToken;
      //     // ...
      //   }
      //   // The signed-in user info.
      //   $rootScope.user = result.user;
      //   if($rootScope.user)
      //     $state.go('app.dashboard');
      //
      // }).catch(function(error) {
      //   // Handle Errors here.
      //   var errorCode = error.code;
      //   var errorMessage = error.message;
      //   // The email of the user's account used.
      //   var email = error.email;
      //   // The firebase.auth.AuthCredential type that was used.
      //   var credential = error.credential;
      //   // ...
      // });
    }
})();
