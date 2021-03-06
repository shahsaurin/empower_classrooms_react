import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import UserService from "../services/UserService";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.userService = UserService.instance;

        this.state = {
            // Additional attributes:
            userType: 'teacher',
            // User attributes below:
            username: '',
            password: '',
            showSpinner: false
        };

        this.handleChanged = this.handleChanged.bind(this);
        this.login = this.login.bind(this);
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

    login() {
        this.setState({showSpinner: true});
        let userType = this.state.userType,
            user = {
                username: this.state.username,
                password: this.state.password
            };

        this.userService
            .login(user, userType)
            .then((user) => {
                this.setState({showSpinner: false});
                if(user.error) {
                    alert("User not found!");
                } else {
                    // alert(userType + " login successful!!");
                    sessionStorage.setItem('isLoggedIn', 'true');
                    let currentUrl = window.location.href;
                    window.location = currentUrl.replace('login', userType + '/' + user.id +  '/dashboard');
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
                    <div className="col-2">
                    </div>

                    <div className="col-8">
                        <div className="text-center mb-4">
                            <h3 className="align-content-center">Login</h3>
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
                                    <label className={this.state.userType==='admin' ? "btn btn-secondary active" : "btn btn-secondary"}
                                           onChange={this.userTypeSelected}>
                                        <input type="radio" name="options" id="option4"
                                               autoComplete="off" value="admin"/> Admin
                                    </label>
                                </div>
                            </div>

                            {/*<div className="form-group row">*/}
                                {/*<label htmlFor="userType" className="col-sm-3 col-form-label">User Type</label>*/}
                                {/*<div className="col-sm-9">*/}
                                    {/*<input onChange={this.handleChanged} type="text" name="userType" className="form-control" id="userType" placeholder="(*Required*) e.g. Teacher/Volunteer/Donor (write as it is)"/>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            <div className="form-group row">
                                <label htmlFor="username" className="col-sm-3 col-form-label">Username</label>
                                <div className="col-sm-9">
                                    <input onChange={this.handleChanged} type="text" name="username" className="form-control" id="username" placeholder="Username"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
                                <div className="col-sm-9">
                                    <input onChange={this.handleChanged} type="password" name="password" className="form-control" id="password" placeholder="Password"/>
                                </div>
                            </div>
                        </form>

                        <div className="form-group row m-4">
                                <button onClick={this.login}
                                        className="btn btn-block btn-success">Login</button>
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