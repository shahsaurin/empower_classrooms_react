import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import NewProject from "../project/NewProject";
import ProjectList_teacher from "../project/ProjectList_teacher";
import MessageList from "../message/MessageList";
import MessageCreator from "../message/MessageCreator";
import Profile from "../container/Profile";
import {mySessionStorage} from "../storage/storage";

export default class TeacherDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teacherId: '',
            isLoggedIn: ''
        };

        this.selectTeacher = this.selectTeacher.bind(this);
        this.logout = this.logout.bind(this);
    }

    logout() {
        window.location.pathname = '/';
    }

    selectTeacher(teacherId) {
        this.setState({teacherId: teacherId});
    }

    componentDidMount() {
        this.selectTeacher(this.props.match.params.teacherId);
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

                    <h2>Teacher Home: {this.state.teacherId}</h2>
                    {/*<h3>Total Projects initiated: {}*/}
                    <div className="row">
                        <div className="col-md-3 col-sm-4">
                            <ul className="list-group">
                                <Link to={`/teacher/${this.state.teacherId}/profile`}>
                                    <li className="list-group-item text-center">
                                        My Profile
                                    </li>
                                </Link>

                                <Link to={`/teacher/${this.state.teacherId}/projects`}>
                                    <li className="list-group-item text-center">
                                        View created projects
                                    </li>
                                </Link>

                                <Link to={`/teacher/${this.state.teacherId}/project/new`}>
                                    <li className="list-group-item text-center">
                                        Start New Project
                                    </li>
                                </Link>

                                <Link to={`/teacher/${this.state.teacherId}/inbox`}>
                                    <li className="list-group-item text-center">
                                        Received Messages
                                    </li>
                                </Link>

                                <Link to={`/teacher/${this.state.teacherId}/sentbox`}>
                                    <li className="list-group-item text-center">
                                        Sent Messages
                                    </li>
                                </Link>

                                <Link to={`/teacher/${this.state.teacherId}/messageVolunteer`}>
                                    <li className="list-group-item text-center">
                                        Contact a Volunteer
                                    </li>
                                </Link>
                            </ul>
                        </div>


                        <div className="col-md-9 col-sm-8">
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