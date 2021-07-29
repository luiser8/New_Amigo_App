module.exports = global.config = {
    url: {
        production: false,
        dev: 'http://192.168.1.59/ApiPSM/api/',
        prod: 'http://10.0.0.2/API/api/'
    },
    headers: {
        production: false,
        dev: new Headers({ 'Content-Type': 'application/json;charset=UTF-8', 'Authorization': 'Basic ' + btoa('P$m:Bn@')}),
        prod: ''
    }
};