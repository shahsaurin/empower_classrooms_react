import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import NewProject from "../project/NewProject";
import ProjectList_teacher from "../project/ProjectList_teacher";
import MessageList from "../message/MessageList";
import MessageCreator from "../message/MessageCreator";
import Profile from "../container/Profile";

export default class TeacherDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teacherId: ''
        };

        this.selectTeacher = this.selectTeacher.bind(this);
    }

    selectTeacher(teacherId) {
        this.setState({teacherId: teacherId});
    }

    componentDidMount() {
        this.selectTeacher(this.props.match.params.teacherId);
    }



    render() {
        return (
            <Router>
                <div className="container">
                    <h2>Teacher Account Home - Id: {this.state.teacherId}</h2>
                    {/*<h3>Total Projects initiated: {}*/}

                    <div className="row">
                        <div className="col-4">
                            <ul>
                                <li className="list-group-item">
                                    <Link to={`/teacher/${this.state.teacherId}/profile`}>
                                        My Profile
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link to={`/teacher/${this.state.teacherId}/projects`}>
                                        View created projects
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link to={`/teacher/${this.state.teacherId}/project/new`}>
                                        Start New Project
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link to={`/teacher/${this.state.teacherId}/inbox`}>
                                        Received Messages
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link to={`/teacher/${this.state.teacherId}/sentbox`}>
                                        Sent Messages
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link to={`/teacher/${this.state.teacherId}/messageVolunteer`}>
                                        Contact a Volunteer
                                    </Link>
                                </li>
                            </ul>

                        </div>

                        <div className="col-8">

                            <Route path="/teacher/:teacherId/profile"
                                   component={Profile}/>

                            <Route path="/teacher/:teacherId/projects"
                                   component={ProjectList_teacher}/>

                            <Route path="/teacher/:teacherId/project/new"
                                   component={NewProject}/>

                            <Route path="/teacher/:teacherId/inbox"
                                   component={MessageList}/>

                            <Route path="/teacher/:teacherId/sentbox"
                                   component={MessageList}/>

                            <Route path="/teacher/:teacherId/messageVolunteer"
                                   component={MessageCreator}/>

                        </div>

                    </div>
                </div>
            </Router>
        );
    }
}