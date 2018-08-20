import React, {Component} from 'react'
import TeacherService from "../services/TeacherService";
import VolunteerService from "../services/VolunteerService";
import DonorService from "../services/DonorService";
import UserListItem from "./UserListItem";
import UserService from "../services/UserService";

export default class UsersList extends Component {

    constructor(props) {
        super(props);
        this.userService = UserService.instance;
        this.teacherService = TeacherService.instance;
        this.volunteerService = VolunteerService.instance;
        this.donorService = DonorService.instance;

        this.state = {
            adminId: '',
            userId: '',
            users: [],
            userType: ''
        };

        this.deleteUser = this.deleteUser.bind(this);
    }

    // selectUser(userId) {
    //     this.setState({userId: userId});
    // }

    componentDidMount() {
        let currentUrl = window.location.href;
        if(currentUrl.includes('teachers')) {
            this.findAllTeachers();
            this.setState({userType: 'teacher'});
        } else if(currentUrl.includes('volunteers')) {
            this.findAllVolunteers();
            this.setState({userType: 'volunteer'});
        } else {
            this.findAllDonors();
            this.setState({userType: 'donor'});
        }
        this.setState({adminId: this.props.match.params.adminId})
    }

    // GENERIC FROM PERSON SERVICE:
    deleteUser(userId) {
        this.userService
            .deleteUser(userId)
            .then(() => {
                if(this.state.userType === 'teacher') {
                    this.findAllTeachers();
                } else if(this.state.userType === 'volunteer') {
                    this.findAllVolunteers();
                } else {
                    this.findAllDonors();
                }
            })
    }

    setUsers(users) {
        this.setState({users: users});
    }

    findAllTeachers() {
        this.teacherService
            .findAllTeachers()
            .then((teachers) => {
                this.setUsers(teachers);
            });
    }

    findAllVolunteers() {
        this.volunteerService
            .findAllVolunteers()
            .then((volunteers) => {
                this.setUsers(volunteers);
            });
    }

    findAllDonors() {
        this.donorService
            .findAllDonors()
            .then((donors) => {
                this.setUsers(donors);
            });
    }

    renderListOfUsers() {
        let users = this.state.users.map((user) => {
            return (
                <UserListItem adminId={this.state.adminId}
                              user={user}
                              key={user.id}
                              delete={this.deleteUser}
                              // deleteButton={true}
                              userType={this.state.userType}/>
            )
        });
        return users;
    }

    render() {
        return (
            <div className="container m-1">
                <div>
                    <h3>Users List</h3>

                    <ul className="list-group">
                        {this.renderListOfUsers()}
                    </ul>
                </div>
            </div>
        );
    }
}