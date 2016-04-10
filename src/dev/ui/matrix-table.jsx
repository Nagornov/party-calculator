import React from 'react';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

//this.state -- mutable
//this.props -- inserted from parent
//componentDidMount: -- call on component init
//this.setState -- update component model and rerender it
/*            <TableHeader>
 <TableRow>
 <TableHeaderColumn></TableHeaderColumn>
 {this.props.data.map((row, index) => (
 <TableHeaderColumn>{index+1}</TableHeaderColumn>
 ))}
 </TableRow>
 </TableHeader>*/
/*<TableRowColumn>{index+2}</TableRowColumn>*/
var MatrixTable = React.createClass({
    render: function () {
        return <Table>
            <TableBody>
                {this.props.data.map((row, index) => (
                    <TableRow key={index+2}>
                        {row.map((column, indexColumn) => (
                            < TableRowColumn > {row[indexColumn]}</TableRowColumn>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    }
});

export default MatrixTable;
