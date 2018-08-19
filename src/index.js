import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import Homepage from "./container/Homepage";
import './stylesheets/style.css'

ReactDOM.render(
    <div className="container-fluid ss-bg-color">
        <Homepage/>
    </div>,
    document.getElementById('root')
);
