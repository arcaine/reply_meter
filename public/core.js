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


});
console.log('koay!');

// function mainController($scope, $http){
    // $scope.formData = {};

    // when landing on the page, get all todos and show them

    // when submitting the add form, send the text to the node API
    // $scope.createTodo = function() {
    //     $http.post('/api/todos', $scope.formData)
    //         .success(function(data) {
    //             $scope.formData = {}; // clear the form so our user is ready to enter another
    //             $scope.todos = data;
    //             console.log(data);
    //         })
    //         .error(function(data) {
    //             console.log('Error: ' + data);
    //         });
    // };

    // delete a todo after checking it
    // $scope.deleteTodo = function(id) {
    //     $http.delete('/api/todos/' + id)
    //         .success(function(data) {
    //             $scope.todos = data;
    //             console.log(data);
    //         })
    //         .error(function(data) {
    //             console.log('Error: ' + data);
    //         });
    // };
// }
