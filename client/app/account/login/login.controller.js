'use strict';

angular.module('wanderlustApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };

    $scope.fbLogin = function() {
      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
        if(response.status === 'connected') {
          FB.api('/me', function(response) {
            Auth.login({
              email: response.email,
              password: 'facebook'
            })
            .then( function() {
              // Logged in, redirect to home
              $location.path('/');
            })
            .catch( function(err) {
              $scope.errors.other = err.message;
            });
          });
        }
      });
    };
  });
