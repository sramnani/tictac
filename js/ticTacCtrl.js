//Program in angular for the tic tac toe game

app.controller('ticTacController', function ($scope) {
    $scope.player = 'O';
    $scope.instructions = "Your Turn PLAYER 1";
    $scope.ticTacBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    var winner = null;
    $scope.winner = null;
    $scope.resultObj = {
        "O" : "PLAYER 1",
        "X" : "PLAYER 2"
    }
    $scope.getCellValue = function (row, col) {
        var value = cellValue(row, col);
       if (value === null) {
            return '--';
        }

        return value;
    }

    function cellValue(row, col) {
        return $scope.ticTacBoard[row][col];
    };

    function setCellValue(row, col, value) {
        $scope.ticTacBoard[row][col] = value;
    };

    //Function to add value
    $scope.addVal = function (row, col) {
        if ($scope.winner !== null) {
            $scope.instructions = 'Already game over';
            return;
        }

        setCellValue(row, col, $scope.player);

        checkIfWon();
        if ($scope.player === 'X') {
            $scope.player = 'O';
            if($scope.winner === null) {
                $scope.instructions = "Your Turn PLAYER 1";
            }
            else {
                $scope.instructions = "";
            }
        }
        else if ($scope.player === 'O') {
            $scope.player = 'X';
            if($scope.winner === null) {
                $scope.instructions = "Your Turn PLAYER 2";
            }
            else {
                $scope.instructions = "";
            }
        }
    }

    //Function to rest the game;
    $scope.resetGame = function () {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                setCellValue(i, j, null)
            }
        }
        $scope.instructions = "Your Turn PLAYER 1";
        $scope.player = 'O';
        $scope.winner = null;
    }



    function checkEmpty() {
        var isCellEmpty;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (!cellValue(i, j)) {
                    isCellEmpty = true;

                }
            }
        }
        return isCellEmpty;
    }

    //Function to check if we have found a winner
    function checkIfWon() {
        var winner = null,
            isCellEmpty = false;

        // check for any empty cell
        isCellEmpty = checkEmpty();

        // no more empty cell - no winner
        if (!isCellEmpty) {
            $scope.winner = 'none';
            return;
        }

        //Check Horizontal or vertical match
        for (var i = 0; i < 3; i++) {
            if (cellValue(0, i) !== null && cellValue(0, i) == cellValue(1, i) && cellValue(1, i) == cellValue(2, i)) {
                winner = cellValue(0, i);
            }
            if (cellValue(i, 0) !== null && cellValue(i, 0) == cellValue(i, 1) && cellValue(i, 1) == cellValue(i, 2)) {
                winner = cellValue(i, 0);
            }
        }

        //Check diagonal match

        if (cellValue(0, 0) !== null && cellValue(0, 0) == cellValue(1, 1) && cellValue(1, 1) == cellValue(2, 2)) {
            winner = cellValue(0, 0);
        }

        if (cellValue(0, 2) !== null && cellValue(0, 2) == cellValue(1, 1) && cellValue(1, 1) == cellValue(2, 0)) {
            winner = cellValue(0, 2);
        }
        if (winner !== null && typeof (winner) !== undefined) {
            $scope.winner = winner;

        }


    }


});