import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import UserService from "../services/UserService";
import NewProject from "../project/NewProject";
import ProjectList_teacher from "../project/ProjectList_teacher";
import ProjectList_volunteer from "../project/ProjectList_volunteer";
import MessageList from "../message/MessageList";
import MessageCreator from "../message/MessageCreator";

export default class VolunteerDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            volunteerId: ''
        };

        this.selectVolunteer = this.selectVolunteer.bind(this);
    }

    selectVolunteer(volunteerId) {
        this.setState({volunteerId: volunteerId});
    }

    componentDidMount() {
        this.selectVolunteer(this.props.match.params.volunteerId);
    }



    render() {
        return (
            <Router>
                <div className="container">
                    <h2>Volunteer Account Home - Id: {this.state.volunteerId}</h2>

                    <div className="row">
                        <div className="col-4">
                            <ul>
                                <h3> Projects </h3>
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

                        <div className="col-8">

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