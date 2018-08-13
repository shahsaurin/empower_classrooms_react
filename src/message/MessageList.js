import React, {Component} from 'react'
// import ProjectListItem from "./ProjectListItem"
import DonorService from "../services/DonorService";
import MessageService from "../services/MessageService";
import MessageListItem from "./MessageListItem";

export default class MessageList extends Component {

    constructor(props) {
        super(props);
        // this.donorService = DonorService.instance;
        this.messageService = MessageService.instance;

        // As a Teacher/Volunteer/Donor is a 'User', we use 'userId' instead of user-type specific id's
        // to make the component generic and useful across all types of users (teachers, volunteers, donors)
        this.state = {
            currentUserId: '',
            inbox: [],
            sentbox: []
        };

        // this.donateToProject = this.donateToProject.bind(this);
    }

    selectUser(currentUserId) {
        this.setState({currentUserId: currentUserId});
    }

    componentDidMount() {
        let currentUserId = this.props.match.params.teacherId ||
            this.props.match.params.volunteerId ||
            this.props.match.params.donorId;
        this.selectUser(currentUserId);
        this.findAllReceivedMessages();
        this.findAllSentMessages();
    }

    setReceivedMessages(receivedMessages) {
        this.setState({inbox: receivedMessages});
    }

    setSentMessages(sentMessages) {
        this.setState({sentbox: sentMessages});
    }

    findAllReceivedMessages() {
        let currentUserId = this.props.match.params.teacherId ||
            this.props.match.params.volunteerId ||
            this.props.match.params.donorId;
        this.messageService
            .findAllReceivedMessagesForUser(currentUserId)
            .then((receivedMessages) => {
                this.setReceivedMessages(receivedMessages);
            });
    }

    findAllSentMessages() {
        let currentUserId = this.props.match.params.teacherId ||
            this.props.match.params.volunteerId ||
            this.props.match.params.donorId;
        this.messageService
            .findAllSentMessagesForUser(currentUserId)
            .then((sentMessages) => {
                this.setSentMessages(sentMessages);
            });
    }


    renderListOfMessages() {
        let currentUrl = window.location.href;
        let messages, isInbox;
        if(currentUrl.includes('inbox')) {
            messages = this.state.inbox;
            isInbox = true;
        } else {
            messages = this.state.sentbox;
            isInbox = false;
        }

        let messagesDom = messages.map((message) => {
            return (
                <MessageListItem
                    userId={this.state.currentUserId}
                    message={message}
                    key={message.id}
                    isInbox={isInbox}
                    // // approveProject={this.approveProjectByVolunteer}
                    // donateToProject={this.donateToProject}
                    // displayApproveButton={false}
                    // deleteButton={false}
                />
            )
        });
        return messagesDom;
    }


    render() {
        return (
            <div className="container">
                <div>
                    <h3>Messages</h3>
                    {/*<h3>Total projects = {this.state.projects.length}</h3>*/}

                    <ul className="list-group">
                        {this.renderListOfMessages()}
                    </ul>
                </div>
            </div>
        );
    }
}