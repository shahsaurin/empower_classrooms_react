import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
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
                <div className="container-fluid">
                    <h2>Homepage</h2>


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

            </Router>


        );
    }
}