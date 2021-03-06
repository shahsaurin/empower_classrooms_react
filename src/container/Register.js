import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import UserService from "../services/UserService";
import SchoolService from "../services/SchoolService";

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.userService = UserService.instance;
        this.schoolService = SchoolService.instance;

        this.state = {
            // Additional attributes:
            userType: 'teacher',
            schoolName: '',
            showSpinner: false,
            // User attributes below:
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            email: '',
            // dob: '',
            city: '',
            state: '',
            zip: '',
            phone: ''
        };

        this.handleChanged = this.handleChanged.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.userTypeSelected = this.userTypeSelected.bind(this);
    }

    userTypeSelected(event) {
        // console.log(event.target.value);
        this.setState({userType: event.target.value});
    }

    handleChanged(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    registerUser() {
        this.setState({showSpinner: true});
        let user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            // dob: this.state.dob,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            phone: this.state.phone
        };
        let schoolId = '';

        if(this.state.schoolName && this.state.userType.toLowerCase() === 'teacher') {
            this.schoolService
                .findSchoolByName(this.state.schoolName)
                .then((school) => {
                    schoolId = school[0].id;
                    return schoolId;
                })
                .then((schoolId) => {
                    this.userService
                        .createUser(user, this.state.userType, schoolId)
                        .then((user) => {
                            this.setState({showSpinner: false});
                            alert("Account created successfully!!");
                        });
                })
        } else {
            this.userService
                .createUser(user, this.state.userType, null)
                .then((user) => {
                    this.setState({showSpinner: false});
                    alert("Account created successfully!!");
                });
        }
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
                    <div className="col-2">
                    </div>

                    <div className="col-8">
                        <div className="text-center mb-4">
                            <h3 className="align-content-center">Register</h3>
                        </div>

                        <form>
                            <div className="form-group row">
                                <label htmlFor="userType" className="col-sm-3 col-form-label">User Type</label>
                                <div className="row col-sm-9 btn-group btn-group-toggle" id="userType" data-toggle="buttons">
                                    <label className={this.state.userType==='teacher' ? "btn btn-secondary active" : "btn btn-secondary"}
                                           onChange={this.userTypeSelected}>
                                        <input type="radio" name="options" id="option1"
                                               autoComplete="off" value="teacher"/> Teacher
                                    </label>
                                    <label className={this.state.userType==='volunteer' ? "btn btn-secondary active" : "btn btn-secondary"}
                                           onChange={this.userTypeSelected}>
                                        <input type="radio" name="options" id="option2"
                                               autoComplete="off" value="volunteer"/> Volunteer
                                    </label>
                                    <label className={this.state.userType==='donor' ? "btn btn-secondary active" : "btn btn-secondary"}
                                           onChange={this.userTypeSelected}>
                                        <input type="radio" name="options" id="option3"
                                               autoComplete="off" value="donor"/> Donor
                                    </label>
                                </div>
                            </div>

                            {/*<div className="form-group row">*/}
                                {/*<label htmlFor="userType" className="col-sm-2 col-form-label">User Type</label>*/}
                                {/*<div className="col-sm-10">*/}
                                    {/*<input onChange={this.handleChanged} type="text" name="userType" className="form-control"
                                              id="userType" placeholder="(*Required*) e.g. Teacher/Volunteer/Donor (write as it is)"/>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            <div className={this.state.userType==='teacher' ? "form-group row" : "hidden"}>
                                <label htmlFor="schoolName" className="col-sm-3 col-form-label">School Name</label>
                                <div className="col-sm-9">
                                    <input onChange={this.handleChanged} type="text" name="schoolName" className="form-control"
                                           id="schoolName" placeholder="School name (Enter exactly as it exists in our DB)"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-sm-3 col-form-label">First Name</label>
                                <div className="col-sm-9">
                                    <input onChange={this.handleChanged} type="text" name="firstName" className="form-control"
                                           id="firstName" placeholder="First Name"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="lastName" className="col-sm-3 col-form-label">Last Name</label>
                                <div className="col-sm-9">
                                    <input onChange={this.handleChanged} type="text" name="lastName" className="form-control"
                                           id="lastName" placeholder="last Name"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="username" className="col-sm-3 col-form-label">Username</label>
                                <div className="col-sm-9">
                                    <input onChange={this.handleChanged} type="text" name="username" className="form-control"
                                           id="username" placeholder="Username"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
                                <div className="col-sm-9">
                                    <input onChange={this.handleChanged} type="password" name="password" className="form-control"
                                           id="password" placeholder="Password"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                                <div className="col-sm-9">
                                    <input onChange={this.handleChanged} type="email" name="email" className="form-control"
                                           id="email" placeholder="Email"/>
                                </div>
                            </div>
                            {/*Uncomment and check if Dates gives rise to any issues*/}
                            {/*<div className="form-group row">*/}
                                {/*<label htmlFor="dob" className="col-sm-3 col-form-label">Date of Birth</label>*/}
                                {/*<div className="col-sm-9">*/}
                                    {/*<input onChange={this.handleChanged} type="date" name="dob" className="form-control"
                                    id="dob" placeholder="Date of Birth"/>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            <div className="row">
                                <div className="form-group row col-sm-6">
                                    <label htmlFor="city" className="col-sm-3 col-form-label">City</label>
                                    <div className="col-sm-9">
                                        <input onChange={this.handleChanged} type="text" name="city" className="form-control"
                                               id="city" placeholder="City"/>
                                    </div>
                                </div>
                                <div className="form-group row col-sm-6">
                                    <label htmlFor="state" className="col-sm-3 col-form-label">State</label>
                                    <div className="col-sm-9">
                                        <input onChange={this.handleChanged} type="text" name="state" className="form-control"
                                               id="state" placeholder="State"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group row col-sm-6">
                                    <label htmlFor="zip" className="col-sm-3 col-form-label">Zip</label>
                                    <div className="col-sm-9">
                                        <input onChange={this.handleChanged} type="text" name="zip" className="form-control"
                                               id="zip" placeholder="Zip"/>
                                    </div>
                                </div>
                                <div className="form-group row col-sm-6">
                                    <label htmlFor="phone" className="col-sm-3 col-form-label">Phone</label>
                                    <div className="col-sm-9">
                                        <input onChange={this.handleChanged} type="text" name="phone" className="form-control"
                                               id="phone" placeholder="Phone"/>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <div className="form-group row m-1 mb-4">
                                <button onClick={this.registerUser}
                                        className="btn btn-block btn-primary">Register</button>
                        </div>

                        <div id="spinner" className={this.state.showSpinner ? "spinner" : "hidden"}>
                            <div className="bounce1"></div>
                            <div className="bounce2"></div>
                            <div className="bounce3"></div>
                        </div>
                    </div>

                    <div className="col-2">
                    </div>
                </div>
            </div>
        );
    }
}