(function(){
  'use strict';

  angular.module('app').controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$scope', '$rootScope', '$timeout'];

    function DashboardCtrl($scope, $rootScope, $timeout){
      var vm = this;
      vm.restaurants = $rootScope.restaurants;
      vm.details = details;
      vm.reviews = reviews;
      vm.writeReview = writeReview;

      vm.isBackground = true;
      vm.isDetails = false;
      vm.isReview = false;
      vm.isWriteReview = false;

      activate();

      function activate(){

      }

      function details(){
        active('detail');
      }

      function reviews() {
        active('review');
      }

      function writeReview() {
        active('write');
      }

      function active(who){
        switch (who) {
          case 'detail':
            vm.isBackground = false;
            vm.isDetails = true;
            vm.isReview = false;
            vm.isWriteReview = false;
            break;
          case 'review':
            vm.isBackground = false;
            vm.isDetails = false;
            vm.isReview = true;
            vm.isWriteReview = false;
            break;
          case 'write':
            vm.isBackground = false;
            vm.isDetails = false;
            vm.isReview = false;
            vm.isWriteReview = true;
            break;
        }

        $timeout(function () {
          if(!vm.isWriteReview){
            vm.isBackground = true;
            vm.isDetails = false;
            vm.isReview = false;
            vm.isWriteReview = false;
          }
        }, 10000);
      }

    }

})();
