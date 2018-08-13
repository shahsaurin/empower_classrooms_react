let _singleton = Symbol();

const BASE_URL = 'http://localhost:8080';

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
}

export default MessageService;