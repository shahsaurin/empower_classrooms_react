import React, {Component} from 'react'
import ProjectService from "../services/ProjectService";

export default class MessageListItem extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     isInbox: ''
        // };

    }

    componentDidMount() {
        // if(this.props.project.isApproved) {
        //     this.setState({approved: 'Complete'});
        // } else {
        //     this.setState({approved: 'Pending'});
        // }
    }

    render() {
        return (
            <li className="list-group-item">
                <div className="container-fluid">
                    <div className="row">
                        {/*<div className="col-9">*/}
                            {/*<Link to={`/course/${this.props.courseId}/module/${this.props.module.id}`}>*/}
                            <ul>
                                <li className={this.props.isInbox ? '' : 'hidden'}>From: {this.props.message.sender.id}</li>
                                <li className={this.props.isInbox ? 'hidden' : ''}>To: {this.props.message.recipient.id}</li>
                                <li>Message: {this.props.message.description}</li>
                                <li>Date: {this.props.message.lastUpdated}</li>
                            </ul>

                            {/*</Link>*/}
                        {/*</div>*/}

                    </div>
                </div>
            </li>
        );
    }

}