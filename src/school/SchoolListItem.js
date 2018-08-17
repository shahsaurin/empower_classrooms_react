import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import ProjectService from "../services/ProjectService";

export default class SchoolListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        return (
            <li className="list-group-item">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-9">
                            <ul>
                                <li>Id: {this.props.school.id}</li>
                                <li>Name: {this.props.school.name}</li>
                                <li>City: {this.props.school.city}</li>
                                <li>Zip: {this.props.school.zip}</li>
                            </ul>
                        </div>

                        <div className="col-3">
                            <div>
                                <span className="float-right">
                                    <i className="fa fa-trash m-2"
                                       onClick={() => {this.props.delete(this.props.school.id)}}></i>
                                    {/*<i className="fa fa-pencil"></i>*/}
                                </span>

                                <Link to={`/admin/${this.props.admin.id}/school-control/school/${this.props.school.id}/edit`}>
                                    <span className="float-right">
                                        <i className="fa fa-pencil-square-o m-2" aria-hidden="true"
                                           ></i>
                                        {/*<i className="fa fa-pencil"></i>*/}
                                    </span>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </li>
        );
    }

}