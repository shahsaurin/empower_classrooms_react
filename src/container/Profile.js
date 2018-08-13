import React, {Component} from 'react'
import UserService from "../services/UserService";
import SchoolService from "../services/SchoolService";

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.userService = UserService.instance;
        this.schoolService = SchoolService.instance;
        this.userService = UserService.instance;

        this.state = {
            userId: '',
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
        this.selectCurrentUser = this.selectCurrentUser.bind(this);
        // this.registerUser = this.registerUser.bind(this);
        this.findUserById = this.findUserById.bind(this);
        this.updateProfle = this.updateProfle.bind(this);
    }

    handleChanged(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    selectCurrentUser(currentUserId) {
        this.setState({userId: currentUserId});
    }

    componentDidMount() {
        let currentUserId = this.props.match.params.teacherId ||
            this.props.match.params.volunteerId ||
            this.props.match.params.donorId;
        this.selectCurrentUser(currentUserId);
        this.findUserById(currentUserId);
    }

    findUserById(currentUserId) {
        this.userService
            .findUserById(currentUserId)
            .then((user) => {
                console.log(user);
                this.setState({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    password: user.password,
                    email: user.email,
                    // dob: user.dob,
                    city: user.city,
                    state: user.state,
                    zip: user.zip,
                    phone:user.phone
                })

            })
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
        // console.log(user);
        // console.log(this.state.userType);
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
                        .createUser(user, this.state.userType, schoolId)
                        .then((user) =>
                            alert("Account created successfully!!")
                        );
                })
        } else {
            this.userService
                .createUser(user, this.state.userType, null)
                .then((user) =>
                    alert("Account created successfully!!")
                );
        }


        // .then(() => {})
        //    SET STATE Id
    }

    updateProfle() {
        let updatedUser = {
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
        console.log('Updated obj:');
        console.log(updatedUser);
        this.userService
            .updateUser(this.state.userId, updatedUser);
    }


    render() {
        return (
            <div className="container">
                <div>
                    <h2>Profile</h2>
                </div>
                <form>
                    <div className="form-group row">
                        <label htmlFor="firstName" className="col-sm-2 col-form-label">First Name</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged} value={this.state.firstName}
                                   type="text" name="firstName" className="form-control" id="firstName"
                                   placeholder="First Name"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="lastName" className="col-sm-2 col-form-label">Last Name</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged} value={this.state.lastName}
                                   type="text" name="lastName" className="form-control" id="lastName"
                                   placeholder="last Name"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged} value={this.state.username}
                                   type="text" name="username" className="form-control" id="username"
                                   placeholder="Username"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged} value={this.state.password}
                                   type="password" name="password" className="form-control" id="password"
                                   placeholder="Password"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged} value={this.state.email}
                                   type="email" name="email" className="form-control" id="email"
                                   placeholder="Email"/>
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
                                <input onChange={this.handleChanged} value={this.state.city}
                                       type="text" name="city" className="form-control" id="city"
                                       placeholder="City"/>
                            </div>
                        </div>
                        <div className="form-group row col-6">
                            <label htmlFor="state" className="col-sm-2 col-form-label">State</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleChanged} value={this.state.state}
                                       type="text" name="state" className="form-control" id="state"
                                       placeholder="State"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group row col-6">
                            <label htmlFor="zip" className="col-sm-2 col-form-label">Zip</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleChanged} value={this.state.zip}
                                       type="text" name="zip" className="form-control" id="zip"
                                       placeholder="Zip"/>
                            </div>
                        </div>
                        <div className="form-group row col-6">
                            <label htmlFor="phone" className="col-sm-2 col-form-label">Phone</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleChanged} value={this.state.phone}
                                       type="text" name="phone" className="form-control" id="phone"
                                       placeholder="Phone"/>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="form-group row">
                    <button onClick={this.updateProfle}
                            className="btn btn-block btn-success">Update Profile</button>
                </div>
            </div>
        );
    }
}