import React, {Component} from 'react'
import ProjectService from "../services/ProjectService";

export default class NewProject extends Component {

    constructor(props) {
        super(props);
        // this.schoolService = SchoolService.instance;
        this.projectService = ProjectService.instance;

        this.state = {
            teacherId: '',
            title: '',
            shortDescription: '',
            totalPrice: ''
        };

        this.handleChanged = this.handleChanged.bind(this);
        this.addNewProjectForSchool = this.addNewProjectForSchool.bind(this);
    }

    selectTeacher(teacherId) {
        this.setState({teacherId: teacherId});
    }

    componentDidMount() {
        this.selectTeacher(this.props.match.params.teacherId);
    }

    handleChanged(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    addNewProjectForSchool() {
        let school = {
            title: this.state.title,
            shortDescription: this.state.shortDescription,
            totalPrice: this.state.totalPrice
        },
        teacherId = this.state.teacherId;

        this.projectService
            .addNewProjectForSchool(school, teacherId)
            .then((project) => {
                console.log(project);
                alert('Project Created successfully!');
                // let currentUrl = window.location.href;
                // window.location = currentUrl.replace('new-school', 'search');
            });
    }


    render() {
        return (
            <div className="container">
                <div>
                    <h2>Add New Project</h2>
                </div>
                <form>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged}
                                   type="text" name="title" className="form-control" id="title"
                                   placeholder="Project Title"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="shortDescription" className="col-sm-2 col-form-label">Short Description</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged}
                                   type="text" name="shortDescription" className="form-control" id="shortDescription"
                                   placeholder="Short Description"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="totalPrice" className="col-sm-2 col-form-label">Total Price</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged}
                                   type="text" name="totalPrice" className="form-control" id="totalPrice"
                                   placeholder="Total Price"/>
                        </div>
                    </div>
                </form>

                <div className="form-group row">
                    <div className="offset-sm-2 col-sm-10">
                        <button onClick={this.addNewProjectForSchool}
                                className="btn btn-block btn-primary">Add this project to our database!</button>
                    </div>
                </div>
            </div>
        );
    }
}