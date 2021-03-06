let _singleton = Symbol();

const BASE_URL = 'http://localhost:8080';
// const BASE_URL = 'https://empower-classrooms-backend.herokuapp.com';

class MessageService {

    constructor(singleToken) {
        if(_singleton !== singleToken)
            throw new Error("Cannot instantiate directly");
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new MessageService(_singleton);
        return this[_singleton];
    }


    findAllReceivedMessagesForUser(userId) {
        return fetch(BASE_URL + '/api/person/' + userId + '/receivedmessages')
            .then((response) => {
                return response.json();
            })
    }

    findAllSentMessagesForUser(userId) {
        return fetch(BASE_URL + '/api/person/' + userId + '/sentmessages')
            .then((response) => {
                return response.json();
            })
    }

    sendMessage(senderId, recipientId, messageText) {
        let messageObj = {
            description: messageText
        };
        return fetch(BASE_URL + '/api/sender/' + senderId + '/recipient/' + recipientId + '/message', {
            body: JSON.stringify(messageObj),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response;
        })
    }

    findAllMessages() {
        return fetch(BASE_URL + '/api/message/')
            .then((response) => {
                return response.json();
            })
    }

    deleteMessageById(messageId) {
        return fetch(BASE_URL + '/api/message/' + messageId, {
            method: 'delete'
        }).then(function (response) {
            return response;
        })
    }
}

export default MessageService;