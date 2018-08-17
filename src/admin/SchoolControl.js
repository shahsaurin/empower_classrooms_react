import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import ProjectList_volunteer from "../project/ProjectList_volunteer";
import ProjectList_donor from "../project/ProjectList_donor";
import MessageList from "../message/MessageList";
import MessageCreator from "../message/MessageCreator";
import Profile from "../container/Profile";
import SchoolList from "../school/SchoolList";
import NewSchool from "../school/NewSchool";
import {mySessionStorage} from "../storage/storage";
import SchoolEditor from "./SchoolEditor";

export default class SchoolControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            adminId: ''
        };

        // this.selectAdmin = this.selectAdmin.bind(this);
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
                            <Link to={`/admin/${this.state.adminId}/school-control/new-school`}>
                                <a className="nav-link active" id="home-tab" data-toggle="tab" role="tab"
                                   aria-controls="home" aria-selected="true">New School</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/admin/${this.state.adminId}/school-control/school`}>
                                <a className="nav-link active" id="home-tab" data-toggle="tab" role="tab"
                                   aria-controls="home" aria-selected="true">Schools</a>
                            </Link>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">

                        <Route path="/admin/:adminId/school-control/new-school"
                               component={NewSchool}/>

                        <Route path="/admin/:adminId/school-control/school/:schoolId/edit"
                               component={SchoolEditor}/>

                        <Route path="/admin/:adminId/school-control/school"
                               component={SchoolList}/>

                    </div>
                </div>
            </Router>
        );
    }
}