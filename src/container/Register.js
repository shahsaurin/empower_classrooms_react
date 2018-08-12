import React, {Component} from 'react'
import UserService from "../services/UserService";
import SchoolService from "../services/SchoolService";

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.userService = UserService.instance;
        this.schoolService = SchoolService.instance;

        this.state = {
            // Additional attributes:
            userType: '',
            schoolName: '',
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
    }

    handleChanged(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    registerUser() {
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
        console.log(user);
        console.log(this.state.userType);
        let schoolId = '';

        if(this.state.schoolName && this.state.userType.toLowerCase() === 'teacher') {
            this.schoolService
                .findSchoolByName(this.state.schoolName)
                .then((school) => {
                    schoolId = school[0].id;
                    // console.log(schoolId);
                    return schoolId;
                })
                .then((schoolId) => {
                    console.log('SchoolId in:' + schoolId);
                    this.userService
                        .createUser(user, this.state.userType, schoolId);
                })
        } else {
            this.userService
                .createUser(user, this.state.userType, null);
        }


            // .then(() => {})
    //    SET STATE Id
    }


    render() {
        return (
            <div className="container">
                <div>
                    <h2>Register</h2>
                </div>
                <form>
                    <div className="form-group row">
                        <label htmlFor="userType" className="col-sm-2 col-form-label">User Type</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged} type="text" name="userType" className="form-control" id="userType" placeholder="(*Required*) e.g. Teacher/Volunteer/Donor (write as it is)"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="schoolName" className="col-sm-2 col-form-label">School Name</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged} type="text" name="schoolName" className="form-control" id="schoolName" placeholder="School name (For 'Teacher' only)"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="firstName" className="col-sm-2 col-form-label">First Name</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged} type="text" name="firstName" className="form-control" id="firstName" placeholder="First Name"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="lastName" className="col-sm-2 col-form-label">Last Name</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged} type="text" name="lastName" className="form-control" id="lastName" placeholder="last Name"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged} type="text" name="username" className="form-control" id="username" placeholder="Username"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged} type="password" name="password" className="form-control" id="password" placeholder="Password"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged} type="email" name="email" className="form-control" id="email" placeholder="Email"/>
                        </div>
                    </div>
                    {/*Uncomment and check if Dates gives rise to any issues*/}
                    {/*<div className="form-group row">*/}
                        {/*<label htmlFor="dob" className="col-sm-2 col-form-label">Date of Birth</label>*/}
                        {/*<div className="col-sm-10">*/}
                            {/*<input onChange={this.handleChanged} type="date" name="dob" className="form-control" id="dob" placeholder="Date of Birth"/>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    <div className="row">
                        <div className="form-group row col-6">
                            <label htmlFor="city" className="col-sm-2 col-form-label">City</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleChanged} type="text" name="city" className="form-control" id="city" placeholder="City"/>
                            </div>
                        </div>
                        <div className="form-group row col-6">
                            <label htmlFor="state" className="col-sm-2 col-form-label">State</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleChanged} type="text" name="state" className="form-control" id="state" placeholder="State"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group row col-6">
                            <label htmlFor="zip" className="col-sm-2 col-form-label">Zip</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleChanged} type="text" name="zip" className="form-control" id="zip" placeholder="Zip"/>
                            </div>
                        </div>
                        <div className="form-group row col-6">
                            <label htmlFor="phone" className="col-sm-2 col-form-label">Phone</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleChanged} type="text" name="phone" className="form-control" id="phone" placeholder="Phone"/>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="form-group row">
                    <div className="offset-sm-2 col-sm-10">
                        <button onClick={this.registerUser}
                                className="btn btn-primary">Register</button>
                    </div>
                </div>
            </div>
        );
    }
}