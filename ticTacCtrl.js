app.controller('ticTacController', function ($scope) {
    $scope.player = 'O';

    $scope.instructions = "your turn p1";
    var turn = 0;
    $scope.ticTacBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    var winner = null;
    $scope.winner = null;
    $scope.getCellValue = function (row, col) {
        var value = cellValue(row, col);
        if (value !== null) {
            return value;
        }
        else {
            return '-';
        }
    }
    function nextPlayer(player) {
        return {
            O: 'X',
            X: 'O'
        }[player]
    }

    function cellValue(row, col) {
        return $scope.ticTacBoard[row][col];
    };
    function setCell(row, col, value) {
        $scope.ticTacBoard[row][col] = value;
    };
    $scope.cellClick = function (row, col) {
        if ($scope.winner !== null) {
            $scope.instructions = 'Already game over';
            return;
        }

        setCell(row, col, $scope.player);

        checkIfWon();
        if ($scope.player === 'X') {
            $scope.player = 'O';
        }
        else if ($scope.player === 'O') {
            $scope.player = 'X';
        }
    }
    function checkIfWon() {
        var winner = null, empty = false;

        // check for any empty cell
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (!cellValue(i, j)) empty = true
            }
        }

        // no more empty cell - no winner
        if (!empty) {
            $scope.winner = 'NONE';
            return;
        }
        for (var i = 0; i < 3; i++) {
            if (cellValue(0, i) !== null && cellValue(0, i) == cellValue(1, i) && cellValue(1, i) == cellValue(2, i)) {
                winner = cellValue(0, i);
            }
            if (cellValue(i, 0) !== null && cellValue(i, 0) == cellValue(i, 1) && cellValue(i, 1) == cellValue(i, 2)) {
                winner = cellValue(i, 0);
            }
        }

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