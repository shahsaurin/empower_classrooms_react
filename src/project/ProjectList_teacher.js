import React, {Component} from 'react'
import ProjectService from "../services/ProjectService";
import ProjectListItem from "./ProjectListItem"

export default class ProjectList_teacher extends Component {

    constructor(props) {
        super(props);
        this.projectService = ProjectService.instance;

        this.state = {
            teacherId: '',
            projects: []
        };

        // this.handleChanged = this.handleChanged.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
    }

    selectTeacher(teacherId) {
        this.setState({teacherId: teacherId});
    }

    componentDidMount() {
        let teacherId = this.props.match.params.teacherId;
        this.selectTeacher(teacherId);
        this.findAllProjectsForTeacher(teacherId);
    }

    // Not needed mostly as we're not passing anything to 'props' of 'this' component:
    // componentDidUpdate(prevProps) {
    //     if (this.props.teacherId !== prevProps.teacherId) {
    //         this.selectTeacher(teacherId)
    //         this.findAllProjectsForTeacher(teacherId);
    //     }
    // }

    deleteProject(projectId) {
        this.projectService
            .deleteProject(projectId)
            .then(() => {
                this.findAllProjectsForTeacher(this.props.match.params.teacherId);
            })
    }

    setProjects(projects) {
        this.setState({projects: projects});
    }

    findAllProjectsForTeacher(teacherId) {
        this.projectService
            .findAllProjectsForTeacher(teacherId)
            .then((projects) => {
                this.setProjects(projects);
            });
    }

    renderListOfProjects() {
        let projects = this.state.projects.map((project) => {
            return (
                <ProjectListItem project={project}
                                 key={project.id}
                                 delete={this.deleteProject}
                                 deleteButton={true}/>
            )
        });
        return projects;
    }

    render() {
        return (
            <div className="container">
                <div>
                    <h3>Projects List</h3>

                    <ul className="list-group">
                        {this.renderListOfProjects()}
                    </ul>
                </div>
            </div>
        );
    }
}