import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ProjectService from "../services/ProjectService"
import ProjectCard from "../components/ProjectCard"

export default class ProjectsList_API extends Component {

    constructor() {
        super();
        this.projectService = ProjectService.instance;
        this.state = {
            searchQuery: '',
            projects: []
        };

        this.searchQueryChanged = this.searchQueryChanged.bind(this);
        this.getDonorschooseProjects = this.getDonorschooseProjects.bind(this);
    }

    searchQueryChanged(event) {
        this.setState({
            searchQuery: event.target.value
        })
    }

    getDonorschooseProjects() {
        this.projectService
            .getDonorschooseProjects(this.state.searchQuery)
            .then((projects) => {
                this.setState({projects: projects.proposals});
            });
    }


    renderProjectRows() {
        let projects = this.state.projects.map(
            (project) => {
                // return <ProjectRow project={project}
                //                    key={project.id}/>
                return <ProjectCard project={project}
                                   key={project.id}/>
            }
        );
        return(projects);
    }


    render() {
        return(

                <div className="container">

                    <div className="row">
                        {/*<div className="col-6">*/}
                            {/*/!*<p>Search projects from DonorsChoose.org</p>*!/*/}
                        {/*</div>*/}

                        <div className="col-12 pull-right">
                            {/*<div className="col-4 pull-right">*/}
                                <Link to={`/new-school`}>
                                    <button className="btn btn-outline-danger pull-right m-2">+ School</button>
                                    {/*+School*/}
                                </Link>
                            {/*</div>*/}

                            {/*<div className="col-4 pull-right">*/}
                                <Link to={`/register`}>
                                    <button className="btn btn-outline-primary pull-right m-2">Register</button>
                                    {/*Register*/}
                                </Link>
                            {/*</div>*/}

                            {/*<div className="col-4 pull-right">*/}
                                <Link to={`/login`}>
                                    <button className="btn btn-outline-success pull-right m-2">Login</button>
                                    {/*Login*/}
                                </Link>
                            {/*</div>*/}
                        </div>

                    </div>
                    {/*<h1>Search projects from DonorsChoose.org</h1>*/}

                    <table className="table">
                        <thead>
                            <tr><th>Search projects from DonorsChoose.org</th></tr>
                            <tr>
                                <th><input onChange={this.searchQueryChanged}
                                           className="form-control"
                                           id="searchFld"
                                           placeholder="Enter Keywords: Description, synopsis, city, etc,"/></th>

                                {/*<th><button onClick={this.getDonorschooseProjects}*/}
                                            {/*className="btn btn-success">Search</button></th>*/}

                                <th><i onClick={this.getDonorschooseProjects}
                                       className="fa fa-search fa-2x" aria-hidden="true"></i></th>
                            </tr>
                        </thead>

                        <tbody>
                            {/*<div className="row">*/}

                                {this.renderProjectRows()}
                        </tbody>

                    </table>
                </div>


        )
    }
}