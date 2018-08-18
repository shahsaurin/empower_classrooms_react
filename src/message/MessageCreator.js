import React, {Component} from 'react'
import MessageService from "../services/MessageService";
import VolunteerService from "../services/VolunteerService";
import TeacherService from "../services/TeacherService";
import DonorService from "../services/DonorService";
import MessageCreatorItem from "./MessageCreatorItem";

export default class MessageCreator extends Component {

    constructor(props) {
        super(props);
        // this.donorService = DonorService.instance;
        this.messageService = MessageService.instance;
        this.teacherService = TeacherService.instance;
        this.volunteerService = VolunteerService.instance;
        this.donorService = DonorService.instance;

        this.state = {
            currentUserId: '',
            //availableRecipients: This is a generic list of users (of a specific type for a given instance of the
            // MessageCreator component) to whom the 'currentUser' can send messages.
            teacherRecipients: [],
            volunteerRecipients: [],
            donorRecipients: []
        };
    }

    selectUser(currentUserId) {
        this.setState({currentUserId: currentUserId});
    }

    componentDidMount() {
        let currentUserId = this.props.match.params.teacherId ||
            this.props.match.params.volunteerId ||
            this.props.match.params.donorId;
        this.selectUser(currentUserId);
        this.findAllPossibleRecipients();
        // this.findAllSentMessages();
    }

    setAvailableRecipients(availableRecipients) {
        this.setState({availableRecipients: availableRecipients});
    }


    //If current user: Teacher/Donor ---> Find possible recipients = All Volunteers
    //If current user: Volunteer ---> Find possible recipients = All Teachers + All Donors
    findAllPossibleRecipients() {
        if(this.props.match.params.donorId || this.props.match.params.teacherId) {
            this.volunteerService
                .findAllVolunteers()
                .then((volunteers) => {
                    this.setState({volunteerRecipients: volunteers});
                });
        } else {
            this.teacherService
                .findAllTeachers()
                .then((teachers) => {
                    this.setState({teacherRecipients: teachers});
                });
            this.donorService
                .findAllDonors()
                .then((donors) => {
                    this.setState({donorRecipients: donors});
                })
        }
    }


    renderListOfUsers() {
        let currentUrl = window.location.href;
        let users;
        if(currentUrl.includes('messageTeacher')) {
            users = this.state.teacherRecipients;
        } else if(currentUrl.includes('messageVolunteer')) {
            users = this.state.volunteerRecipients;
            // isInbox = true;
        } else if(currentUrl.includes('messageDonor')){
            users = this.state.donorRecipients;
            // isInbox = false;
        }

        let usersDom = users.map((user) => {
            return (
                <MessageCreatorItem
                    currentUserId={this.state.currentUserId}
                    user={user}
                    key={user.id}
                    // isInbox={isInbox}
                    // // approveProject={this.approveProjectByVolunteer}
                    // donateToProject={this.donateToProject}
                    // displayApproveButton={false}
                    // deleteButton={false}
                />
            )
        });
        return usersDom;
    }


    render() {
        return (
            <div className="container">
                <div>
                    <h3>Users List</h3>
                    {/*<h3>Total projects = {this.state.projects.length}</h3>*/}

                    <ul className="list-group">
                        {this.renderListOfUsers()}
                    </ul>
                </div>
            </div>
        );
    }
}