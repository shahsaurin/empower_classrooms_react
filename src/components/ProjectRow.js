import React from 'react';
import {Link} from 'react-router-dom';

export default class ProjectRow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>
                    <h3> {this.props.project.title} </h3>
                </td>
            </tr>
        )
    }
}

