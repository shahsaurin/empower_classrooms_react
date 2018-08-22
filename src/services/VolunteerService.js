let _singleton = Symbol();

const BASE_URL = 'http://localhost:8080';
// const BASE_URL = 'https://empower-classrooms-backend.herokuapp.com';

class VolunteerService {

    constructor(singleToken) {
        if(_singleton !== singleToken)
            throw new Error("Cannot instantiate directly");
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new VolunteerService(_singleton);
        return this[_singleton];
    }

    approveProjectByVolunteer(volunteerId, projectId) {
        return fetch(BASE_URL + '/api/volunteer/' + volunteerId + '/approveProject?projectId=' + projectId, {
            method: 'put'
        }).then(function (response) {
            return response;
        })
    }

    findAllVolunteers() {
        return fetch(BASE_URL + '/api/volunteer')
            .then(function (response) {
                return response.json();
            })
    }
}

export default VolunteerService;