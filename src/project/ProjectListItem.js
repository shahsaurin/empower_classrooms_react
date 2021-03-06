import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class ProjectListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            approved: '',
            donationAmount: ''
        };
        this.amountChanged = this.amountChanged.bind(this);
    }

    amountChanged(event) {
        this.setState({donationAmount: event.target.value});
    }

    componentDidMount() {
        if(this.props.project.isApproved) {
            this.setState({approved: 'Complete'});
        } else {
            this.setState({approved: 'Pending'});
        }
    }

    render() {
        return (
            <li className="list-group-item m-1">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-9">
                            <ul>
                                <h3>{this.props.project.title}</h3>
                                <p>{this.props.project.shortDescription}</p>
                                <li>Total Price: ${this.props.project.totalPrice}</li>
                                <li>Cost to Complete: ${this.props.project.costToComplete}</li>
                                <li>Approval Status: {this.state.approved}</li>
                            </ul>
                        </div>

                        <div className="col-md-3">
                            <div className={this.props.deleteButton ? '' : 'hidden'}>
                                <span className="float-right">
                                    <i className="fa fa-trash" onClick={() => {this.props.delete(this.props.project.id)}}></i>
                                    {/*<i className="fa fa-pencil"></i>*/}
                                </span>
                            </div>

                            <div className={this.props.displayApproveButton ? '' : 'hidden'}>
                                <button className="btn btn-success"
                                        onClick={() => {this.props.approveProject(this.props.volunteerId,this.props.project.id)}}>
                                    Approve
                                </button>
                            </div>

                            <div className={this.props.displayDonateButton ? '' : 'hidden'}>
                                <input type="text" className="form-control m-1"
                                       onChange={this.amountChanged}
                                       placeholder="$$"/>
                                <button className="btn btn-warning form-control m-1 p-1"
                                        onClick={() => {
                                            this.props.donateToProject(this.props.donorId, this.props.project.id, this.state.donationAmount)}
                                        }>
                                    Donate
                                </button>
                            </div>

                            <div className={this.props.updateButton ? '' : 'hidden'}>
                                <Link to={`/admin/${this.props.admin}/project-manager/project/${this.props.project.id}/edit`}>
                                    <span className="float-right">
                                        <i className="fa fa-pencil-square-o m-2">
                                        </i>
                                    </span>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </li>
        );
    }

}