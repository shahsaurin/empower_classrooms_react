import React, {Component} from 'react'
import UserService from "../services/UserService";
import VolunteerService from "../services/VolunteerService";
import TeacherService from "../services/TeacherService";
import DonorService from "../services/DonorService";

export default class UserEditor extends Component {

    constructor(props) {
        super(props);
        this.teacherService = TeacherService.instance;
        this.volunteerService = VolunteerService.instance;
        this.donorService = DonorService.instance;
        this.userService = UserService.instance;

        this.state = {
            adminId: '',
            userId: '',
            userType: '',
        // Generic User attributes:
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            // dob: '',
            email: '',
            city: '',
            state: '',
            zip: '',
            phone: '',
        // //    Teacher specific:
        //     projectInitiated: '',
        // //    Volunteer specific::
        //     projectsApproved: '',
        // //    Donor specific:
        //     contributedProjects: '',
        //     totalAmountDonated: ''
        };

        this.handleChanged = this.handleChanged.bind(this);
        this.selectAdmin = this.selectAdmin.bind(this);
        // this.selectSchool = this.selectSchool.bind(this);
        // this.registerUser = this.registerUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    handleChanged(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    selectAdmin(adminId) {
        this.setState({adminId: adminId});
    }

    selectUser(userId) {
        this.setState({userId: userId});
    }

    componentDidMount() {
        let
            adminId = this.props.match.params.adminId,
            userId = this.props.match.params.teacherId ||
                this.props.match.params.volunteerId ||
                this.props.match.params.donorId;
        this.selectAdmin(adminId);
        this.selectUser(userId);
        if(this.props.match.params.teacherId) {
            this.setState({userType: 'teacher'});
        } else if(this.props.match.params.volunteerId) {
            this.setState({userType: 'volunteer'});
        } else {
            this.setState({userType: 'donor'});
        }
        this.findUserById(userId);
    }

    // componentDidUpdate(prevProps) {
    //     // Typical usage (don't forget to compare props):
    //     if (this.props.match.params.schoolId !== prevProps.match.params.schoolId) {
    //         let schoolId = this.props.match.params.schoolId;
    //         this.selectSchool(schoolId);
    //         this.findSchoolById(this.props.match.params.schoolId);
    //     }
    // }

    findUserById(userId) {
        this.userService
            .findUserById(userId)
            .then((user) => {
                this.setState({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    password: user.password,
                    // dob: user.dob,
                    email: user.email,
                    city: user.city,
                    state: user.state,
                    phone: user.phone,
                    zip: user.zip,
                    //    Teacher specific:
                    projectInitiated: user.projectInitiated,
                    //    Volunteer specific::
                    projectsApproved: user.projectsApproved,
                    //    Donor specific:
                    contributedProjects: user.contributedProjects,
                    totalAmountDonated: user.totalAmountDonated
                })
            });
    }

    updateUser() {
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
        this.userService
            .updateUser(this.state.userId, updatedUser);
    }


    render() {
        return (
            <div className="container">
                <div>
                    <h2>Edit {(this.state.userType==='teacher') ? 'Teacher' : (this.state.userType==='volunteer' ? 'Volunteer' : 'Donor')}</h2>
                </div>
                <form>
                    <div className="form-group row">
                        <label htmlFor="firstName" className="col-sm-2 col-form-label">First Name</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged} value={this.state.firstName || ''}
                                   type="text" name="firstName" className="form-control" id="firstName"
                                   placeholder="First Name"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="lastName" className="col-sm-2 col-form-label">Last Name</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged} value={this.state.lastName || ''}
                                   type="text" name="lastName" className="form-control" id="lastName"
                                   placeholder="last Name"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged} value={this.state.username || ''}
                                   type="text" name="username" className="form-control" id="username"
                                   placeholder="Username"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged} value={this.state.password || ''}
                                   type="password" name="password" className="form-control" id="password"
                                   placeholder="Password"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged} value={this.state.email || ''}
                                   type="email" name="email" className="form-control" id="email"
                                   placeholder="Email"/>
                        </div>
                    </div>
                    {/*Uncomment and check if Dates gives rise to any issues*/}
                    {/*<div className="form-group row">*/}
                    {/*<label htmlFor="dob" className="col-sm-2 col-form-label">Date of Birth</label>*/}
                    {/*<div className="col-sm-10">*/}
                    {/*<input onChange={this.handleChanged} value={this.state.dob || ''}
                    type="date" name="dob" className="form-control" id="dob"
                    placeholder="Date of Birth"/>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    <div className="row">
                        <div className="form-group row col-md-6">
                            <label htmlFor="city" className="col-sm-2 col-form-label">City</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleChanged} value={this.state.city || ''}
                                       type="text" name="city" className="form-control" id="city"
                                       placeholder="City"/>
                            </div>
                        </div>
                        <div className="form-group row col-md-6">
                            <label htmlFor="state" className="col-sm-2 col-form-label">State</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleChanged} value={this.state.state || ''}
                                       type="text" name="state" className="form-control" id="state"
                                       placeholder="State"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group row col-6">
                            <label htmlFor="zip" className="col-sm-2 col-form-label">Zip</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleChanged} value={this.state.zip || ''}
                                       type="text" name="zip" className="form-control" id="zip"
                                       placeholder="Zip"/>
                            </div>
                        </div>
                        <div className="form-group row col-6">
                            <label htmlFor="phone" className="col-sm-2 col-form-label">Phone</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleChanged} value={this.state.phone || ''}
                                       type="text" name="phone" className="form-control" id="phone"
                                       placeholder="Phone"/>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="form-group row">
                    <button onClick={this.updateUser}
                            className="btn btn-block btn-success">Update {(this.state.userType==='teacher') ? 'Teacher' : (this.state.userType==='volunteer' ? 'Volunteer' : 'Donor')} Details</button>
                </div>
            </div>
        );
    }
}