// var app = angular.module('app', ['ngRoute']);


// public/core.js
// console.log('koay!')
var scotchTodo = angular.module('scotchTodo', [])
  .controller('mainController', function($scope,$http) {
    $http.get('/api/articles')
        .success(function(data) {
            $scope.articles = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $http.get('/api/replys')
        .success(function(data) {
            $scope.replys = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $http.get('/api/today_article')
        .success(function(data) {
            $scope.today_article = data[0]["count(*)"];
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $http.get('/api/today_reply')
        .success(function(data) {
            $scope.today_reply = data[0]["count(*)"];
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $http.get('/api/article')
        .success(function(data) {
            $scope.tod = data[0]["count(*)"];
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
});

// scotchTodo.config(function($routeProvider) {
//   $routeProvider
//     .when('/test', {
//       template: '<span>heyhey</span>'
//     })
// });
