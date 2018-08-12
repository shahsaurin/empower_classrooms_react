import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import UserService from "../services/UserService";
import NewProject from "../project/NewProject";

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



                    <div className="row">
                        <div className="col-4">
                            <ul>
                                <li className="list-group-item">
                                    <Link to={`/teacher/${this.state.teacherId}/projects`}>
                                        View created projects
                                    </Link>

                                    {/*<span className="float-right">*/}
                                        {/*<i className="fa fa-trash" onClick={() =>*/}
                                            {/*{this.props.delete*/}
                        {/*(this.props.module.id)}}></i>*/}
                                        {/*<i className="fa fa-pencil"></i>*/}
                    {/*</span>*/}
                                </li>

                                <li className="list-group-item">
                                    <Link to={`/teacher/${this.state.teacherId}/project/new`}>
                                        Start New Project
                                    </Link>


                                    {/*<span className="float-right">*/}
                                    {/*<i className="fa fa-trash" onClick={() =>*/}
                                    {/*{this.props.delete*/}
                                    {/*(this.props.module.id)}}></i>*/}
                                    {/*<i className="fa fa-pencil"></i>*/}
                                    {/*</span>*/}
                                </li>


                            </ul>

                        </div>

                        <div className="col-8">


                            {/*<Route path="/new-school"*/}
                                   {/*component={}/>*/}

                            <Route path="/teacher/:teacherId/project/new"
                                   component={NewProject}/>


                        </div>

                    </div>
                </div>
            </Router>
        );
    }
}