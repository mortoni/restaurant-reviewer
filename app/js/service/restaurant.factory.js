(function () {
    'use strict';

    angular.module('app').factory('restSrv', function(){
      var restaurants = [];
      var reviews = [];

      function getRestaurants() {return restaurants;}
      function setRestaurants(data) {restaurants = data;}
      function getReviews() {return reviews;}
      function setReviews(data) {reviews = data;}

      return {
        getRestaurants  : getRestaurants,
        setRestaurants  : setRestaurants,
        getReviews      : getReviews,
        setReviews      : setReviews
      };
    });


})();
