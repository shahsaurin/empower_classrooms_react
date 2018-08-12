import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import UserService from "../services/UserService";
import NewProject from "../project/NewProject";
import ProjectList from "../project/ProjectList";

export default class VolunteerDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            volunteerId: ''
        };

        this.selectVolunteer = this.selectVolunteer.bind(this);
    }

    selectVolunteer(volunteerId) {
        this.setState({teacherId: volunteerId});
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
                                <li className="list-group-item">
                                    <Link to={`/teacher/${this.state.teacherId}/projects`}>
                                        View created projects
                                    </Link>
                                </li>

                                {/*<li className="list-group-item">*/}
                                    {/*<Link to={`/teacher/${this.state.teacherId}/project/new`}>*/}
                                        {/*Start New Project*/}
                                    {/*</Link>*/}
                                {/*</li>*/}
                            </ul>

                        </div>

                        <div className="col-8">

                            <Route path="/teacher/:teacherId/projects"
                                   component={ProjectList}/>

                            {/*<Route path="/teacher/:teacherId/project/new"*/}
                                   {/*component={NewProject}/>*/}
                        </div>

                    </div>
                </div>
            </Router>
        );
    }
}