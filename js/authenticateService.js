/*
@sramnani
http://github.com/sramnani
*/

app.factory('authenticateService',function ($http,$q,$base64,$window,$rootScope) {

    return {

        // call to get all cars data
        isAuthenticate : function(username,password) {
            var config = {headers: {
                'Authorization': "Basic " + $base64.encode(username + ':' + password),
                'Accept': 'application/json;odata=verbose'
            }
            };
            var deferred = $q.defer();
            // var key = $window.localStorage['keyy'];

            //Calling Web API to fetch merchant locations
            $http.get('https://api.github.com/user/repos', config).success(function (data) {

                //Passing data to deferred's resolve function on successful completion
                deferred.resolve(data);
            }).error(function () {

                //Sending a friendly error message in case of failure
                deferred.reject("An error occured while fetching items");
            });

            return deferred.promise;

        },
        clearCredentials : function () {
            $rootScope.globals = {};
            $window.localStorage.clear('authdata');
            $window.localStorage.clear('username');
            $http.defaults.headers.common.Authorization = 'Basic ';
        },


        setCredentials : function (username, password) {
            var authdata = $base64.encode(username + ':' + password);

            $rootScope.info = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $window.localStorage['username'] = $rootScope.info.currentUser.username;
            $window.localStorage['authdata'] = $rootScope.info.currentUser.authdata;
        }

}

});