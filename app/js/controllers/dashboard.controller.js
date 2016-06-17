(function(){
  'use strict';

  angular.module('app').controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$scope', '$rootScope'];

    function DashboardCtrl($scope, $rootScope){
      var vm = this;
      vm.restaurants = $rootScope.restaurants;
      vm.details = details;
      vm.reviews = reviews;
      vm.writeReview = writeReview;

      activate();

      function activate(){

      }

      function details(){

      }

      function reviews() {

      }

      function writeReview() {

      }

    }

})();
