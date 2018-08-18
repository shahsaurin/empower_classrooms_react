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
        // console.log(event.target.value);
        this.setState({
            searchQuery: event.target.value
        })
    }

    getDonorschooseProjects() {
        this.projectService
            .getDonorschooseProjects(this.state.searchQuery)
            .then((projects) => {
                console.log(projects.proposals);
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

                <div className="container-fluid">

                    <div className="row">
                        <div className="col-8">
                            <h3>ProjectsList</h3>
                            <h3>Search projects from DonorsChoose.org</h3>
                        </div>
                        <div className="col-4">
                            <Link to={`/login`}>
                                <button className="btn btn-primary">Login</button>
                            </Link>

                            <Link to={`/register`}>
                                <button className="btn btn-warning">Register</button>
                            </Link>

                            <Link to={`/new-school`}>
                                <button className="btn btn-danger">Add New School</button>
                            </Link>

                        </div>
                    </div>
                    {/*<h1>Search projects from DonorsChoose.org</h1>*/}

                    <table className="table">
                        <thead>
                            <tr><th>Search Projects By keywords:</th></tr>
                            <tr>
                                <th><input onChange={this.searchQueryChanged}
                                           className="form-control"
                                           id="searchFld"
                                           placeholder="Description, synopsis, city, etc,"/></th>

                                <th><button onClick={this.getDonorschooseProjects}
                                            className="btn btn-success">Search</button></th>
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