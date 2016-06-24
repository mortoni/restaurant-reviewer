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
        firebase.auth().createUserWithEmailAndPassword(email, password)
        then(function(user) {
          //TODO success message
        }).catch(function(error) {
          //TODO manage error
          var errorCode = error.code;
          var errorMessage = error.message;
        });
      }

      function doLogin(){
        firebase.auth().signInWithEmailAndPassword(vm.user.email, vm.user.password)
        .then(function(user) {
          var currentUser = {
            email: user.email,
            image: user.photoURL,
            name: user.displayName,
          };

          Auth.setUser(currentUser);
          $state.go('app.dashboard');
        }).catch(function(error) {
          //TODO manage error
          var errorCode = error.code;
          var errorMessage = error.message;
        });
      }

      function createUser() {
        firebase.auth().createUserWithEmailAndPassword(vm.newUser.email, vm.newUser.password).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
      }

      function updateUser() {
        var user = firebase.auth().currentUser;

        user.updateProfile({
          displayName: vm.newUser.name,
          photoURL: getPhotoURL()
        }).then(function() {
          var currentUser = {
            email : user.email,
            image : user.photoURL,
            name  : user.displayName,
          };

          Auth.setUser(currentUser);
          $state.go('app.dashboard');
        }, function(error) {
          //TODO manage error
        });
      }

      function getPhotoURL() {
        return gravatar.create(vm.newUser.email, {
            size: 200,     // 1- 2048px
            defaultImage: 'retro', // 'identicon', 'monsterid', 'wavatar', 'retro', 'blank'
            rating: 'g',   // 'pg', 'r', 'x'
            secure: true,
            forceDefault: true
          });
      }

      function doSignUp(){
        createUser();
        updateUser();
      }
    }
})();
