/*
@sramnani
http://github.com/sramnani
*/
var app = angular.module('app',['base64','ui.router','infinite-scroll']);


app.config(function($stateProvider, $urlRouterProvider) {


    $stateProvider
        .state('login', {
            url: '/',
            templateUrl: '/views/login.html',
            controller: 'loginCtrl'


        })
        .state('home', {
            url: '/repo',
            templateUrl: '/views/repos.html',
            controller: 'repoCtrl',
            params: {
                data: null
            }

        })
    $urlRouterProvider.otherwise("/repo");

});
app.run(function($rootScope,$state,$window,$http,$location){

    var authData = $window.localStorage["authdata"];
    if (authData ) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + authData // jshint ignore:line
    }
    $rootScope.$on('$stateChangeStart',function(ev,toState,toParams,fromState,fromParams,err){

        if ($location.path() !== '/' && !authData) {
            $location.path('/');
        }
        else if ($location.path() === '/' && authData) {
            $location.path('/repo');
        }

    })


})



