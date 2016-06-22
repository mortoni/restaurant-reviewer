(function () {
    'use strict';

    angular.module('app').controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$state', 'Auth'];

    function LoginCtrl($scope, $state, Auth) {
      var vm = this;

      vm.newUser = {};
      vm.user = {};
      vm.dashboard = true;

      // vm.doFacebookLogin = doFacebookLogin;
      vm.doLogin = doLogin;
      vm.doSignUp = doSignUp;

      var provider = new firebase.auth.FacebookAuthProvider();

      activate();

      function activate() {

      }

      // function doFacebookLogin() {
      //
      //   firebase.auth().signInWithPopup(provider).then(function(result) {
      //      // User signed in!
      //      $rootScope.user = result.user;
      //      if($rootScope.user)
      //        $state.go('app.dashboard');
      //   }).catch(function(error) {
      //     // An error occurred
      //   });
      //
      // }
      //
      // $rootScope.$watch("user", function handleUser() {
      //   if($rootScope.user)
      //     var teste = 1;
      //     //$state.go('app.dashboard');
      // });

      function createUser(){
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
      }

      function doLogin(){
        //TODO get user from firebase and populate the service.
        firebase.auth().signInWithEmailAndPassword(vm.user.email, vm.user.password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });

        var fireUser = firebase.auth().currentUser;

        // var currentUser{
        //   email: fireUser.em,
        //   image: ,
        //   name: ,
        // }

        Auth.setUser('teste');
        $state.go('app.dashboard');
      }

      function doSignUp(){

        firebase.auth().createUserWithEmailAndPassword(vm.newUser.email, vm.newUser.password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });

        var user = firebase.auth().currentUser;

        user.updateProfile({
          displayName: vm.newUser.name,
        }).then(function() {
          $state.go('app.dashboard');
        }, function(error) {
          // An error happened.
        });
      }
    }
})();
