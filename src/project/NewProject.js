import React, {Component} from 'react'
import SchoolService from "../services/SchoolService";

export default class NewProject extends Component {

    constructor(props) {
        super(props);
        // this.schoolService = SchoolService.instance;

        this.state = {
            // Additional attributes:
            zip: '',
            phone: ''
        };

        this.handleChanged = this.handleChanged.bind(this);
    }

    handleChanged(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    addNewSchool() {
        let school = {
            name: this.state.name,
            city: this.state.city,
            zip: this.state.zip
        };
        this.schoolService
            .addNewSchool(school)
            .then((school) => {
                console.log(school);
                alert('School Created successfully!');
                let currentUrl = window.location.href;
                window.location = currentUrl.replace('new-school', 'search');
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
                        <button onClick={this.addNewSchool}
                                className="btn btn-block btn-primary">Add this project to our database!</button>
                    </div>
                </div>
            </div>
        );
    }
}