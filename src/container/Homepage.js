import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ProjectsList from "./ProjectsList";
import Register from "./Register";
import Login from "./Login";
import NewSchool from "../school/NewSchool";
import TeacherDashboard from "../teacher/TeacherDashboard";

export default class Homepage extends Component {

    render() {
        return(
            <Router>
                <div className="container-fluid">
                    <h2>Homepage</h2>


                    <Route path="/search"
                           component={ProjectsList}/>

                    <Route path="/register"
                        component={Register}/>

                    <Route path="/login"
                           component={Login}/>

                    <Route path="/new-school"
                           component={NewSchool}/>

                    <Route path="/teacher/:teacherId/dashboard"
                           component={TeacherDashboard}/>


                    {/*<Route path="/register"*/}
                           {/*component={Register}/>*/}

                    {/*<Route path="/search"*/}
                           {/*component={ProjectsList}/>*/}



                </div>

            </Router>


        );
    }
}