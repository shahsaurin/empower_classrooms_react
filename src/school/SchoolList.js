import React, {Component} from 'react'
import SchoolListItem from "./SchoolListItem";

export default class SchoolList extends Component {

    constructor(props) {
        super(props);
        this.schoolService = SchooolService.instance;

        this.state = {
            adminId: '',
            schools: []
        };

        // this.handleChanged = this.handleChanged.bind(this);
        this.deleteSchool = this.deleteSchool.bind(this);
    }

    selectAdmin(adminId) {
        this.setState({adminId: adminId});
    }

    componentDidMount() {
        this.selectAdmin(this.props.match.params.adminId);
        this.findAllSchools();
    }


    deleteSchool(schoolId) {
        this.schoolService
            .deleteSchool(schoolId)
            .then(() => {
                this.findAllSchools();
            })
    }

    setSchools(schools) {
        this.setState({schools: schools});
    }

    findAllSchools() {
        this.schoolService
            .findAllSchools()
            .then((schools) => {
                this.setSchools(schools);
            });
    }

    renderListOfSchools() {
        let schools = this.state.schools.map((school) => {
            return (
                <SchoolListItem school={school}
                                admin={this.state.adminId}
                                key={school.id}
                                delete={this.deleteSchool}/>
            )
        });
        return schools;
    }

    render() {
        return (
            <div className="container">
                <div>
                    <h3>Schools List</h3>
                    <h3>Total schools = {this.state.schools.length}</h3>

                    <ul className="list-group">
                        {this.renderListOfSchools()}
                    </ul>
                </div>
            </div>
        );
    }
}