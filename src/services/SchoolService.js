let _singleton = Symbol();

const BASE_URL = 'http://localhost:8080';

class SchoolService {

    constructor(singleToken) {
        if(_singleton !== singleToken)
            throw new Error("Cannot instantiate directly");
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new SchoolService(_singleton);
        return this[_singleton];
    }

    findSchoolByName(schoolName) {
        return fetch(BASE_URL + '/api/school?schoolName=' + schoolName)
        .then(function (response) {
           return response.json();
        })
    }

    addNewSchool(school) {
        return fetch(BASE_URL + '/api/school', {
            body: JSON.stringify(school),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }
}

export default SchoolService;