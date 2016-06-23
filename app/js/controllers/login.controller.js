(function () {
    'use strict';

    angular.module('app').controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$state', 'Auth', 'gravatar'];

    function LoginCtrl($scope, $state, Auth, gravatar) {
      var vm = this;

      vm.newUser = {};
      vm.user = {};
      vm.doLogin = doLogin;
      vm.doSignUp = doSignUp;

      activate();

      function activate() {

      }

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

        var currentUser = {
          email: fireUser.email,
          image: fireUser.photoURL,
          name: fireUser.displayName,
        };

        Auth.setUser(currentUser);
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
          photoURL: gravatar.create(vm.newUser.email, {
          	size: 200,     // 1- 2048px
          	defaultImage: 'retro', // 'identicon', 'monsterid', 'wavatar', 'retro', 'blank'
          	rating: 'g',   // 'pg', 'r', 'x'
          	secure: true,
          	forceDefault: true
          })
        }).then(function() {
          $state.go('app.dashboard');
        }, function(error) {
          // An error happened.
        });
      }
    }
})();
