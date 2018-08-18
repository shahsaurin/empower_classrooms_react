import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import SchoolList from "../school/SchoolList";
import NewSchool from "../school/NewSchool";
import SchoolEditor from "./SchoolEditor";

export default class SchoolManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            adminId: ''
        };

        this.selectAdmin = this.selectAdmin.bind(this);
    }

    selectAdmin(adminId) {
        this.setState({adminId: adminId});
    }

    componentDidMount() {
        this.selectAdmin(this.props.match.params.adminId);
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <Link to={`/admin/${this.state.adminId}/school-manager/new-school`}
                                  activeClassName="nav-link active" id="home-tab" data-toggle="tab" role="tab"
                                  aria-controls="home" aria-selected="true">
                                New School
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/admin/${this.state.adminId}/school-manager/schools`}
                                  activeClassName="nav-link active" id="home-tab" data-toggle="tab" role="tab"
                                  aria-controls="home" aria-selected="true">
                                Schools
                            </Link>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">

                        <Route path="/admin/:adminId/school-manager/new-school"
                               component={NewSchool}/>

                        <Route path="/admin/:adminId/school-manager/school/:schoolId/edit"
                               component={SchoolEditor}/>

                        <Route path="/admin/:adminId/school-manager/schools"
                               component={SchoolList}/>

                    </div>
                </div>
            </Router>
        );
    }
}