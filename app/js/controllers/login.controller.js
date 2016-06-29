(function () {
    'use strict';

    angular.module('app').controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$state', 'Auth', 'gravatar', '$mdToast', '$rootScope'];

    function LoginCtrl($scope, $state, Auth, gravatar, $mdToast, $rootScope) {
      var vm = this;

      vm.newUser = {};
      vm.user = {};
      vm.doLogin = doLogin;
      vm.doSignUp = doSignUp;
      activate();

      function activate() {
        vm.header = true;
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
          vm.currentUser = Auth.getUser();
          $state.go('app.dashboard');
        }).catch(function(error) {
          showToast();
          var errorCode = error.code;
          $rootScope.errorMessage = error.message;
        });
      }

      function showToast() {
        $mdToast.show({
          parent: angular.element(document.querySelector('#toastContainer')),
          controller: 'ToastShowCtrl',
          templateUrl: '../views/toast-template.html',
          hideDelay: 6000,
        });
      }

      function createUser() {
        firebase.auth().createUserWithEmailAndPassword(vm.newUser.email, vm.newUser.password).catch(function(error) {
          showToast();
          var errorCode = error.code;
          $rootScope.errorMessage = error.message;
          return false;
        });
        return true;
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
          vm.currentUser = Auth.getUser();
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
        if(createUser())
          updateUser();
      }
    }
})();
