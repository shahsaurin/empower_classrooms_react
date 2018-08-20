import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import ProjectList_volunteer from "../project/ProjectList_volunteer";
import MessageList from "../message/MessageList";
import MessageCreator from "../message/MessageCreator";
import Profile from "../container/Profile";
import {mySessionStorage} from "../storage/storage";

export default class VolunteerDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            volunteerId: '',
            isLoggedIn: ''
        };

        this.selectVolunteer = this.selectVolunteer.bind(this);
        this.logout = this.logout.bind(this);
    }

    logout() {
        window.location.pathname = '/';
    }

    selectVolunteer(volunteerId) {
        this.setState({volunteerId: volunteerId});
    }

    componentDidMount() {
        this.selectVolunteer(this.props.match.params.volunteerId);
        if(mySessionStorage.getItem('isLoggedIn') === 'true') {
            this.setState({isLoggedIn: true});
        } else {
            this.setState({isLoggedIn: false});
        }
    }



    render() {
        return (
            <Router>
                <div className="container">

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

                    <h2>Volunteer Home - Id: {this.state.volunteerId}</h2>

                    <div className="row">
                        <div className="col-sm-4">
                            <ul>
                                <li className="list-group-item">
                                    <Link to={`/volunteer/${this.state.volunteerId}/profile`}>
                                        My Profile
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link to={`/volunteer/${this.state.volunteerId}/projects/pending`}>
                                        Pending Projects
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link to={`/volunteer/${this.state.volunteerId}/projects/approved`}>
                                        Approved Projects
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link to={`/volunteer/${this.state.volunteerId}/inbox`}>
                                        Received Messages
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link to={`/volunteer/${this.state.volunteerId}/sentbox`}>
                                        Sent Messages
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link to={`/volunteer/${this.state.volunteerId}/messageTeacher`}>
                                        Contact a Teacher
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link to={`/volunteer/${this.state.volunteerId}/messageDonor`}>
                                        Contact a Donor
                                    </Link>
                                </li>

                            </ul>

                        </div>

                        <div className="col-sm-8">

                            <Route path="/volunteer/:volunteerId/profile"
                                   component={Profile}/>

                            <Route path="/volunteer/:volunteerId/projects/approved"
                                   component={ProjectList_volunteer}/>

                            <Route path="/volunteer/:volunteerId/projects/pending"
                                   component={ProjectList_volunteer}/>

                            <Route path="/volunteer/:volunteerId/inbox"
                                   component={MessageList}/>

                            <Route path="/volunteer/:volunteerId/sentbox"
                                   component={MessageList}/>

                            <Route path="/volunteer/:volunteerId/messageTeacher"
                                   component={MessageCreator}/>

                            <Route path="/volunteer/:volunteerId/messageDonor"
                                   component={MessageCreator}/>

                        </div>

                    </div>
                </div>
            </Router>
        );
    }
}