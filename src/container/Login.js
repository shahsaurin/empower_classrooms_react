import React, {Component} from 'react'
import UserService from "../services/UserService";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.userService = UserService.instance;

        this.state = {
            // Additional attributes:
            userType: '',
            // User attributes below:
            username: '',
            password: ''
        };

        this.handleChanged = this.handleChanged.bind(this);
        this.login = this.login.bind(this);
    }

    handleChanged(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    login() {
        let userType = this.state.userType,
            user = {
                username: this.state.username,
                password: this.state.password
            };

        this.userService
            .login(user, userType)
            .then((user) => {
                if(user.error) {
                    alert("User not found!");
                } else {
                    alert(userType + " login successful!!");
                    let currentUrl = window.location.href;
                    window.location = currentUrl.replace('login', userType + '/' + user.id +  '/dashboard');
                }
            });
    }

    render() {
        return (
            <div className="container">
                <div>
                    <h2>Login</h2>
                </div>
                <form>
                    <div className="form-group row">
                        <label htmlFor="userType" className="col-sm-2 col-form-label">User Type</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged} type="text" name="userType" className="form-control" id="userType" placeholder="(*Required*) e.g. Teacher/Volunteer/Donor (write as it is)"/>
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
                </form>

                <div className="form-group row">
                    <div className="offset-sm-2 col-sm-10">
                        <button onClick={this.login}
                                className="btn btn-success">Login</button>
                    </div>
                </div>
            </div>
        );
    }
}