import React, {Component} from 'react'
import UserService from "../services/UserService";
import SchoolService from "../services/SchoolService";

export default class SchoolEditor extends Component {

    constructor(props) {
        super(props);
        this.schoolService = SchoolService.instance;

        this.state = {
            adminId: '',
            schoolId: '',
            city: '',
            name: '',
            zip: ''
        };

        this.handleChanged = this.handleChanged.bind(this);
        this.selectAdmin = this.selectAdmin.bind(this);
        this.selectSchool = this.selectSchool.bind(this);
        // this.registerUser = this.registerUser.bind(this);
        this.updateSchool = this.updateSchool.bind(this);
    }

    handleChanged(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    selectAdmin(adminId) {
        this.setState({adminId: adminId});
    }

    selectSchool(schoolId) {
        this.setState({schoolId: schoolId});
    }

    componentDidMount() {
        let
            adminId = this.props.match.params.adminId,
            schoolId = this.props.match.params.schoolId;
        this.selectAdmin(adminId);
        this.selectSchool(schoolId);
        this.findSchoolById(schoolId);
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.match.params.schoolId !== prevProps.match.params.schoolId) {
            this.findSchoolById(this.props.match.params.schoolId);
        }
    }

    findSchoolById(schoolId) {
        this.schoolService
            .findSchoolById(schoolId)
            .then((school) => {
                // console.log(user);
                this.setState({
                    city: school.city,
                    name: school.name,
                    zip: school.zip
                })
            })
    }

    updateSchool() {
        let updatedSchool = {
            name: this.state.name,
            city: this.state.city,
            zip: this.state.zip
        };
        console.log('Updated obj:');
        console.log(updatedSchool);
        this.schoolService
            .updateSchool(this.state.schoolId, updatedSchool);
    }


    render() {
        return (
            <div className="container">
                <div>
                    <h2>School Editor</h2>
                </div>
                <form>
                    <div className="form-group row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged} value={this.state.name}
                                   type="text" name="name" className="form-control" id="name"
                                   placeholder="School Name"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="city" className="col-sm-2 col-form-label">City</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged} value={this.state.city}
                                   type="text" name="city" className="form-control" id="city"
                                   placeholder="City"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="zip" className="col-sm-2 col-form-label">Zip</label>
                        <div className="col-sm-10">
                            <input onChange={this.handleChanged} value={this.state.zip}
                                   type="text" name="zip" className="form-control" id="zip"
                                   placeholder="Zip"/>
                        </div>
                    </div>
                </form>

                <div className="form-group row">
                    <button onClick={this.updateSchool}
                            className="btn btn-block btn-success">Update School Details</button>
                </div>
            </div>
        );
    }
}