var app = angular.module('app', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'WeatherController',
            templateUrl: 'templates/weather.htm'

        })
        .when('/error', {
            controller: 'WeatherController',
            templateUrl: 'templates/error.htm',
        })
});