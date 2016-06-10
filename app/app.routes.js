(function(){
    'use strict';
    angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

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
        templateUrl: 'views/app.dashboard.html',
      })
      //login
      .state('login', {
        url: '/login',
        controller: 'LoginCtrl',
        templateUrl: 'views/login.html',
        resolve: {
          delay: function($q, $timeout) {
            var delay = $q.defer();
            $timeout(delay.resolve, 3000);
            return delay.promise;
          }
        }
      })
      //signup
      .state('signup', {
        url: '/signup',
        controller: 'LoginCtrl',
        templateUrl: 'views/signup.html'
      });
    }]);
})();
