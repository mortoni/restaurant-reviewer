(function(){
  'use strict';

  angular.module('app').controller('ToastShowCtrl', ToastShowCtrl);

    ToastShowCtrl.$inject = ['$scope', '$mdToast'];

    function ToastShowCtrl($scope, $mdToast){
      $scope.closeToast = function() {
        $mdToast.hide();
      };
    }
})();
