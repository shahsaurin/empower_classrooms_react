import React from 'react';
import {Link} from 'react-router-dom';

export default class ProjectCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card" styles={{width: '18rem'}}>
                <div className="row">


                <div className="col-4">
                    <img className="card-img-top" src={this.props.project.imageURL} alt="Card image cap"/>
                </div>
                <div className="col-8">
                    <div className="card-body">
                        <h5 className="card-title">{this.props.project.title}</h5>
                        <p className="card-text">{this.props.project.shortDescription}</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
                </div>

            </div>
        )
    }
}

