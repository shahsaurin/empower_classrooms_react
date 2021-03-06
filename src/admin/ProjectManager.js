import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import NewProject from "../project/NewProject";
import ProjectList_admin from "../project/ProjectList_admin";
import ProjectEditor from "./ProjectEditor";

export default class ProjectManager extends Component {

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
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <Link to={`/admin/${this.state.adminId}/project-manager/new-project`}
                                  className="nav-link active" id="home-tab" data-toggle="tab" role="tab"
                                  aria-controls="home" aria-selected="true">
                                New Project
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/admin/${this.state.adminId}/project-manager/projects`}
                                  className="nav-link active" id="home-tab" data-toggle="tab" role="tab"
                                  aria-controls="home" aria-selected="true">
                                Projects
                            </Link>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">

                        <Route path="/admin/:adminId/project-manager/new-project"
                               component={NewProject}/>

                        <Route path="/admin/:adminId/project-manager/project/:projectId/edit"
                               component={ProjectEditor}/>

                        <Route path="/admin/:adminId/project-manager/projects"
                               component={ProjectList_admin}/>

                    </div>
                </div>
            </Router>
        );
    }
}