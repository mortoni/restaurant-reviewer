(function(){
    'use strict';
    angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/app/dashboard');

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
        resolve: {
          delay: function($q, $timeout) {
            var delay = $q.defer();
            $timeout(delay.resolve, 600);
            return delay.promise;
          }
        }
      });
    }]);
})();
