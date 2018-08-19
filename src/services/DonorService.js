let _singleton = Symbol();

// const BASE_URL = 'http://localhost:8080';
const BASE_URL = 'https://empower-classrooms-backend.herokuapp.com';

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

    findAllDonors() {
        return fetch(BASE_URL + '/api/donor')
            .then(function (response) {
                return response.json();
            })
    }

}

export default DonorService;