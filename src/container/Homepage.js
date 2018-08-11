import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ProjectService from "../services/ProjectService"

export default class Homepage extends Component {

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
                console.log(projects);
                this.setState({projects: projects});
            });
    }



    render() {
        return(
            <Router>
                <div className="container-fluid">
                    <h1>Search projects from DonorsChoose.org</h1>

                    <table className="table">
                        <thead>
                            <tr><th>Search Projects By keywords:</th></tr>
                            <tr>
                                <th><input onChange={this.searchQueryChanged}
                                           className="form-control"
                                           id="searchFld"
                                           placeholder="Description, synopsis, city, etc,"/></th>

                                <th><button onClick={this.getDonorschooseProjects}
                                            className="btn btn-primary">Search</button></th>
                            </tr>
                        </thead>

                        <tbody>


                        </tbody>

                    </table>
                </div>

            </Router>
        )
    }
}