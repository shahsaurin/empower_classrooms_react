import React, {Component} from 'react'
import ProjectService from "../services/ProjectService";

export default class ProjectEditor extends Component {

    constructor(props) {
        super(props);
        this.projectService = ProjectService.instance;

        this.state = {
            adminId: '',
            projectId: '',

            title: '',
            shortDescription: '',
            totalPrice: '',
            costToComplete: ''
        };

        this.handleChanged = this.handleChanged.bind(this);
        this.selectAdmin = this.selectAdmin.bind(this);
        this.selectProject = this.selectProject.bind(this);
        // this.registerUser = this.registerUser.bind(this);
        this.updateProject = this.updateProject.bind(this);
    }

    handleChanged(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    selectAdmin(adminId) {
        this.setState({adminId: adminId});
    }

    selectProject(projectId) {
        this.setState({projectId: projectId});
    }

    componentDidMount() {
        let
            adminId = this.props.match.params.adminId,
            projectId = this.props.match.params.projectId;
        this.selectAdmin(adminId);
        this.selectProject(projectId);
        this.findProjectById(projectId);
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.match.params.projectId !== prevProps.match.params.projectId) {
            let projectId = this.props.match.params.projectId;
            this.selectProject(projectId);
            this.findProjectById(this.props.match.params.projectId);
        }
    }

    findProjectById(projectId) {
        this.projectService
            .findProjectById(projectId)
            .then((project) => {
                this.setState({
                    title: project.title,
                    shortDescription: project.shortDescription,
                    totalPrice: project.totalPrice,
                    costToComplete: project.costToComplete
                })
            })
    }

    updateProject() {
        let updatedProject = {
            title: this.state.title,
            shortDescription: this.state.shortDescription,
            totalPrice: this.state.totalPrice,
            costToComplete: this.state.costToComplete
        };
        this.projectService
            .updateProject(this.state.projectId, updatedProject)
            .then((project) => {
                if(project) {
                    alert("Project updated successfully!");
                }
            });
    }


    render() {
        return (
            <div className="container">
                <div>
                    <h2>Project Editor</h2>
                </div>
                <form>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged} value={this.state.title || ''}
                                   type="text" name="title" className="form-control" id="title"
                                   placeholder="Project title"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="shortDescription" className="col-sm-2 col-form-label">Short Description</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged} value={this.state.shortDescription || ''}
                                   type="text" name="shortDescription" className="form-control" id="shortDescription"
                                   placeholder="Short Description"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="totalPrice" className="col-sm-2 col-form-label">Total Price</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged} value={this.state.totalPrice || ''}
                                   type="text" name="totalPrice" className="form-control" id="totalPrice"
                                   placeholder="Total Price"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="costToComplete" className="col-sm-2 col-form-label">Cost To Complete</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged} value={this.state.costToComplete || ''}
                                   type="text" name="costToComplete" className="form-control" id="costToComplete"
                                   placeholder="Cost To Complete"/>
                        </div>
                    </div>
                </form>

                <div className="form-group row">
                    <button onClick={this.updateProject}
                            className="btn btn-block btn-success">Update Project Details</button>
                </div>
            </div>
        );
    }
}