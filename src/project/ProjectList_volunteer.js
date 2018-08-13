import React, {Component} from 'react'
import ProjectService from "../services/ProjectService";
import ProjectListItem from "./ProjectListItem"
import VolunteerService from "../services/VolunteerService";

export default class ProjectList_volunteer extends Component {

    constructor(props) {
        super(props);
        this.projectService = ProjectService.instance;
        this.volunteerService = VolunteerService.instance;

        this.state = {
            volunteerId: '',
            approvedProjects: [],
            pendingProjects: []
        };

        this.approveProjectByVolunteer = this.approveProjectByVolunteer.bind(this);
    }

    selectVolunteer(volunteerId) {
        this.setState({volunteerId: volunteerId});
    }

    componentDidMount() {
        let volunteerId = this.props.match.params.volunteerId;
        this.selectVolunteer(volunteerId);
        // this.findAllProjectsForV(teacherId); //                    WRITE THIS WITH CONDITION FOR APPROVED AND PENDING
        this.findAllApprovedProjects();
        this.findAllPendingProjects();
    }


    setApprovedProjects(approvedProjects) {
        this.setState({approvedProjects: approvedProjects});
    }

    setPendingProjects(pendingProjects) {
        this.setState({pendingProjects: pendingProjects});
    }

    findAllApprovedProjects() {
        this.projectService
            .findAllProjectsByApproval('true')
            .then((approvedProjects) => {
                this.setApprovedProjects(approvedProjects);
            });
    }

    findAllPendingProjects() {
        this.projectService
            .findAllProjectsByApproval('false')
            .then((pendingProjects) => {
                this.setPendingProjects(pendingProjects);
            });
    }

    approveProjectByVolunteer(volunteerId, projectId) {
        this.volunteerService
            .approveProjectByVolunteer(volunteerId, projectId)
            .then(() => {
                this.findAllPendingProjects();
                this.findAllApprovedProjects();
            });
    }

    renderListOfProjects() {
        let currentUrl = window.location.href;
        let projects, displayApproveButton;
        if(currentUrl.includes('pending')) {
            projects = this.state.pendingProjects;
            displayApproveButton = true;
        } else {
            projects = this.state.approvedProjects;
            displayApproveButton = false;
        }
        let projectsDom = projects.map((project) => {
            return (
                <ProjectListItem volunteerId = {this.state.volunteerId}
                                 project={project}
                                 key={project.id}
                                 approveProject={this.approveProjectByVolunteer}
                                 displayApproveButton={displayApproveButton}/>
            )
        });
        return projectsDom;
    }

    render() {
        return (
            <div className="container">
                <div>
                    <h3>Projects List</h3>
                    {/*<h3>Total projects = {this.state.projects.length}</h3>*/}

                    <ul className="list-group">
                        {this.renderListOfProjects()}
                    </ul>
                </div>
            </div>
        );
    }
}