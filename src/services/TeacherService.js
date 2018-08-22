let _singleton = Symbol();

const BASE_URL = 'http://localhost:8080';
// const BASE_URL = 'https://empower-classrooms-backend.herokuapp.com';

class TeacherService {

    constructor(singleToken) {
        if(_singleton !== singleToken)
            throw new Error("Cannot instantiate directly");
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new TeacherService(_singleton);
        return this[_singleton];
    }


    findAllTeachers() {
        return fetch(BASE_URL + '/api/teacher')
            .then(function (response) {
                return response.json();
            })
    }

}

export default TeacherService;