import React, {Component} from 'react'

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
                        <div className="col-md-10">
                            <ul>
                                <li className={this.props.isInbox ? '' : 'hidden'}>From: {this.props.message.sender.id}</li>
                                <li className={this.props.isInbox ? 'hidden' : ''}>To: {this.props.message.recipient.id}</li>
                                <li>Message: {this.props.message.description}</li>
                                <li>Date: {this.props.message.lastUpdated}</li>
                            </ul>
                        </div>

                        <div className={"col-md-2" + this.props.delete ? "" : "hidden"}>
                            <span className="float-right">
                                    <i className="fa fa-trash" onClick={() => {this.props.delete(this.props.message.id)}}></i>
                            </span>
                        </div>
                    </div>
                </div>
            </li>
        );
    }

}