(function () {
    'use strict';

    angular.module('app').factory('Auth', function(){
      var user;

      function setUser(aUser){
        user =  aUser;
      }

      function getUser(){
        return user;
      }

      return {
        setUser  : setUser,
        getUser  : getUser
      }
    });


})();
