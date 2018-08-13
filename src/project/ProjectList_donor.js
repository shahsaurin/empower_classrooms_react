import React, {Component} from 'react'
import ProjectService from "../services/ProjectService";
import ProjectListItem from "./ProjectListItem"
import DonorService from "../services/DonorService";

export default class ProjectList_donor extends Component {

    constructor(props) {
        super(props);
        this.donorService = DonorService.instance;
        this.projectService = ProjectService.instance;

        this.state = {
            donorId: '',
            approvedProjects: []
        };

        this.donateToProject = this.donateToProject.bind(this);
    }

    donateToProject(donorId, projectId, donationAmount) {
        if(!donationAmount) {
            return;
        }
        this.donorService
            .donateToProject(donorId, projectId, donationAmount)
            .then(() => {
                this.findAllApprovedProjects();
            })
    }

    selectDonor(donorId) {
        this.setState({donorId: donorId});
    }

    componentDidMount() {
        let donorId = this.props.match.params.donorId;
        this.selectDonor(donorId);
        this.findAllApprovedProjects();      // APPROVED PROJECTS
    }

    setApprovedProjects(approvedProjects) {
        this.setState({approvedProjects: approvedProjects});
    }

    findAllApprovedProjects() {
        this.projectService
            .findAllProjectsByApproval('true')
            .then((approvedProjects) => {
                this.setApprovedProjects(approvedProjects);
            });
    }


    renderListOfProjects() {
        let projectsDom = this.state.approvedProjects.map((project) => {
            return (
                <ProjectListItem
                                // volunteerId = {this.state.volunteerId}
                                 donorId={this.state.donorId}
                                 project={project}
                                 key={project.id}
                                 // approveProject={this.approveProjectByVolunteer}
                                 donateToProject={this.donateToProject}
                                 displayApproveButton={false}
                                 deleteButton={false}
                                 displayDonateButton={true}/>
            )
        });
        return projectsDom;
    }


    render() {
        return (
            <div className="container">
                <div>
                    <h3>Approved Projects that need funding!</h3>
                    {/*<h3>Total projects = {this.state.projects.length}</h3>*/}

                    <ul className="list-group">
                        {this.renderListOfProjects()}
                    </ul>
                </div>
            </div>
        );
    }
}