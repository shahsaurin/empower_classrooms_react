import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import ProjectsList_API from "./ProjectsList_API";
import Register from "./Register";
import Login from "./Login";
import NewSchool from "../school/NewSchool";
import TeacherDashboard from "../teacher/TeacherDashboard";
import VolunteerDashboard from "../volunteer/VolunteerDashboard";
import DonorDashboard from "../donor/DonorDashboard";
import AdminDashboard from "../admin/AdminDashboard";

export default class Homepage extends Component {

    render() {
        return(
            <Router>
                <div className="container">
                    <div className="row">
                        <div className="col-8 p-3">
                            <h3>Empower Classrooms</h3>
                        </div>
                        <div className="col-4 pull-right p-2">
                            <Link to={`/search`}>
                                <i className="fa fa-home fa-2x pull-right m-2" aria-hidden="true"></i>
                                {/*<button className="btn btn-danger pull-right">Home</button>*/}
                            </Link>
                        </div>
                    </div>

                    <div className="row">

                        <Route exact path="/" render={() => (
                            // loggedIn ? (
                            //     <Redirect to="/dashboard"/>
                            // ) : (
                                <ProjectsList_API/>
                        )}/>

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