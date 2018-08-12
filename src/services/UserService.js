let _singleton = Symbol();

const BASE_URL = 'http://localhost:8080';

class UserService {

    constructor(singleToken) {
        if(_singleton !== singleToken)
            throw new Error("Cannot instantiate directly");
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new UserService(_singleton);
        return this[_singleton];
    }

    createUser(userObj, userType, schoolId) {
        let createUserUrl = '';
        if(userType.toLowerCase() === 'teacher') {
            createUserUrl = BASE_URL + '/api/teacher?schoolId=' + schoolId;
        } else if(userType.toLowerCase() === 'volunteer') {
            createUserUrl = BASE_URL + '/api/volunteer';
        } else if(userType.toLowerCase() === 'donor') {
            createUserUrl = BASE_URL + '/api/donor';
        }

        return fetch(createUserUrl, {
            body: JSON.stringify(userObj),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

}

export default UserService;