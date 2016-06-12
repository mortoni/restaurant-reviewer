(function(){
    'use strict';
    angular.module('app').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
          function($stateProvider, $urlRouterProvider, $locationProvider) {

      // $locationProvider.html5Mode(true).hashPrefix('!'); //Remove the '#' from URL.

      $urlRouterProvider.otherwise('/login');

      $stateProvider

      .state('app', {
        abstract: true,
        url: '/app',
        templateUrl: 'views/app.html'
      })
      //dashboard
      .state('app.dashboard', {
        url: '/dashboard',
        controller: 'DashboardCtrl',
        templateUrl: 'views/app.dashboard.html'
      })
      //core
      // .state('core', {
      //   abstract: true,
      //   url: '/core',
      //   templateUrl: 'views/app.html',
      //   // template: '<div ui-view></div>',
      //   resolve: {
      //     delay: function($q, $timeout) {
      //       var delay = $q.defer();
      //       $timeout(delay.resolve, 2000);
      //       return delay.promise;
      //     }
      //   }
      // })
      //login
      .state('login', {
        url: '/login',
        controller: 'LoginCtrl',
        controllerAs: 'vm',
        templateUrl: 'views/login.html',
        resolve: {
          delay: function($q, $timeout) {
            var delay = $q.defer();
            $timeout(delay.resolve, 3000);
            return delay.promise;
          }
        }
      })
      .state('signup', {
        url: '/signup',
        controller: 'LoginCtrl',
        templateUrl: 'views/signup.html'
      });
    }]);
})();
