import React, {Component} from 'react'
import ProjectService from "../services/ProjectService";
import ProjectListItem from "./ProjectListItem"
import DonorService from "../services/DonorService";


export default class ProjectList_admin extends Component {

    constructor(props) {
        super(props);
        this.projectService = ProjectService.instance;

        this.state = {
            adminId: '',
            projects: []
        };

        this.deleteProject = this.deleteProject.bind(this);
    }


    selectAdmin(adminId) {
        this.setState({adminId: adminId});
    }

    componentDidMount() {
        let adminId = this.props.match.params.adminId;
        this.selectAdmin(adminId);
        this.findAllProjects();
    }

    setProjects(projects) {
        this.setState({projects: projects});
    }

    findAllProjects() {
        this.projectService
            .findAllProjects()
            .then((projects) => {
                this.setProjects(projects);
            });
    }

    deleteProject(projectId) {
        this.projectService
            .deleteProject(projectId)
            .then(() => {
                this.findAllProjects();
            })
    }

    renderListOfProjects() {
        let projectsDom = this.state.projects.map((project) => {
            return (
                <ProjectListItem
                    // volunteerId = {this.state.volunteerId}
                    // donorId={this.state.donorId}
                    admin={this.state.adminId}
                    project={project}
                    key={project.id}
                    // approveProject={this.approveProjectByVolunteer}
                    // donateToProject={this.donateToProject}
                    // displayApproveButton={false}
                    delete={this.deleteProject}
                    deleteButton={true}

                    updateButton={true}
                    // displayDonateButton={true}
                />
            )
        });
        return projectsDom;
    }


    render() {
        return (
            <div className="container">
                <div>
                    <h3>All Projects</h3>
                    {/*<h3>Total projects = {this.state.projects.length}</h3>*/}

                    <ul className="list-group">
                        {this.renderListOfProjects()}
                    </ul>
                </div>
            </div>
        );
    }
}