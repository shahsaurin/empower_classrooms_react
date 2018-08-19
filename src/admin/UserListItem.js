import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class UserListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // approved: '',
            // donationAmount: ''
        };
    }

    // componentDidMount() {
    //     if(this.props.project.isApproved) {
    //         this.setState({approved: 'Complete'});
    //     } else {
    //         this.setState({approved: 'Pending'});
    //     }
    // }

    render() {
        return (
            <li className="list-group-item m-1">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-9">
                            <ul>
                                <li>First Name: {this.props.user.firstName}</li>
                                <li>Last Name: {this.props.user.lastName}</li>
                                <li>Username: {this.props.user.username}</li>
                                <li>Password: {this.props.user.password}</li>
                                <li>Email: {this.props.user.email}</li>
                                <li>City: {this.props.user.city}</li>
                                {/*<li>Date of Birth: {this.props.user.dob}</li>*/}
                                <li>State: {this.props.user.state}</li>
                                <li>Zip: {this.props.user.zip}</li>
                                <li>Phone: {this.props.user.phone}</li>
                            </ul>
                        </div>

                        <div className="col-3">
                            <div>
                                <span className="float-right">
                                    <i className="fa fa-trash" onClick={() => {this.props.delete(this.props.user.id)}}></i>
                                </span>
                            </div>

                            <div>
                                <Link to={`/admin/${this.props.adminId}/${this.props.userType + '-manager'}/${this.props.userType}/${this.props.user.id}/edit`}>
                                    <span className="float-right">
                                        <i className="fa fa-pencil-square-o m-2">
                                        </i>
                                    </span>
                                </Link>
                            </div>

                            {/*<div className={this.props.updateButton ? '' : 'hidden'}>*/}
                                {/*<Link to={`/admin/${this.props.admin}/project-manager/project/${this.props.project.id}/edit`}>*/}
                                    {/*<span className="float-right">*/}
                                        {/*<i className="fa fa-pencil-square-o m-2">*/}
                                        {/*</i>*/}
                                    {/*</span>*/}
                                {/*</Link>*/}
                            {/*</div>*/}

                        </div>

                    </div>
                </div>
            </li>
        );
    }

}