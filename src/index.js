import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from "./container/Homepage";
import '../node_modules/bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
    <div className="container-fluid">
        <Homepage/>
    </div>,
    document.getElementById('root')
);
