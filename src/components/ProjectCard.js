import React from 'react';

export default class ProjectCard extends React.Component {

    render() {
        return (
            <div className="card m-4" styles={{width: '18rem'}}>
                <div className="row">


                <div className="col-4">
                    <img className="card-img-top" src={this.props.project.imageURL} alt=""/>
                </div>
                <div className="col-8">
                    <div className="card-body">
                        <h5 className="card-title">{this.props.project.title}</h5>
                        <p className="card-text">{this.props.project.shortDescription}</p>
                        <p className="card-text">Total Price: ${this.props.project.totalPrice}</p>
                        <p className="card-text">Cost to complete: ${this.props.project.costToComplete}</p>
                        {/*<a href="#" className="btn btn-primary">Go somewhere</a>*/}
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

