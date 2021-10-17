import axios from "axios";

axios.interceptors.request.use(function (config){
    if(config.method === 'patch')
        config.headers = {'accept': 'application/json','Content-Type': 'application/merge-patch+json','Access-Control-Allow-Origin':'*'}
    else
        config.headers = {'accept': 'application/json','Access-Control-Allow-Origin':'*'}
    return config;
}, function (error) {
    return error;
})

export default axios;