//stateless
function getAlgorithmInstance() {
    //private area
    function splitBalances(balance) {
        var positiveBalances = [];
        var negativeBalances = [];
        for (var i = 0; i < balance.length; i++) {
            if (balance[i] > 0) {
                positiveBalances.push({balance: balance[i], index: i});
            }

            else if (balance[i] < 0) negativeBalances.push({balance: balance[i], index: i});
        }
        return [positiveBalances, negativeBalances];
    }

    function normalizeMatrix(balances, preferences, length) {
        var normalizedMatrix = [];
        (function () {
            for (var i = 0; i < length - 1; i++) {
                var row = [];
                for (var j = 0; j <= i; j++) row[j] = 0;
                normalizedMatrix[i] = row;
            }
        })();

        var positive = balances[0];
        var negative = balances[1];
        var negativeIndex = 0;
        (function () {
            for (var i = 0; i < positive.length; i++) {
                var current = positive[i];

                var coverage = current.balance;
                var j = negativeIndex;
                current.debptors = [];
                //switch to != after first debug
                while (coverage > 0) {
                    //get the whole debt
                    if (coverage >= -negative[j].balance) {
                        current.debptors.push(negative[j]);
                        coverage += negative[j].balance;
                        j++;
                    }
                    //split debts and get required part
                    else {
                        current.debptors.push({index: negative[j].index, balance: -coverage});
                        negative[j].balance += coverage;
                        negativeIndex = j;
                        coverage = 0;
                    }
                }
            }
        })();


        for (var i = 0; i < positive.length; i++) {
            var creditor = positive[i];
            for (var j = 0; j < creditor.debptors.length; j++) {
                var debtor = creditor.debptors[j];
                if (debtor.index > creditor.index) {
                    //normalizedMatrix[debtor.index] = [];
                    normalizedMatrix[debtor.index - 1][creditor.index] = debtor.balance;
                }
                else {
                    //normalizedMatrix[creditor.index] = [];
                    normalizedMatrix[creditor.index - 1][debtor.index] = -debtor.balance;
                }
            }
        }
        return normalizedMatrix;
    }

    //public API
    return {
        calculateBalanceVector: function (inputMatrix) {
            var balance = [];

            for (var i = 0; i <= inputMatrix.length; i++) {
                balance[i] = 0;
                if (i != 0) {
                    var row = inputMatrix[i - 1];
                    for (var j = 0; j < row.length; j++) {
                        balance[i] += row[j];
                    }
                }

                for (var k = i; k < inputMatrix.length; k++) {
                    balance[i] -= inputMatrix[k][i];
                }
            }
            return balance;
        },

        //main method for calculation, preferences - optional parameter for netting sides selection
        calculateOptimizedMatrix: function (inputMatrix, preferences) {
            var balance = this.calculateBalanceVector(inputMatrix);
            return normalizeMatrix(splitBalances(balance), preferences, balance.length);
        }
    }
}

export default getAlgorithmInstance;