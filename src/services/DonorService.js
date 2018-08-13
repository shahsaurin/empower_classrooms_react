let _singleton = Symbol();

const BASE_URL = 'http://localhost:8080';

class DonorService {

    constructor(singleToken) {
        if(_singleton !== singleToken)
            throw new Error("Cannot instantiate directly");
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new DonorService(_singleton);
        return this[_singleton];
    }


    donateToProject(donorId, projectId, donationAmount) {
        return fetch(BASE_URL + '/api/donor/' + donorId + '/project/' + projectId + '/donate?amount=' + donationAmount, {
            method: 'POST'
        }).then(function (response) {
            return response;
        })
    }
}

export default DonorService;