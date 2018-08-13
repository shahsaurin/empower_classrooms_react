import React, {Component} from 'react'
import ProjectService from "../services/ProjectService";
import MessageService from "../services/MessageService";

export default class MessageCreatorItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageText: ''
        };
        this.messageService = MessageService.instance;
        this.messageTextChanged = this.messageTextChanged.bind(this);
    }

    sendMessage(senderId, recipientId, messageText) {
        this.messageService
            .sendMessage(senderId, recipientId, messageText);
    }

    messageTextChanged(event) {
        this.setState({messageText: event.target.value});
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
                        <div className="col-md-4">
                            <ul>
                                {/*<li className={this.props.isInbox ? '' : 'hidden'}>From: {this.props.message.sender.id}</li>*/}
                                {/*<li className={this.props.isInbox ? 'hidden' : ''}>To: {this.props.message.recipient.id}</li>*/}
                                <li>User Id: {this.props.user.id}</li>
                                <li>First Name: {this.props.user.firstName}</li>
                                <li>Last Name: {this.props.user.lastName}</li>
                                {/*<li>Date: {this.props.message.lastUpdated}</li>*/}

                            </ul>
                        </div>
                        <div className="col-md-8">
                            <input onChange={this.messageTextChanged}
                                   className="form-control m-2" type="text" placeholder="Type message"/>
                            <button onClick={() => {
                                this.sendMessage(this.props.currentUserId, this.props.user.id, this.state.messageText)}}
                                className="btn btn-block btn-success m-2"> Send </button>
                        </div>

                        {/*</Link>*/}
                        {/*</div>*/}

                    </div>
                </div>
            </li>
        );
    }

}