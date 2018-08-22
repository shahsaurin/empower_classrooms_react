let _singleton = Symbol();

const BASE_URL = 'http://localhost:8080';
// const BASE_URL = 'https://empower-classrooms-backend.herokuapp.com';

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


    login(userObj, userType) {
        let loginUserUrl = BASE_URL + '/api/' + userType.toLowerCase() + '/login';
        return fetch(loginUserUrl, {
            body: JSON.stringify(userObj),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }


    findUserById(userId) {
        return fetch(BASE_URL + '/api/person/' + userId)
            .then(function (response) {
                return response.json();
            })
    }

    updateUser(userId, updatedUser) {
        return fetch(BASE_URL + '/api/person/' + userId, {
            body: JSON.stringify(updatedUser),
            headers: {'Content-type': 'application/json'},
            method: 'PUT'
        }).then(function (response) {
            return response.json();
        })
    }

    deleteUser(userId) {
        return fetch(BASE_URL + '/api/person/' + userId, {
            method: 'DELETE'
        }).then(function (response) {
            return response;
        })
    }

}

export default UserService;