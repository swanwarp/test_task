import HttpClient from './HttpClient'


const URL_GET = 'https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=MatveiDudin';
const URL_POST = 'https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=MatveiDudin';
const URL_LOGIN = 'https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=MatveiDudin';
const URL_EDIT = 'https://uxcandy.com/~shapoval/test-task-backend/v2/edit/';

const postTask = task => {
    return HttpClient.post(URL_POST, task);
};

const postLogin = data => {
    return HttpClient.post(URL_LOGIN, data);
};

const getTasks = data => {
    return HttpClient.get(URL_GET, data);
};

const editTask = data => {
    return HttpClient.post(URL_EDIT + data.get('id') + '?developer=MatveiDudin', data);
};

const TaskApi = {getTasks, postTask, postLogin, editTask};

export default TaskApi;