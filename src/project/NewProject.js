import React, {Component} from 'react'
import ProjectService from "../services/ProjectService";

export default class NewProject extends Component {

    constructor(props) {
        super(props);
        // this.schoolService = SchoolService.instance;
        this.projectService = ProjectService.instance;

        this.state = {
            teacherId: '',
            showTeacherIdField: '',

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
        let teacherId = this.props.match.params.teacherId;
        if(teacherId) {
            console.log('In didMount if: ' + teacherId);
            this.selectTeacher(teacherId);
            this.setState({showTeacherIdField: false});
        } else {
            this.setState({showTeacherIdField: true});
        }
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.match.params.teacherId !== prevProps.match.params.teacherId) {
            let teacherId = this.props.match.params.teacherId;
            if(teacherId) {
                this.selectTeacher(teacherId);
                this.setState({showTeacherIdField: false});
            } else {
                this.setState({showTeacherIdField: true});
            }
        }
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
        let teacherIdFieldclassName = 'form-group row';
        if (!this.state.showTeacherIdField) {
            teacherIdFieldclassName += ' hidden';
        }

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
                    <div className={teacherIdFieldclassName}>
                        <label htmlFor="teacherId" className="col-sm-2 col-form-label">Teacher ID</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged}
                                   type="text" name="teacherId" className="form-control" id="teacherId"
                                   placeholder="Teacher ID"/>
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