import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import SchoolManager from "./SchoolManager";
import {mySessionStorage} from "../storage/storage";
import ProjectManager from "./ProjectManager";
import MessageManager from "./MessageManager";
import UserManager from "./UserManager";

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
                    <p>The force is with you!!</p>

                    <div className="row">
                        <div className="col-4">
                            <ul>
                                <p>Domain Objects</p>
                                <li className="list-group-item">
                                    <Link to={`/admin/${this.state.adminId}/school-manager`}>
                                        Schools
                                    </Link>
                                </li>
                                <li className="list-group-item">
                                    <Link to={`/admin/${this.state.adminId}/project-manager`}>
                                        Projects
                                    </Link>
                                </li>
                                <li className="list-group-item">
                                    <Link to={`/admin/${this.state.adminId}/message-manager`}>
                                        Messages
                                    </Link>
                                </li>
                            </ul>

                            <ul>
                                <p>Users</p>
                                <li className="list-group-item">
                                    <Link to={`/admin/${this.state.adminId}/teacher-manager`}>
                                        Teachers
                                    </Link>
                                </li>
                                <li className="list-group-item">
                                    <Link to={`/admin/${this.state.adminId}/volunteer-manager`}>
                                        Volunteers
                                    </Link>
                                </li>
                                <li className="list-group-item">
                                    <Link to={`/admin/${this.state.adminId}/donor-manager`}>
                                        Donors
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


                            <Route path="/admin/:adminId/teacher-manager"
                                   component={UserManager}/>

                            <Route path="/admin/:adminId/volunteer-manager"
                                   component={UserManager}/>

                            <Route path="/admin/:adminId/donor-manager"
                                   component={UserManager}/>
                        </div>

                    </div>
                </div>
            </Router>
        );
    }
}