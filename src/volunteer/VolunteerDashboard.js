import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import UserService from "../services/UserService";
import NewProject from "../project/NewProject";
import ProjectList_teacher from "../project/ProjectList_teacher";
import ProjectList_volunteer from "../project/ProjectList_volunteer";

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
                                        Pending approval
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link to={`/volunteer/${this.state.volunteerId}/projects/approved`}>
                                        Approved
                                    </Link>
                                </li>
                            </ul>

                        </div>

                        <div className="col-8">

                            <Route path="/volunteer/:volunteerId/projects/approved"
                                   component={ProjectList_volunteer}/>

                            <Route path="/volunteer/:volunteerId/projects/pending"
                                   component={ProjectList_volunteer}/>
                        </div>

                    </div>
                </div>
            </Router>
        );
    }
}