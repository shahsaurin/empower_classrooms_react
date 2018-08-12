import React, {Component} from 'react'
import ProjectService from "../services/ProjectService";

export default class ProjectListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            approved: ''
        }
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
            <li className="list-group-item">
                {/*<Link to={`/course/${this.props.courseId}/module/${this.props.module.id}`}>*/}
                <ul>
                    <li>Title: {this.props.project.title}</li>
                    <li>Short Description: {this.props.project.shortDescription}</li>
                    <li>Total Price: {this.props.project.totalPrice}</li>
                    <li>Cost to Complete: {this.props.project.costToComplete}</li>
                    <li>Approval Status: {this.state.approved}</li>
                </ul>

                {/*</Link>*/}

                <span className="float-right">
                    <i className="fa fa-trash" onClick={() =>
                    {this.props.delete(this.props.project.id)}}></i>
                    {/*<i className="fa fa-pencil"></i>*/}
                </span>
            </li>
        );
    }
}