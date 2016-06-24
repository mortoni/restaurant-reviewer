(function(){
    'use strict';
    angular.module('app').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
          function($stateProvider, $urlRouterProvider, $locationProvider) {

      // $locationProvider.html5Mode(true).hashPrefix('!'); //Remove the '#' from URL.

      $urlRouterProvider.otherwise('/app/dashboard');

      $stateProvider

      .state('app', {
        abstract: true,
        url: '/app',
        templateUrl: 'views/app/app.html',
        data: {
          requireLogin: true
        }
      })
      //dashboard
      .state('app.dashboard', {
        url: '/dashboard',
        controller: 'DashboardCtrl',
        templateUrl: 'views/app/app.dashboard.html',
        controllerAs: 'vm'

      })
      .state('core', {
        abstract: true,
        url: '/core',
        templateUrl: 'views/core/core.html',
        data: {
          requireLogin: false
        },
        resolve: {
          restaurants: function($q, restSrv) {
            var delay = $q.defer();
            firebase.database().ref('restaurants').on('value', function(snapshot) {
              restSrv.setRestaurants(snapshot.val());
              delay.resolve();
            });
            return delay.promise;
          },
          reviews: function($q, restSrv) {
            var delay = $q.defer();
            firebase.database().ref('reviews').on('value', function(snapshot) {
              restSrv.setReviews(snapshot.val());
              delay.resolve();
            });
            return delay.promise;
          }
        }
      })
      .state('core.login', {
        url: '/login',
        controller: 'LoginCtrl',
        controllerAs: 'vm',
        templateUrl: 'views/core/core.login.html'
      })
      .state('core.signup', {
        url: '/signup',
        controller: 'LoginCtrl',
        controllerAs: 'vm',
        templateUrl: 'views/core/core.signup.html'
      });
    }]);
})();
