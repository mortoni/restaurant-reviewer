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

      function createUser(){
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
      }


    }
})();
