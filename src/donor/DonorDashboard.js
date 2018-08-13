import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import ProjectList_volunteer from "../project/ProjectList_volunteer";
import ProjectList_donor from "../project/ProjectList_donor";
import MessageList from "../message/MessageList";

export default class DonorDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            donorId: ''
        };

        this.selectDonor = this.selectDonor.bind(this);
    }

    selectDonor(donorId) {
        this.setState({donorId: donorId});
    }

    componentDidMount() {
        this.selectDonor(this.props.match.params.donorId);
    }



    render() {
        return (
            <Router>
                <div className="container">
                    <h2>Donor Account Home - Id: {this.state.donorId}</h2>

                    <div className="row">
                        <div className="col-4">
                            <ul>
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
                                    <Link to={`/donor/${this.state.donorId}/sendMessage`}>
                                        Contact a Volunteer
                                    </Link>
                                </li>
                            </ul>

                        </div>

                        <div className="col-8">

                            <Route path="/donor/:donorId/projects"
                                   component={ProjectList_donor}/>

                            <Route path="/donor/:donorId/inbox"
                                   component={MessageList}/>

                            <Route path="/donor/:donorId/sentbox"
                                   component={MessageList}/>
                        </div>

                    </div>
                </div>
            </Router>
        );
    }
}