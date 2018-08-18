import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Register from "../container/Register";
import UsersList from "./UsersList";
import UserEditor from "./UserEditor";

export default class UserManager extends Component {

    constructor(props) {
        super(props);
        // This component can be used for any User: Teacher, Volunteer or Donor.
        this.state = {
            adminId: '',
            userType: ''
            // userId: ''
        };

        // this.selectUser = this.selectUser.bind(this);
    }

    // selectUser(userId) {
    //     this.setState({userId: userId});
    // }

    selectAdmin(adminId) {
        this.setState({adminId: adminId});
    }

    componentDidMount() {
        // let userId = this.props.match.params.teacherId ||
        //     this.props.match.params.volunteerId ||
        //     this.props.match.params.donorId;
        // this.selectUser(userId);
        this.selectAdmin(this.props.match.params.adminId);
        let currentUrl = window.location.href;
        if(currentUrl.includes('teacher-manager')) {
            this.setState({userType: 'teacher'});
        } else if(currentUrl.includes('volunteer-manager')) {
            this.setState({userType: 'volunteer'});
        } else {
            this.setState({userType: 'donor'});
        }
    }

    render() {
        return (
            <Router>
                <div className="container">
                    {/*<h2>{this.state.userType}</h2>*/}
                    <ul className={(this.state.userType==='teacher') ? "nav nav-tabs" : 'hidden'} id="myTab" role="tablist">
                        <li className="nav-item">
                            <Link to={`/admin/${this.state.adminId}/teacher-manager/new-teacher`}>
                                <a className="nav-link active" id="home-tab" data-toggle="tab" role="tab"
                                   aria-controls="home" aria-selected="true">New Teacher</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/admin/${this.state.adminId}/teacher-manager/teachers`}>
                                <a className="nav-link active" id="home-tab" data-toggle="tab" role="tab"
                                   aria-controls="home" aria-selected="true">Teachers</a>
                            </Link>
                        </li>
                    </ul>

                    <ul className={(this.state.userType==='volunteer') ? "nav nav-tabs" : 'hidden'} id="myTab" role="tablist">
                        <li className="nav-item">
                            <Link to={`/admin/${this.state.adminId}/volunteer-manager/new-volunteer`}>
                                <a className="nav-link active" id="home-tab" data-toggle="tab" role="tab"
                                   aria-controls="home" aria-selected="true">New Volunteer</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/admin/${this.state.adminId}/volunteer-manager/volunteers`}>
                                <a className="nav-link active" id="home-tab" data-toggle="tab" role="tab"
                                   aria-controls="home" aria-selected="true">Volunteers</a>
                            </Link>
                        </li>
                    </ul>

                    <ul className={(this.state.userType==='donor') ? "nav nav-tabs" : 'hidden'} id="myTab" role="tablist">
                        <li className="nav-item">
                            <Link to={`/admin/${this.state.adminId}/donor-manager/new-donor`}>
                                <a className="nav-link active" id="home-tab" data-toggle="tab" role="tab"
                                   aria-controls="home" aria-selected="true">New Donor</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/admin/${this.state.adminId}/donor-manager/donors`}>
                                <a className="nav-link active" id="home-tab" data-toggle="tab" role="tab"
                                   aria-controls="home" aria-selected="true">Donors</a>
                            </Link>
                        </li>
                    </ul>


                    <div className="tab-content" id="myTabContent">

                        {/*FOR TEACHERS*/}
                        <Route path="/admin/:adminId/teacher-manager/new-teacher"
                               component={Register}/>

                        <Route path="/admin/:adminId/teacher-manager/teachers"
                               component={UsersList}/>

                        <Route path="/admin/:adminId/teacher-manager/teacher/:teacherId/edit"
                               component={UserEditor}/>


                        {/*FOR VOLUNTEERS*/}
                        <Route path="/admin/:adminId/volunteer-manager/new-volunteer"
                               component={Register}/>

                        <Route path="/admin/:adminId/volunteer-manager/volunteers"
                               component={UsersList}/>

                        <Route path="/admin/:adminId/volunteer-manager/volunteer/:volunteerId/edit"
                               component={UserEditor}/>


                        {/*FOR DONORS*/}
                        <Route path="/admin/:adminId/donor-manager/new-donor"
                               component={Register}/>

                        <Route path="/admin/:adminId/donor-manager/donors"
                               component={UsersList}/>

                        <Route path="/admin/:adminId/donor-manager/donor/:donorId/edit"
                               component={UserEditor}/>

                    </div>
                </div>
            </Router>
        );
    }
}