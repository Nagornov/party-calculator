import React from 'react';
import HelloWorld from './hello-world';
import RaisedButton from 'material-ui/lib/raised-button';
import MatrixTable from './matrix-table';
import getAlgorithmInstance from "../algorithm/math.jsx";


React.render(
    <HelloWorld phrase="ES6"/>,
    document.body
);

/*React.render(
 <RaisedButton label="test" primary="true"/>, document.body
 );*/
var test1Data = [[-25],
    [-1, -20],
    [4, 25, -2],
    [25, -450, 25, 30],
    [-15, 150, -30, 20, -928],
    [3, -40, 3, 3, 5, 25],
    [1, -22, -2, -2, 4, -15, 5],
    [10, 332, -15, -25, 498, -800, -10, 20],
    [1, -25, -2, 1, -20, 15, -1, -3, 30]];

var result = getAlgorithmInstance().calculateOptimizedMatrix(test1Data);

var View = React.createClass({
    render: function () {
        return <div>
            <h2>Before</h2>
            <MatrixTable data={test1Data}/>
            <h2>After</h2>
            <MatrixTable data={result}/>
        </div>
    }
});

React.render(<View/>, document.body);