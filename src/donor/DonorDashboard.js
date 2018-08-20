import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import ProjectList_donor from "../project/ProjectList_donor";
import MessageList from "../message/MessageList";
import MessageCreator from "../message/MessageCreator";
import Profile from "../container/Profile";
import {mySessionStorage} from "../storage/storage";

export default class DonorDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            donorId: '',
            isLoggedIn: ''
        };

        this.selectDonor = this.selectDonor.bind(this);
        this.logout = this.logout.bind(this);
    }

    logout() {
        window.location.pathname = '/';
    }

    selectDonor(donorId) {
        this.setState({donorId: donorId});
    }

    componentDidMount() {
        this.selectDonor(this.props.match.params.donorId);
        if(mySessionStorage.getItem('isLoggedIn') === 'true') {
            this.setState({isLoggedIn: true});
        } else {
            this.setState({isLoggedIn: false});
        }
    }



    render() {
        return (
            <Router>
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
                            {/*<Link to={`/search`} className="pull-right">*/}
                            <button className="btn btn-outline-danger pull-right" onClick={this.logout}>Logout</button>
                            {/*</Link>*/}
                        </div>
                    </div>

                    <h2>Donor Home - Id: {this.state.donorId}</h2>

                    <div className="row">
                        <div className="col-sm-4">
                            <ul>
                                <li className="list-group-item">
                                    <Link to={`/donor/${this.state.donorId}/profile`}>
                                        My Profile
                                    </Link>
                                </li>
                                <li className="list-group-item">
                                    <Link to={`/donor/${this.state.donorId}/projects`}>
                                        Available Projects
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link to={`/donor/${this.state.donorId}/inbox`}>
                                        Received Messages
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link to={`/donor/${this.state.donorId}/sentbox`}>
                                        Sent Messages
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link to={`/donor/${this.state.donorId}/messageVolunteer`}>
                                        Contact a Volunteer
                                    </Link>
                                </li>
                            </ul>

                        </div>

                        <div className="col-sm-8">

                            <Route path="/donor/:donorId/profile"
                                   component={Profile}/>

                            <Route path="/donor/:donorId/projects"
                                   component={ProjectList_donor}/>

                            <Route path="/donor/:donorId/inbox"
                                   component={MessageList}/>

                            <Route path="/donor/:donorId/sentbox"
                                   component={MessageList}/>

                            <Route path="/donor/:donorId/messageVolunteer"
                                   component={MessageCreator}/>
                        </div>

                    </div>
                </div>
            </Router>
        );
    }
}