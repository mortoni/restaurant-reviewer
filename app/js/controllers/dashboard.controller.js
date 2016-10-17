(function(){
  'use strict';

  angular.module('app').controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$scope', '$rootScope', '$timeout', '$mdToast', '$q', 'Auth', 'restSrv'];

    function DashboardCtrl($scope, $rootScope, $timeout, $mdToast, $q, Auth, restSrv){
      var vm = this;

      $rootScope.dashboard = true;

      vm.user = Auth.getUser();
      vm.details = details;
      vm.reviews = reviews;
      vm.writeReview = writeReview;
      vm.publishReview = publishReview;
      vm.calcRate = calcRate;
      vm.turnCard = turnCard;

      activate();

      function activate(){
        vm.restaurants = restSrv.getRestaurants();

        vm.restaurants.forEach(function(restaurant){
          restaurant.reviews = {};
          restaurant.reviews.rate = 0;
        });

        firebase.database().ref('reviews').on('value', function(snapshot) {
          vm.listReviews = snapshot.val();
          var teste = vm.listReviews[vm.listReviews.length -1];
        });


        for (var i = 0; i < vm.restaurants.length; i++) {
          vm.restaurants[i].isBackground = true;
          vm.restaurants[i].isDetails = false;
          vm.restaurants[i].isReview = false;
          vm.restaurants[i].isWriteReview = false;
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

      function halfStart(){

      }

      function calcRate(){

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

        restaurant.isBackground = true;
        restaurant.isDetails = false;
        restaurant.isReview = false;
        restaurant.isWriteReview = false;

        // showToast(); TODO
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
            calcStars(restaurant);
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

      function turnCard() {
        console.log('oie');
        var test = $scope.class;
        vm.hover = true;
      }

    }

})();
