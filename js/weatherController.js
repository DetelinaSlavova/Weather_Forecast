app.controller('WeatherController', function ($scope, $rootScope, WeatherService, $location) {
    $scope.city = {
        name: ""
    };
    $rootScope.allResults = [];
    $scope.isError = true;
    $scope.isDisabled = true;

    //The button shoult be click after there is a text in input
    angular.element('#cityname').on('keypress', function () {
        if ($scope.city.name.length > 0) {
            $scope.isDisabled = false;
        }
    });

    // Get result from local storage
    angular.element(document).ready(function () {
        var result = localStorage.getItem('allResults');
        if (result) {
            $rootScope.allResults = JSON.parse(localStorage.getItem('allResults'))
        }
    });

    //Show forecast after receiving of response from API
    $scope.showForecast = function ($event) {
        $event.preventDefault();
        if ($scope.city.name.length > 0) {
            $scope.findResult = {
                city: $scope.city.name,
                url: "",
                date: ""
            }
            WeatherService.getCity($scope.city.name).then(function (response) {
                    $scope.findResult.url = response.config.url;
                    $scope.findResult.date = new Date();
                    $scope.cityForecast = response.data.forecast.forecastday;
                    if ($rootScope.allResults.length < 5) {
                        $rootScope.allResults.push($scope.findResult)
                    } else {
                        $rootScope.allResults.splice(0, 1);
                        $rootScope.allResults.push($scope.findResult);
                    }
                    localStorage.setItem("allResults", JSON.stringify($rootScope.allResults));
                    $scope.isError = false;
                    $scope.city.name = "";
                })
                .catch(function (err) {
                    $rootScope.error = err;
                    $scope.status = err.status;
                    if ($scope.status >= 400 && $scope.status <= 500) {
                        $location.path('/error');
                    }
                });
        }
    }
    // After click on link show result
    $scope.showResults = function (city) {
        WeatherService.getCity(city).then(function (response) {
                $scope.cityForecast = response.data.forecast.forecastday;
            })
            .catch(function (err) {
                $rootScope.error = err;
                $scope.status = err.status;
                if ($scope.status >= 400 && $scope.status <= 500) {
                    $location.path('/error');
                }
            });
    }
});