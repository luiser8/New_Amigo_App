import PropTypes from 'prop-types';
import '../utils/Config';

export const get = async (route) => {
    const url = `${global.config.url}${route}`;
    return await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: global.config.headers,
        json: true
    }).then(response => {
        if (response.status >= 200 && response.status <= 299) {
            return response.json();
        } if (response.status === 401) {
            return response.text();
        } else {
            response.json().then((json) => {
                return json;
            });
            return null;
        }
    }).catch(e => console.log(e));
}
export const post = async (route, data) => {
    const url = `${global.config.url}${route}`;
    return await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: global.config.headers,
        body: JSON.stringify(data),
        json: true
    }).then(response => {
        if (response.status >= 200 && response.status <= 299) {
            return response.json();
        } if (response.status === 401) {
            return response.text();
        } else {
            response.json().then((json) => {
                return json;
            });
            return null;
        }
    }).catch(e => console.log(e));
}
export const put = async (route, data) => {
    const url = `${global.config.url}${route}`;
    return await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        headers: global.config.headers,
        body: JSON.stringify(data),
        json: true
    }).then(response => {
        if (response.status >= 200 && response.status <= 299) {
            return response.json();
        } if (response.status === 401) {
            return response.text();
        } else {
            response.json().then((json) => {
                return json;
            });
            return null;
        }
    }).catch(e => console.log(e));
}
export const del = async (route) => {
    const url = `${global.config.url}${route}`;
    return await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        headers: global.config.headers,
        json: true
    }).then(response => {
        if (response.status >= 200 && response.status <= 299) {
            return response.json();
        } if (response.status === 401) {
            return response.text();
        } else {
            response.json().then((json) => {
                return json;
            });
            return null;
        }
    }).catch(e => console.log(e));
}
export const blob = async (route) => {
    const url = `${global.config.url}${route}`;
    return await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: global.config.headersBlob,
    }).then(response => {
        return response;
    }).catch(e => console.log(e));
}

get.propTypes = {
    route : PropTypes.string,
}
post.propTypes = {
    route : PropTypes.string,
    data : PropTypes.object,
}
put.propTypes = {
    route : PropTypes.string,
    data : PropTypes.object,
}
del.propTypes = {
    route : PropTypes.string,
}
blob.propTypes = {
    route : PropTypes.string,
}