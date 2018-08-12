import React, {Component} from 'react'
import SchoolService from "../services/SchoolService";

export default class NewSchool extends Component {

    constructor(props) {
        super(props);
        this.schoolService = SchoolService.instance;

        this.state = {
            // Additional attributes:
            zip: '',
            phone: ''
        };

        this.handleChanged = this.handleChanged.bind(this);
        this.addNewSchool = this.addNewSchool.bind(this);
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
                    <h2>Add New School</h2>
                </div>
                <form>
                    <div className="form-group row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">School name</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged}
                                   type="text" name="name" className="form-control" id="name"
                                   placeholder="School Name"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="city" className="col-sm-2 col-form-label">City</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged}
                                   type="text" name="city" className="form-control" id="city"
                                   placeholder="City"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="zip" className="col-sm-2 col-form-label">Zip</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged}
                                   type="text" name="zip" className="form-control" id="zip"
                                   placeholder="Zip"/>
                        </div>
                    </div>
                </form>

                <div className="form-group row">
                    <div className="offset-sm-2 col-sm-10">
                        <button onClick={this.addNewSchool}
                                className="btn btn-block btn-primary">Add school to our database!</button>
                    </div>
                </div>
            </div>
        );
    }
}