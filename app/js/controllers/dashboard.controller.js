(function(){
  'use strict';

  angular.module('app').controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$scope', '$rootScope', '$timeout', '$mdToast'];

    function DashboardCtrl($scope, $rootScope, $timeout, $mdToast){
      var vm = this;
      vm.details = details;
      vm.reviews = reviews;
      vm.writeReview = writeReview;
      vm.publishReview = publishReview;

      activate();

      function activate(){
        vm.restaurants = $rootScope.restaurants;

        firebase.database().ref('reviews').on('value', function(snapshot) {
          vm.listReviews = snapshot.val();
        });


        for (var i = 0; i < vm.restaurants.length; i++) {
          vm.restaurants[i].isBackground = true;
          vm.restaurants[i].isDetails = false;
          vm.restaurants[i].isReview = false;
          vm.restaurants[i].isWriteReview = false;
        }
      }

      function getDate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd
        }
        if(mm<10){
            mm='0'+mm
        }
        var today = dd+'/'+mm+'/'+yyyy;
        return today;
      }

      function showToast(){
        $mdToast.show({
          parent: angular.element(document.querySelector('#toastContainer')),
          controller: 'ToastShowCtrl',
          templateUrl: '../views/toast-template.html',
          hideDelay: 6000,
          position: "top right"
        });
      }

      function publishReview(restaurant){
        var review = {
          username: restaurant.reviews.userName,
          review: restaurant.reviews.message,
          rate: restaurant.reviews.rate,
          date: getDate(),
          restaurant_id: restaurant.id
        };

        firebase.database().ref('reviews/').push(review);

        restaurant.reviews.userName = '';
        restaurant.reviews.message = '';
        restaurant.reviews.rate = 0;

        restaurant.isBackground = true;
        restaurant.isDetails = false;
        restaurant.isReview = false;
        restaurant.isWriteReview = false;

        showToast();
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
        //   if(!restaurant.isWriteReview || !restaurant.isReview){
        //     restaurant.isBackground = true;
        //     restaurant.isDetails = false;
        //     restaurant.isReview = false;
        //     restaurant.isWriteReview = false;
        //   }
        // }, 10000);
      }

    }

})();
