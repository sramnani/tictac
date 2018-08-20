/*
@sramnani
http://github.com/sramnani
*/

app.controller('loginCtrl',function($scope,$http,$base64,$state,$location,$timeout,authenticateService){
    $scope.user = {};
    $scope.user.username = '';
    $scope.user.password = '';


    $scope.showSuccess = false;
    $scope.showError = false;

    $scope.authenticate = function(username,password) {
        console.log("Wew");
        console.log(username);
        console.log(password);
        authenticateService.isAuthenticate(username,password).then(function (data) {
            {
                authenticateService.setCredentials(username,password);
                $state.go('home',{data:data}); };

        }),
            function (error) {
                $scope.error = "Error in creating your bussiness!";
        }



    }




});