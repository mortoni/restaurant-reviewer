(function(){
  'use strict';

  angular.module('app').controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$scope', '$rootScope', '$timeout', '$mdToast', '$q', 'Auth', 'restSrv', '$window'];

    function DashboardCtrl($scope, $rootScope, $timeout, $mdToast, $q, Auth, restSrv, $window){
      var vm = this;

      $rootScope.dashboard = true;
      vm.user = Auth.getUser();
      vm.select = select;
      vm.details = details;
      vm.reviews = reviews;
      vm.writeReview = writeReview;
      vm.publishReview = publishReview;

      activate();

      function activate(){
        vm.restaurants = restSrv.getRestaurants();

        vm.restaurants.forEach(function(restaurant){
          restaurant.reviews = {};
          restaurant.reviews.rate = 0;
        });

        firebase.database().ref('reviews').on('value', function(snapshot) {
          vm.listReviews = snapshot.val();
        });
      }

      function select(restaurant, event){
        if(event == null || event.keyCode === 13){
          vm.selected = restaurant;
          vm.selected.pictures = true;
          vm.selected.detail = false;
          vm.selected.review = false;
          vm.selected.writeReview = false;
          angular.element('#first').focus();
        }
      }

      function details(restaurant){
        active('detail', restaurant);
        $('.detail-first').focus();
      }

      function reviews(restaurant) {
        active('review', restaurant);
        $('.chats').focus();
      }

      function writeReview(restaurant) {
        active('write', restaurant);
        $('.write-first').focus();
      }

      function active(who, restaurant){
        switch (who) {
          case 'detail':
            restaurant.pictures = false;
            restaurant.detail = true;
            restaurant.review = false;
            restaurant.writeReview = false;
            calcStars(restaurant);
            break;
          case 'review':
            restaurant.pictures = false;
            restaurant.detail = false;
            restaurant.review = true;
            restaurant.writeReview = false;
            break;
          case 'write':
            restaurant.pictures = false;
            restaurant.detail = false;
            restaurant.review = false;
            restaurant.writeReview = true;
            break;
        }
      }

      function calcStars(restaurant){
        restaurant.stars = [];
        restaurant.halfStar = [];
        for (var i = 0; i < Math.floor(restaurant.rate); i++) {
          restaurant.stars.push(i)
        }

        if(restaurant.rate % 1 != 0)
          restaurant.halfStar.push(1);
      }

      function publishReview(restaurant){
        var restaurant_rate;
        var review = {
          userName: vm.user.name,
          userPhoto: vm.user.image,
          review: restaurant.reviews.message || '',
          rate: restaurant.reviews.rate,
          date: getDate(),
          restaurant_id: restaurant.id
        };

        firebase.database().ref('reviews/').push(review);

        firebase.database().ref('restaurants/' + (restaurant.id - 1) + '/rate').on('value', function(snapshot) {
          restaurant_rate = snapshot.val() || 5;
        });

        restaurant_rate = (restaurant_rate + review.rate) * 0.5;
        restaurant.rate = restaurant_rate;

        firebase.database().ref('restaurants/' + (restaurant.id - 1) + '/rate').set(restaurant_rate);

        restaurant.reviews.message = '';
        restaurant.reviews.rate = 0;

        restaurant.pictures = true;
        restaurant.detail = false;
        restaurant.review = false;
        restaurant.writeReview = false;

        // showToast(); TODO
      }

      function getDate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        }
        if(mm<10){
            mm='0'+mm;
        }
        today = dd+'/'+mm+'/'+yyyy;
        return today;
      }


    }
})();
