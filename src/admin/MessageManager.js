import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import SchoolList from "../school/SchoolList";
import NewSchool from "../school/NewSchool";
import SchoolEditor from "./SchoolEditor";
import MessageService from "../services/MessageService";
import MessageListItem from "../message/MessageListItem";

export default class MessageManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            adminId: '',
            messages: []
        };

        this.messageService = MessageService.instance;

        this.selectAdmin = this.selectAdmin.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
        this.findAllMessages = this.findAllMessages.bind(this);
    }

    selectAdmin(adminId) {
        this.setState({adminId: adminId});
    }

    componentDidMount() {
        this.selectAdmin(this.props.match.params.adminId);
        this.findAllMessages();
    }

    findAllMessages() {
        this.messageService.findAllMessages()
            .then((messages) => {
                this.setState({messages: messages});
            })
    }

    deleteMessage(messageId) {
        this.messageService
            .deleteMessageById(messageId)
            .then(() => {
                this.findAllMessages();
            })
    }

    renderListOfMessages() {
        return this.state.messages.map((message) => {
            return (
                <MessageListItem
                    // userId={this.state.currentUserId}
                    message={message}
                    key={message.id}
                    delete={this.deleteMessage}
                    // isInbox={isInbox}
                    // // approveProject={this.approveProjectByVolunteer}
                    // donateToProject={this.donateToProject}
                    // displayApproveButton={false}
                    // deleteButton={false}
                />
            )
        });
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <div>
                        <h3>Messages List</h3>
                        <h3>Total messages = {this.state.messages.length}</h3>

                        <ul className="list-group">
                            {this.renderListOfMessages()}
                        </ul>
                    </div>
                </div>
            </Router>
        );
    }
}