var Calculator = (function Calculator() {

        var persons = {};
        var products = {};
        var paymentItems = {};
        var costItems = {};
        var consumptionItems = {};

        function Product(productNameValue) {
            return {
                getProductName: function () {
                    return productNameValue;
                }
            }
        }

        //a set of such items is a result of algorithm
        function PaymentItem(from, to, amount) {
            return {
                getFrom: function () {
                    return from;
                },
                getTo: function () {
                    return to;
                },
                getAmount: function () {
                    return amount;
                }
            }
        }

        function Person(name) {
            var id = guid();
            return {
                getName: function () {
                    return name
                },
                getId: function () {
                    return id
                }
            }
        }

        function CostItem(person, product, amount) {
            return {
                getPerson: function () {
                    return person;
                },
                getProduct: function () {
                    return product;
                },
                getAmount: function () {
                    return amount;
                }
            }
        }

        function getProductCost(product) {
            var totalCost = 0;
            costItems.forEach(function (costItem) {
                if (costItem.getProduct() == product) {
                    totalCost += costItem.getAmount();
                }
            });
            return totalCost;
        }

        function getNumberOfConsumedItemsPerProduct(product) {
            var i = 0;
            consumptionItems.forEach(function (item) {
                if (item.getProduct() == product) i++;
            });
            return i;
        }


        function recalculateConsumedProductAmounts(product) {
            var productCost = getProductCost(product);
            var sumPredefined = 0;
            var numberOfItems = getNumberOfConsumedItemsPerProduct(product);

            var numberOfPredefined = 0;
            consumptionItems.forEach(function (consumptionItem) {
                if (consumptionItem.getProduct() == product && !consumptionItem.isCalculable()) {
                    sumPredefined += consumptionItem.getAmount();
                    numberOfPredefined++;
                }
            });

            if (numberOfItems > numberOfPredefined) {
                var singleItemCostCalculated = (productCost - sumPredefined) / (numberOfItems - numberOfPredefined);
                consumptionItems.forEach(function (item) {
                    if (item.isCalculable()) {
                        item.setAmount(singleItemCostCalculated);
                    }
                });
            }
        }

        function ConsumptionItem(person, product, amountValue) {
            var amount = amountValue;
            var calculable = amountValue ? false : true;
            return {
                setCalculable: function (calcValue) {
                    calculable = calcValue
                },
                setAmount: function (amountValue) {
                    amount = amountValue
                },

                getPerson: function () {
                    return person;
                },
                getProduct: function () {
                    return product;
                },
                getAmount: function () {
                    return (amount);
                },
                isCalculable: function () {
                    return calculable;
                }
            }
        }

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }

            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        function initItem(productName, personName) {
            if (!(productName in products)) products[productName] = Product(productName);
            if (!(personName in persons)) persons[personName] = Person(personName);
        }


        return {
            calculatePayments: function () {
                consumptionItems.for



                /*
                 algorithm here
                 */
                return paymentItems;
            },
            addConsumtionItem: function (productName, personName, amountSpent) {
                initItem(productName, personName);
                consumptionItems.push(ConsumptionItem(person[personName], products[productName], amountSpent));
                recalculateConsumedProductAmounts(products[productName]);
            },

            addCostItem: function (productName, personName, amountSpent) {
                initItem(productName, personName);
                costItems.push(CostItem([personName], products[productName], amountSpent));
                recalculateConsumedProductAmounts(products[productName]);
            }

        }
    }()
);

