import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ProjectsList from "./ProjectsList";
import Register from "./Register";

export default class Homepage extends Component {

    constructor() {
        super();
    }


    render() {
        return(
            <Router>
                <div className="container-fluid">
                    <h2>Homepage</h2>


                    <Route path="/search"
                           component={ProjectsList}/>

                    <Route path="/register"
                        component={Register}/>


                    {/*<Route path="/register"*/}
                           {/*component={Register}/>*/}

                    {/*<Route path="/search"*/}
                           {/*component={ProjectsList}/>*/}



                </div>

            </Router>


        );
    }
}