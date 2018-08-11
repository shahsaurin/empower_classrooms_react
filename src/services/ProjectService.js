let _singleton = Symbol();

const DONORSCHOOSE_API_URL = 'http://localhost:8080/api/donorschoose/project';

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
        return fetch(DONORSCHOOSE_API_URL + "?searchQuery=" + searchQuery)
        .then(function (response) {
            return response.json();
        })
    }
}

export default ProjectService;