import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import ProjectsList_API from "./ProjectsList_API";
import Register from "./Register";
import Login from "./Login";
import NewSchool from "../school/NewSchool";
import TeacherDashboard from "../teacher/TeacherDashboard";
import VolunteerDashboard from "../volunteer/VolunteerDashboard";
import DonorDashboard from "../donor/DonorDashboard";
import AdminDashboard from "../admin/AdminDashboard";
import {mySessionStorage} from "../storage/storage";

export default class Homepage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: ''
        };
    }

    componentDidMount() {
        if(mySessionStorage.getItem('isLoggedIn') === 'true') {
            this.setState({isLoggedIn: true});
        } else {
            this.setState({isLoggedIn: false});
        }
    }


    render() {
        return(
            <Router>
                <div className="container">
                    {/*<div className="row">*/}
                        {/*<div className="col-8 p-3">*/}
                            {/*<h3>Empower Classrooms</h3>*/}
                        {/*</div>*/}
                        {/*<div className={this.state.isLoggedIn ? "hidden" : "col-4 pull-right p-2"}>*/}
                            {/*<Link to={`/search`}>*/}
                                {/*<i className="fa fa-home fa-2x pull-right m-2" aria-hidden="true"></i>*/}
                            {/*</Link>*/}
                        {/*</div>*/}
                        {/*<div className={this.state.isLoggedIn ? "col-4 pull-right p-2" : "hidden"}>*/}
                            {/*<Link to={`/search`} className="pull-right">*/}
                                {/*Logout*/}
                            {/*</Link>*/}
                        {/*</div>*/}
                    {/*</div>*/}

                    <div className="row">

                        {/*Default Route for Homepage*/}
                        <Route exact path="/"
                        component={ProjectsList_API}/>

                        <Route path="/search"
                               component={ProjectsList_API}/>

                        <Route path="/register"
                            component={Register}/>

                        <Route path="/login"
                               component={Login}/>

                        <Route path="/new-school"
                               component={NewSchool}/>

                        <Route path="/teacher/:teacherId/dashboard"
                               component={TeacherDashboard}/>

                        <Route path="/volunteer/:volunteerId/dashboard"
                               component={VolunteerDashboard}/>

                        <Route path="/donor/:donorId/dashboard"
                               component={DonorDashboard}/>

                        <Route path="/admin/:adminId/dashboard"
                               component={AdminDashboard}/>
                    </div>


                </div>

            </Router>


        );
    }
}