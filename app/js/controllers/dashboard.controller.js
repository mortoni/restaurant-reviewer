(function(){
  'use strict';

  angular.module('app').controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$scope', 'restaurants'];

    function DashboardCtrl($scope, restaurants){
      var vm = this;
      vm.restaurants = [];
      var teste = restaurants;
      vm.teste = teste;

      // vm.restaurants = restaurants;
      activate();
      
      function activate(){
        firebase.database().ref('restaurants').on('value', function(snapshot) {
          vm.restaurants = snapshot.val();
        });
      }

    }

})();
