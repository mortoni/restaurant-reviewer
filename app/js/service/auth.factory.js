(function () {
    'use strict';

    angular.module('app').factory('Auth', function(){
      var user;

      function setUser(aUser){
        user =  aUser;
      }

      function isLoggedIn(){
        return(user)? user : false;
      }

      return {
        setUser     : setUser,
        isLoggedIn  : isLoggedIn
      }
    });


})();
