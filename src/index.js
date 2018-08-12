import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import Homepage from "./container/Homepage";

ReactDOM.render(
    <div className="container-fluid">
        <Homepage/>
    </div>,
    document.getElementById('root')
);
