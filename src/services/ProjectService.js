let _singleton = Symbol();

const BASE_URL = 'http://localhost:8080';
// const DONORSCHOOSE_API_URL = 'http://localhost:8080/api/donorschoose/project';

class ProjectService {

    constructor(singleToken) {
        if(_singleton !== singleToken)
            throw new Error("Cannot instantiate directly");
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new ProjectService(_singleton);
        return this[_singleton];
    }

    getDonorschooseProjects(searchQuery) {
        return fetch(BASE_URL + "/api/donorschoose/project?searchQuery=" + searchQuery)
        .then(function (response) {
            return response.json();
        })
    }

    addNewProjectForSchool(project, teacherId) {
        return fetch(BASE_URL + '/api/project?teacherId=' + teacherId, {
            body: JSON.stringify(project),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    findAllProjectsForTeacher(teacherId) {
        return fetch(BASE_URL + '/api/project?teacherId=' + teacherId)
            .then(function (response) {
                return response.json();
            })
    }

    findAllProjectsByApproval(isApproved) {
        return fetch(BASE_URL + '/api/project?isApproved=' + isApproved)
            .then(function (response) {
                return response.json();
            })
    }


    deleteProject(projectId) {
        return fetch(BASE_URL + '/api/project/' + projectId, {
            method: 'delete'
        }).then(function (response) {
            return response;
        })
    }


}

export default ProjectService;