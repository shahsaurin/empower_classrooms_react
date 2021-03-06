import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import SchoolManager from "./SchoolManager";
import ProjectManager from "./ProjectManager";
import MessageManager from "./MessageManager";
import UserManager from "./UserManager";
import {mySessionStorage} from "../storage/storage";

export default class AdminDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            adminId: '',
            isLoggedIn: '',
            selected: ''
        };

        this.selectAdmin = this.selectAdmin.bind(this);
        this.logout = this.logout.bind(this);
    }


    logout() {
        window.location.pathname = '/';
    }

    selectAdmin(adminId) {
        this.setState({adminId: adminId});
    }

    componentDidMount() {
        this.selectAdmin(this.props.match.params.adminId);
        if(mySessionStorage.getItem('isLoggedIn') === 'true') {
            this.setState({isLoggedIn: true});
        } else {
            this.setState({isLoggedIn: false});
        }
    }



    render() {
        return (
            <Router>
                <div className="container m-2">

                    <div className="row">
                        <div className="col-8 p-3">
                            <h3>Empower Classrooms</h3>
                        </div>
                        <div className={this.state.isLoggedIn ? "hidden" : "col-4 pull-right p-2"}>
                            <Link to={`/search`}>
                                <i className="fa fa-home fa-2x pull-right m-2" aria-hidden="true"></i>
                            </Link>
                        </div>
                        <div className={this.state.isLoggedIn ? "col-4 pull-right p-2" : "hidden"}>
                            {/*<Link to={`/search`} className="pull-right">*/}
                            <button className="btn btn-outline-danger pull-right" onClick={this.logout}>Logout</button>
                            {/*</Link>*/}
                        </div>
                    </div>

                    {/*<h2>Admin Account Home - Id: {this.state.adminId}</h2>*/}
                    <h5>Admin Home</h5>
                    <h5>The force is with you!!</h5>

                    <div className="row mt-4">
                        <div className="col-md-3 col-sm-4">
                            <ul>
                                <h5 className="text-center">Domain Objects</h5>
                                <Link to={`/admin/${this.state.adminId}/school-manager`}>
                                    <li className={"list-group-item text-center"}>
                                            Schools
                                    </li>
                                </Link>
                                <Link to={`/admin/${this.state.adminId}/project-manager`}>
                                    <li className="list-group-item text-center">
                                            Project
                                    </li>
                                </Link>
                                <Link to={`/admin/${this.state.adminId}/message-manager`}>
                                    <li className="list-group-item text-center">
                                            Messages
                                    </li>
                                </Link>
                            </ul>

                            <ul>
                                <h5 className="text-center">Users</h5>
                                <Link to={`/admin/${this.state.adminId}/teacher-manager`}>
                                    <li className="list-group-item text-center">
                                            Teachers
                                    </li>
                                </Link>
                                <Link to={`/admin/${this.state.adminId}/volunteer-manager`}>
                                    <li className="list-group-item text-center">
                                        Volunteers
                                    </li>
                                </Link>
                                <Link to={`/admin/${this.state.adminId}/donor-manager`}>
                                    <li className="list-group-item text-center">
                                        Donors
                                    </li>
                                </Link>
                            </ul>

                        </div>

                        <div className="col-md-9 col-sm-8">

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