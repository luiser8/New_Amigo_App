module.exports = global.config = {
    url: 'http://localhost:56951/api/', //prod: 'http://10.0.0.2/API/api/'
    headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8', 'Authorization': `Basic ${btoa('P$m:Bn@')}`}),
    headersBlob: new Headers({ 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'Authorization': 'Basic ' + btoa('P$m:Bn@')}),
};
