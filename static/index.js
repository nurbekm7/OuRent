var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.html",
    })
    .when("/catalog.html/:cat_id", {
        templateUrl : "catalog.html",
    })
    .when("/paris", {
        templateUrl : "paris.htm",
//        controller : "parisCtrl"

    });

    $locationProvider.html5Mode(true);
});
