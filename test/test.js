function Test() {
    function test1() {

        var matrix = [[-25], [-1, -20], [4, 25, -2], [25, -450, 25, 30]];
        var algo = getAlgorithmInstance();
        var balance = algo.calculateBalanceVector(matrix);
        var normMatrix = algo.calculateOptimizedMatrix(matrix);

        printTest(matrix, normMatrix, 1);

    }

    function test2() {
        var matrix =
            [[-25],
                [-1, -20],
                [4, 25, -2],
                [25, -450, 25, 30],
                [-15, 150, -30, 20, -928],
                [3, -40, 3, 3, 5, 25],
                [1, -22, -2, -2, 4, -15, 5],
                [10, 332, -15, -25, 498, -800, -10, 20],
                [1, -25, -2, 1, -20, 15, -1, -3, 30]];

        var algo = getAlgorithmInstance();
        var balanceBefore = algo.calculateBalanceVector(matrix);
        var normMatrix = algo.calculateOptimizedMatrix(matrix);
        var balanceAfter = algo.calculateBalanceVector(normMatrix);
        printTest(matrix, normMatrix, 2);
    }

    function printTest(matrix, normMatrix, testNum) {
        var div = document.createElement("div");
        div.appendChild(document.createTextNode("TEST " + testNum));
        div.appendChild(document.createElement("br"));
        div.appendChild(document.createTextNode("-------------"));
        div.appendChild(document.createElement("br"));
        div.appendChild(document.createTextNode("BEFORE:"));
        div.appendChild(document.createElement("br"));
        div.appendChild(printMatrix(matrix));
        div.appendChild(document.createTextNode("AFTER:"));
        div.appendChild(document.createElement("br"));
        div.appendChild(printMatrix(normMatrix));
        document.body.appendChild(div);
    }

    function printMatrix(matrix) {
        var table = document.createElement("table");
        for (var i = 0; i < matrix.length; i++) {
            var tableRow = document.createElement("tr");
            var row = matrix[i];
            for (var j = 0; j < row.length; j++) {
                var rowCell = document.createElement("td");
                rowCell.innerHTML = row[j];
                tableRow.appendChild(rowCell);
            }
            table.appendChild(tableRow);
        }
        return table;
    }

    test1();
    test2();
}