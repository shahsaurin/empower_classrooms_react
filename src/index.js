import React from 'react';
import ReactDOM from 'react-dom';
import ProjectsList from "./container/ProjectsList";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Homepage from "./container/Homepage";

ReactDOM.render(
    <div className="container-fluid">
        <Homepage/>
    </div>,
    document.getElementById('root')
);
