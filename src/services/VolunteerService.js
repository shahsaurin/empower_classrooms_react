let _singleton = Symbol();

const BASE_URL = 'http://localhost:8080';

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


    // deleteProject(projectId) {
    //     return fetch(BASE_URL + '/api/project/' + projectId, {
    //         method: 'delete'
    //     }).then(function (response) {
    //         return response;
    //     })
    // }
}

export default VolunteerService;