import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import SchoolService from "../services/SchoolService";

export default class NewSchool extends Component {

    constructor(props) {
        super(props);
        this.schoolService = SchoolService.instance;

        this.state = {
            // Additional attributes:
            adminId: '',
            name: '',
            city: '',
            zip: ''
        };

        this.handleChanged = this.handleChanged.bind(this);
        this.addNewSchool = this.addNewSchool.bind(this);
    }

    selectAdmin(adminId) {
        this.setState({adminId: adminId});
    }

    componentDidMount() {
        this.selectAdmin(this.props.match.params.adminId);
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
                alert('School Created successfully!');
                let currentUrl = window.location.href;
                // if(currentUrl.includes('admin')) {
                //     window.location = currentUrl.replace('new-school', 'school');
                // } else {
                //     window.location = currentUrl.replace('new-school', 'search');
                // }
                if(!currentUrl.includes('admin')) {
                    window.location = currentUrl.replace('new-school', 'search');
                }
            });
    }


    render() {
        return (
            <div className="container">

                <div className="row">
                    <div className="col-8 p-3">
                        <h3>Empower Classrooms</h3>
                    </div>
                    <div className={this.state.isLoggedIn ? "hidden" : "col-4 pull-right p-2"}>
                        <Link to={`/search`}>
                            <i className="fa fa-home fa-2x pull-right m-2" aria-hidden="true"></i>
                        </Link>
                    </div>
                    <div className={this.state.isLoggedIn ? "col-4 pull-right p-2" : "hidden"}>
                        <Link to={`/search`} className="pull-right">
                            Logout
                        </Link>
                    </div>
                </div>

                <div className="row">
                    <div className="col-1">
                    </div>

                    <div className="col-10">
                        <div className={this.state.adminId ? "hidden" : "text-center m-4"}>
                            <h3 className="align-content-center">Add New School</h3>
                        </div>

                        <form className={this.state.adminId ? "m-5" : ""}>
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

                    <div className="col-1">
                    </div>
                </div>
            </div>
        );
    }
}