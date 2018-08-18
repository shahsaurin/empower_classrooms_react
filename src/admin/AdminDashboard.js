import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import ProjectList_volunteer from "../project/ProjectList_volunteer";
import ProjectList_donor from "../project/ProjectList_donor";
import MessageList from "../message/MessageList";
import MessageCreator from "../message/MessageCreator";
import Profile from "../container/Profile";
import SchoolManager from "./SchoolManager";
import {mySessionStorage} from "../storage/storage";
import ProjectManager from "./ProjectManager";
import MessageManager from "./MessageManager";

export default class AdminDashboard extends Component {

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
                    <h2>Admin Account Home - Id: {this.state.adminId}</h2>

                    <div className="row">
                        <div className="col-4">
                            <ul>
                                <li className="list-group-item">
                                    <Link to={`/admin/${this.state.adminId}/school-manager`}>
                                        Schools
                                    </Link>
                                </li>
                            </ul>

                            <ul>
                                <li className="list-group-item">
                                    <Link to={`/admin/${this.state.adminId}/project-manager`}>
                                        Projects
                                    </Link>
                                </li>
                            </ul>

                            <ul>
                                <li className="list-group-item">
                                    <Link to={`/admin/${this.state.adminId}/message-manager`}>
                                        Messages
                                    </Link>
                                </li>
                            </ul>

                        </div>

                        <div className="col-8">

                            <Route path="/admin/:adminId/school-manager"
                                   component={SchoolManager}/>

                            <Route path="/admin/:adminId/project-manager"
                                   component={ProjectManager}/>

                            <Route path="/admin/:adminId/message-manager"
                                   component={MessageManager}/>
                        </div>

                    </div>
                </div>
            </Router>
        );
    }
}