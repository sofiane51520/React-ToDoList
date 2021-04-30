import axios from "axios";

axios.interceptors.request.use(function (config){
    if(config.method === 'patch')
        config.headers = {'accept': 'application/json','Content-Type': 'application/merge-patch+json'}
    else
        config.headers = {'Accept': 'application/json'}
    return config;
}, function (error) {
    return error;
})

export default axios;