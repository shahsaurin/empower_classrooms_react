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

    findSchoolById(schoolId) {
        return fetch(BASE_URL + '/api/school/' + schoolId)
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

    findAllSchools() {
        return fetch(BASE_URL + '/api/school')
            .then(function (response) {
                return response.json();
            })
    }

    updateSchool(schoolId, updatedSchool) {
        return fetch(BASE_URL + '/api/school/' + schoolId, {
            body: JSON.stringify(updatedSchool),
            headers: {'Content-type': 'application/json'},
            method: 'PUT'
        }).then(function (response) {
            return response.json();
        })
    }

    deleteSchool(schoolId) {
        return fetch(BASE_URL + '/api/school/' + schoolId, {
            method: 'delete'
        }).then(function (response) {
            return response;
        })
    }
}

export default SchoolService;