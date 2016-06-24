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
        firebase.database().ref('restaurants').on('value', function(snapshot) {
          var teste = snapshot.val();
          // restSrv.setRestaurants(snapshot.val());
          // delay.resolve();
        });
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

      function createUser() {
        firebase.auth().createUserWithEmailAndPassword(vm.newUser.email, vm.newUser.password).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
      }

      function updateUser() {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            if(user.email == vm.newUser.email) {
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
                // An error happened.
              });
            }
            var teste = 1;
          } else {
            // No user is signed in.
          }
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
        // var user = firebase.auth().currentUser;

        // if(user) {
        //   var gravatarURL = gravatar.create(vm.newUser.email, {
        //     size: 200,     // 1- 2048px
        //     defaultImage: 'retro', // 'identicon', 'monsterid', 'wavatar', 'retro', 'blank'
        //     rating: 'g',   // 'pg', 'r', 'x'
        //     secure: true,
        //     forceDefault: true
        //   });
        //
        //
        //   user.updateProfile({
        //     displayName: vm.newUser.name
        //     // photoURL: gravatarURL
        //   }).then(function() {
        //     var currentUser = {
        //       email : vm.newUser.email,
        //       image : gravatarURL,
        //       name  : vm.newUser.name,
        //     };
        //
        //     Auth.setUser(currentUser);
        //     $state.go('app.dashboard');
        //   }, function(error) {
        //     // An error happened.
        //   });
        // }


      }
    }
})();
