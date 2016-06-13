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
        data: {
          requireLogin: false
        },
        templateUrl: 'views/app.html'
      })
      //dashboard
      .state('app.dashboard', {
        url: '/dashboard',
        controller: 'DashboardCtrl',
        templateUrl: 'views/app.dashboard.html',
        resolve: {
          delay: function($q, $timeout) {
            var delay = $q.defer();
            $timeout(delay.resolve, 5000);
            return delay.promise;
          }
        }
      });

      // .state('signup', {
      //   url: '/signup',
      //   controller: 'LoginCtrl',
      //   templateUrl: 'views/signup.html',
      //   data: {
      //     requireLogin: false
      //   }
      // });
    }]);
})();
