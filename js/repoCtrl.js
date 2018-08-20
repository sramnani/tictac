/*
@sramnani
http://github.com/sramnani
*/

app.controller('repoCtrl',function($scope,$http,$base64,$state,$stateParams,GHRepo,$window,authenticateService) {

    //Initialize Github repo factory to get repo list
    $scope.ghRepo = new GHRepo();

    $scope.username = $window.localStorage['username'];
    $scope.authdata = $window.localStorage['authdata'];

    $scope.clearCredentials = function () {
        authenticateService.clearCredentials();

        $state.go('login');
    }

    //Function to get role for a user
    $scope.getRole = function (repo) {
        if (repo.owner.login === $scope.username) {
            return "owner";
        }
        else {
            console.log(repo.permissions)
            if (!repo.permissions.admin) {
                return "collaborator";
            }
            else {
                return "organization_member";
            }
        }

    }
    $scope.refresh = function () {
        $window.location.reload();

    }

    //Function to get privacy for a repo

    $scope.getPrivacy = function (repo) {
        if (repo.private === false) {
            return "public";
        }
        else {
            return "private"
        }

    };

});

//Factory function to fetch repo data
app.factory('GHRepo', function($http) {
    var GHRepo = function() {
        this.repos = [];
        this.busy = false;
        this.page = 1
    };

    GHRepo.prototype.nextPage = function() {
        if (this.busy) return;
        this.busy = true;


        var url = "https://api.github.com/user/repos?page="+ this.page + "&per_page=50" + "&sort=created_at&order=desc";
        $http.get(url).success(function(data) {
            var items = data;
            for (var i = 0; i < items.length; i++) {
                this.repos.push(items[i]);
            }
            this.page += 1
            this.busy = false;
        }.bind(this));
    };

    return GHRepo;
});