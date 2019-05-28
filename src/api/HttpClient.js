import axios from 'axios/index'


const post = (url = '', data = {}) => {
    return axios.post(url, data);
};

const get = (url='', data={}) => {
    return axios.get(url, {params: data});
};

const HttpClient = {
    post,
    get,
};

export default HttpClient;