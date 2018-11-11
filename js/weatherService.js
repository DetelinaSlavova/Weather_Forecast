app.service('WeatherService', function ($http) {
    this.getCity = function (city) {
        return $http.get('http://api.apixu.com/v1/forecast.json?key=29d83fa2298a47d29bb121845161212&q=' + city);
    }
});

