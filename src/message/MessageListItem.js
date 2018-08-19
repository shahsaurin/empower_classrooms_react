import React, {Component} from 'react'

export default class MessageListItem extends Component {

    render() {
        return (
            <li className="list-group-item">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-10">
                            <ul>
                                <p className={this.props.isInbox ? '' : 'hidden'}>From: {this.props.message.sender.firstName + " " + this.props.message.sender.lastName}</p>
                                <p className={this.props.isInbox ? 'hidden' : ''}>To: {this.props.message.recipient.firstName + " " + this.props.message.recipient.lastName}</p>
                                <p>Message: {this.props.message.description}</p>
                                <p>Date: {this.props.message.lastUpdated}</p>
                            </ul>
                        </div>

                        <div className={this.props.delete ? "col-md-2" : "hidden"}>
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