(function(){
  'use strict';

  angular.module('app').controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$scope', '$rootScope', '$timeout'];

    function DashboardCtrl($scope, $rootScope, $timeout){
      var vm = this;
      vm.details = details;
      vm.reviews = reviews;
      vm.writeReview = writeReview;
      vm.publishReview = publishReview;

      activate();

      function activate(){
        vm.restaurants = $rootScope.restaurants;

        for (var i = 0; i < vm.restaurants.length; i++) {
          vm.restaurants[i].isBackground = true;
          vm.restaurants[i].isDetails = false;
          vm.restaurants[i].isReview = false;
          vm.restaurants[i].isWriteReview = false;
        }
      }

      function publishReview(restaurant){
        restaurant.isBackground = true;
        restaurant.isDetails = false;
        restaurant.isReview = false;
        restaurant.isWriteReview = false;
      }

      function details(restaurant){
        active('detail', restaurant);
      }

      function reviews(restaurant) {
        active('review', restaurant);
      }

      function writeReview(restaurant) {
        active('write', restaurant);
      }

      function active(who, restaurant){
        switch (who) {
          case 'detail':
            restaurant.isBackground = false;
            restaurant.isDetails = true;
            restaurant.isReview = false;
            restaurant.isWriteReview = false;
            break;
          case 'review':
            restaurant.isBackground = false;
            restaurant.isDetails = false;
            restaurant.isReview = true;
            restaurant.isWriteReview = false;
            break;
          case 'write':
            restaurant.isBackground = false;
            restaurant.isDetails = false;
            restaurant.isReview = false;
            restaurant.isWriteReview = true;
            break;
        }

        // $timeout(function () {
        //   if(!restaurant.isWriteReview){
        //     restaurant.isBackground = true;
        //     restaurant.isDetails = false;
        //     restaurant.isReview = false;
        //     restaurant.isWriteReview = false;
        //   }
        // }, 10000);
      }

    }

})();
